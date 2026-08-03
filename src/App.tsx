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

  const navigateTo = (path: string) => {
    if (getRoute() !== path) {
      window.location.hash = path
      setPathname(path)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePricingSelect = (subject: string) => {
    setContactSubject(subject)
    navigateTo('/contact')
  }

  return (
    <div className="min-h-screen bg-surface transition-colors duration-300 dark:bg-surface-dark">
      <Navbar isDark={isDark} onThemeToggle={toggleTheme} pathname={pathname} onNavigate={navigateTo} />
      <main>
        {pathname === '/' && <HomePage onNavigate={navigateTo} />}
        {pathname === '/services' && <Services />}
        {pathname === '/pricing' && <Pricing onSelect={handlePricingSelect} />}
        {pathname === '/contact' && <ContactForm subject={contactSubject} />}
        {pathname === '/demos' && <DemosPage onNavigate={navigateTo} />}
        {pathname === '/my-work' && <MyWorkPage onNavigate={navigateTo} />}
        {pathname === '/about' && <AboutMePage onNavigate={navigateTo} />}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  )
}

export default App
