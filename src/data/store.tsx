import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { createSeed } from './seed'
import type { CollectionKey, DB, Settings } from './types'

/**
 * Single source of truth for the website and the dashboard.
 *
 * Persisted to localStorage so edits in the dashboard are reflected on the
 * public site immediately (and across tabs). Swap `load`/`save` for API calls
 * to move this onto a real backend — every consumer goes through this hook.
 */
const KEY = 'dha:db:v1'
/** Ids of seed articles this browser has already been given — see addNewSeedTips */
const SEEN_TIPS_KEY = 'dha:seen-tips'

function load(): DB {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return addNewSeedTips(migrate(JSON.parse(raw)))
  } catch {
    /* storage unavailable or corrupt — fall back to seed */
  }
  const db = createSeed()
  rememberSeedTips(db.tips.map((t) => t.id))
  return db
}

/** Saved data from before branches: the clinic records are dropped and the single phone/address becomes the first branch */
function migrate(saved: DB & Record<string, unknown>): DB {
  const { appointments: _a, patients: _p, inquiries: _i, ...db } = saved
  const old = db.settings as DB['settings'] & { phone?: string; address?: DB['settings']['branches'][number]['address']; mapQuery?: string; slotMinutes?: number; bookingOpen?: boolean }
  if (!Array.isArray(old.branches)) {
    const { phone, address, mapQuery, slotMinutes: _s, bookingOpen: _b, ...rest } = old
    const seed = createSeed().settings.branches[0]
    db.settings = {
      ...rest,
      branches: [
        {
          ...seed,
          address: address ?? seed.address,
          phones: phone ? [phone] : seed.phones,
          mapUrl: mapQuery ? `https://maps.google.com/?q=${encodeURIComponent(mapQuery)}` : seed.mapUrl,
        },
      ],
    }
  }
  return db
}

/**
 * Articles added to the seed after a browser first saved its data would never
 * appear there. Hand over each new seed article once; one the clinic deleted
 * stays deleted, because its id is already remembered.
 */
function addNewSeedTips(db: DB): DB {
  const seedTips = createSeed().tips
  const seenRaw = localStorage.getItem(SEEN_TIPS_KEY)
  // data saved before this list existed had the first four seed articles
  const seen = new Set<string>(seenRaw ? JSON.parse(seenRaw) : ['tip-1', 'tip-2', 'tip-3', 'tip-4'])
  const have = new Set(db.tips.map((t) => t.id))
  const fresh = seedTips.filter((t) => !seen.has(t.id) && !have.has(t.id))
  rememberSeedTips(seedTips.map((t) => t.id))
  return fresh.length ? { ...db, tips: [...db.tips, ...fresh] } : db
}

function rememberSeedTips(ids: string[]) {
  try {
    localStorage.setItem(SEEN_TIPS_KEY, JSON.stringify(ids))
  } catch {
    /* ignore */
  }
}

function save(db: DB) {
  try {
    localStorage.setItem(KEY, JSON.stringify(db))
  } catch {
    /* ignore quota / private mode */
  }
}

type Item<K extends CollectionKey> = DB[K][number]

interface Store {
  db: DB
  upsert: <K extends CollectionKey>(key: K, item: Item<K>) => void
  remove: <K extends CollectionKey>(key: K, id: string) => void
  patch: <K extends CollectionKey>(key: K, id: string, changes: Partial<Item<K>>) => void
  updateSettings: (changes: Partial<Settings>) => void
  reset: () => void
}

const Ctx = createContext<Store | null>(null)

export function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<DB>(load)

  useEffect(() => save(db), [db])

  // keep multiple tabs (site + dashboard) in sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && e.newValue) setDb(JSON.parse(e.newValue))
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const upsert = useCallback(<K extends CollectionKey>(key: K, item: Item<K>) => {
    setDb((d) => {
      const list = d[key] as Item<K>[]
      const i = list.findIndex((x) => x.id === item.id)
      const next = i === -1 ? [item, ...list] : list.map((x) => (x.id === item.id ? item : x))
      return { ...d, [key]: next }
    })
  }, [])

  const patch = useCallback(<K extends CollectionKey>(key: K, id: string, changes: Partial<Item<K>>) => {
    setDb((d) => ({
      ...d,
      [key]: (d[key] as Item<K>[]).map((x) => (x.id === id ? { ...x, ...changes } : x)),
    }))
  }, [])

  const remove = useCallback(<K extends CollectionKey>(key: K, id: string) => {
    setDb((d) => ({ ...d, [key]: (d[key] as Item<K>[]).filter((x) => x.id !== id) }))
  }, [])

  const updateSettings = useCallback((changes: Partial<Settings>) => {
    setDb((d) => ({ ...d, settings: { ...d.settings, ...changes } }))
  }, [])

  const reset = useCallback(() => setDb(createSeed()), [])

  const value = useMemo(() => ({ db, upsert, remove, patch, updateSettings, reset }), [db, upsert, remove, patch, updateSettings, reset])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore must be used inside <DataProvider>')
  return s
}

/** Public-facing selectors — only what the site should show */
export function usePublicData() {
  const { db } = useStore()
  return useMemo(
    () => ({
      services: db.services.filter((s) => s.active).sort((a, b) => a.order - b.order),
      tips: db.tips.filter((t) => t.published).sort((a, b) => b.date.localeCompare(a.date)),
      reviews: db.reviews.filter((r) => r.status === 'approved'),
      faqs: db.faqs,
      settings: db.settings,
    }),
    [db],
  )
}
