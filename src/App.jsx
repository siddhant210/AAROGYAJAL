import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AIChatbot from './components/AIChatbot'
import LandingPage from './pages/LandingPage'
import HealthReporting from './pages/HealthReporting'
import WaterQuality from './pages/WaterQuality'
import Dashboard from './pages/Dashboard'
import Education from './pages/Education'
import Alerts from './pages/AlertsEnhanced'
import './App.css'

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/health-reporting" element={<HealthReporting />} />
              <Route path="/water-quality" element={<WaterQuality />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/education" element={<Education />} />
              <Route path="/alerts" element={<Alerts />} />
            </Routes>
          </main>
          <Footer />
          <AIChatbot 
            isOpen={isChatbotOpen} 
            onToggle={() => setIsChatbotOpen(!isChatbotOpen)} 
          />
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

