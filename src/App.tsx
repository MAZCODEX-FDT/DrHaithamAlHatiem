import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import SiteLayout from './pages/site/SiteLayout'
import Home from './pages/site/Home'
import About from './pages/site/About'
import { ServiceDetail, ServicesPage } from './pages/site/Services'
import { GuidePage, TipDetail } from './pages/site/Guide'
import Contact from './pages/site/Contact'
import Book from './pages/site/Book'
import NotFound from './pages/site/NotFound'

// The dashboard is a separate chunk — patients never download it
const Dashboard = lazy(() => import('./pages/dashboard/DashboardApp'))

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="guide" element={<GuidePage />} />
        <Route path="guide/:slug" element={<TipDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="book" element={<Book />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route
        path="dashboard/*"
        element={
          <Suspense fallback={<div className="grid h-screen place-items-center bg-mist text-navy">Loading…</div>}>
            <Dashboard />
          </Suspense>
        }
      />
    </Routes>
  )
}
