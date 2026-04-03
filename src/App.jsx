import { useState } from 'react'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'

const PAGES = {
  dashboard: <Dashboard />,
  transactions: <Transactions />,
  insights: <Insights />,
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {PAGES[currentPage]}
    </Layout>
  )
}