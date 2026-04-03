import useFinanceStore from '../../store/useFinanceStore'
import { Sun, Moon, Download } from 'lucide-react'

const PAGE_TITLES = {
  dashboard: 'Overview',
  transactions: 'Transactions',
  insights: 'Insights',
}

export default function Topbar({ currentPage }) {
  const { theme, toggleTheme, role, transactions } = useFinanceStore()

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
    <header className="h-16 bg-[#1a1d27] border-b border-[#2a2d3a] flex items-center justify-between px-6 sticky top-0 z-40">
      
      <div>
        <h1 className="text-white font-bold text-lg leading-none">
          {PAGE_TITLES[currentPage]}
        </h1>
        <p className="text-[#64748b] text-xs font-mono mt-0.5">APRIL 2026</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Role Badge */}
        <span className={`text-xs font-mono font-semibold px-3 py-1 rounded-full
          ${role === 'admin'
            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
          }`}>
          {role === 'admin' ? '⚡ Admin' : '👁 Viewer'}
        </span>

        {/* Export */}
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2a2d3a] text-[#64748b] hover:text-white text-xs font-medium transition-all border border-[#2a2d3a] hover:border-[#3a3d4a]"
        >
          <Download size={13} /> Export
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg bg-[#2a2d3a] flex items-center justify-center text-[#64748b] hover:text-white transition-all border border-[#2a2d3a] hover:border-[#3a3d4a]"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>

    </header>
  )
}