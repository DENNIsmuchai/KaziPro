import { useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import MasterclassesPage from './pages/MasterclassesPage'
import AcademicBureauPage from './pages/AcademicBureauPage'
import ExpertsPage from './pages/ExpertsPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'consultants':
        return <ExpertsPage key="consultants" initialCategory="consultants" onNavigate={setCurrentPage} />
      case 'creativity':
        return <ExpertsPage key="creativity" initialCategory="creativity" onNavigate={setCurrentPage} />
      case 'sports':
        return <ExpertsPage key="sports" initialCategory="sports" onNavigate={setCurrentPage} />
      case 'experts':
        return <ExpertsPage key="experts" initialCategory="all" onNavigate={setCurrentPage} />
      case 'masterclasses':
        return <MasterclassesPage />
      case 'bureau':
        return <AcademicBureauPage />
      default:
        return <HomePage onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#0a0a0f]">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      <main>{renderPage()}</main>
    </div>
  )
}

export default App
