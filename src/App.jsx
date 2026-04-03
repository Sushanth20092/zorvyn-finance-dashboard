import { useState } from 'react'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const pages = {
    dashboard: <Dashboard onNavigate={setCurrentPage} />,
    transactions: <Transactions />,
    insights: <Insights />,
  }

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {pages[currentPage]}
    </Layout>
  )
}