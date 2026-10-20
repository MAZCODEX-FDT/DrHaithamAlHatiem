import { createContext, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { X } from 'lucide-react'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { Preloader } from '@/components/site/Preloader'
import { FloatingContact } from '@/components/site/BookingRequest'
import { SmoothScroll } from '@/lib/smooth'
import { usePublicData } from '@/data/store'
import { useI18n } from '@/lib/i18n'

const ReadyCtx = createContext(true)
/** true once the intro preloader has finished — hero entrance waits for it */
export const useIntroReady = () => useContext(ReadyCtx)

export default function SiteLayout() {
  const [ready, setReady] = useState(false)
  return (
    <ReadyCtx.Provider value={ready}>
      <SmoothScroll />
      <Preloader onDone={() => setReady(true)} />
      <Announcement />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingContact ready={ready} />
    </ReadyCtx.Provider>
  )
}

function Announcement() {
  const { settings } = usePublicData()
  const { tr } = useI18n()
  const [closed, setClosed] = useState(false)
  if (!settings.announcementOn || closed || !tr(settings.announcement)) return null
  return (
    <div className="fixed start-4 end-24 bottom-4 z-40 flex items-center gap-3 md:start-0 md:end-0 md:mx-auto md:max-w-lg rounded-full bg-ink/90 py-2 ps-5 pe-2 text-sm text-white shadow-2xl backdrop-blur-xl">
      <span className="h-2 w-2 shrink-0 animate-pulse-dot rounded-full bg-vessel" />
      <span className="flex-1 truncate">{tr(settings.announcement)}</span>
      <button onClick={() => setClosed(true)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label="Dismiss">
        <X size={16} />
      </button>
    </div>
  )
}
