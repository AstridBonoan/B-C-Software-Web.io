import { useEffect, useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { Navbar } from './components/Navbar'
import { HomePage } from './components/HomePage'
import { Services } from './components/Services'
import { Pricing } from './components/Pricing'
import { ContactForm } from './components/ContactForm'
import { Footer } from './components/Footer'
import { DemosPage } from './components/DemosPage'
import { AboutMePage } from './components/AboutMePage'
import { MyWorkPage } from './components/MyWorkPage'
import { ReviewsPage } from './components/ReviewsPage'
import './index.css'

function App() {
  const { isDark, toggleTheme } = useTheme()
  const [contactSubject, setContactSubject] = useState('')
  const getRoute = () => {
    const raw = window.location.hash.replace('#', '') || '/'
    return raw.startsWith('/') ? raw : `/${raw}`
  }
  const [pathname, setPathname] = useState(getRoute())

  useEffect(() => {
    const handleHashChange = () => setPathname(getRoute())

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // After the new page mounts, jump to the top. Instant scroll avoids mobile
  // getting stuck when smooth-scroll races a shrinking document height.
  useEffect(() => {
    const scrollTop = () => {
      const html = document.documentElement
      const previous = html.style.scrollBehavior
      html.style.scrollBehavior = 'auto'
      window.scrollTo(0, 0)
      html.scrollTop = 0
      document.body.scrollTop = 0
      html.style.scrollBehavior = previous
    }

    scrollTop()
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollTop)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  const navigateTo = (path: string) => {
    if (getRoute() !== path) {
      window.location.hash = path
      setPathname(path)
      return
    }
    // Same route (e.g. Home while already on Home): still return to top.
    window.scrollTo(0, 0)
  }

  const handlePricingSelect = (subject: string) => {
    setContactSubject(subject)
    navigateTo('/contact')
  }

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-surface-dark">
      <Navbar
        isDark={isDark}
        onThemeToggle={toggleTheme}
        pathname={pathname}
        onNavigate={navigateTo}
      />
      <main>
        {pathname === '/' && <HomePage onNavigate={navigateTo} />}
        {pathname === '/services' && <Services />}
        {pathname === '/pricing' && <Pricing onSelect={handlePricingSelect} />}
        {pathname === '/contact' && <ContactForm subject={contactSubject} />}
        {pathname === '/demos' && <DemosPage onNavigate={navigateTo} />}
        {pathname === '/my-work' && <MyWorkPage onNavigate={navigateTo} />}
        {pathname === '/about' && <AboutMePage onNavigate={navigateTo} />}
        {pathname === '/reviews' && <ReviewsPage />}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  )
}

export default App
