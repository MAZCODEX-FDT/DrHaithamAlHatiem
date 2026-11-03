import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { DataProvider } from './data/store'
import { LangProvider } from './lib/i18n'
import { otherLangHref, routerBase, urlLang } from './lib/site'

const lang = urlLang()

// A visitor who chose Arabic before, landing on an English address: take them to the same page in Arabic.
let redirect = false
try {
  redirect = lang === 'en' && localStorage.getItem('dha:lang') === 'ar' && !navigator.webdriver
} catch {
  /* storage unavailable */
}

if (redirect) {
  window.location.replace(otherLangHref('ar'))
} else {
  // Pre-rendered pages carry their head tags for crawlers; the app renders its own, so drop those to avoid duplicates.
  document.querySelectorAll('head [data-seo]').forEach((el) => el.remove())

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter basename={routerBase(lang)}>
        <LangProvider lang={lang}>
          <DataProvider>
            <App />
          </DataProvider>
        </LangProvider>
      </BrowserRouter>
    </StrictMode>,
  )
}
