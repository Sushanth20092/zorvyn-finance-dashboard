import useFinanceStore from '../../store/useFinanceStore'
import { Download, Menu } from 'lucide-react'

const PAGE_META = {
  dashboard:    { title: 'Overview',     sub: 'April 2026' },
  transactions: { title: 'Transactions', sub: 'All activity' },
  insights:     { title: 'Insights',     sub: 'Spending analysis' },
}

export default function Topbar({ currentPage, onMenuClick }) {
  const { transactions } = useFinanceStore()
  const meta = PAGE_META[currentPage]

  function exportData() {
    const json = JSON.stringify(transactions, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fintrek-transactions.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-500 hover:text-slate-800 transition-colors mr-1"
        >
          <Menu size={18} />
        </button>
        <div>
          <h1 className="text-slate-900 font-semibold text-sm leading-none">{meta.title}</h1>
          <p className="text-slate-400 text-xs mt-0.5">{meta.sub}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={exportData}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs font-medium transition-all"
        >
          <Download size={12} />
          Export JSON
        </button>
      </div>
    </header>
  )
}