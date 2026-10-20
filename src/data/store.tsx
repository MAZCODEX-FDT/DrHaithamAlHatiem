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

function load(): DB {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as DB
  } catch {
    /* storage unavailable or corrupt — fall back to seed */
  }
  return createSeed()
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
