import useFinanceStore from '../../store/useFinanceStore'
import { CATEGORY_NAMES } from '../../constants/categories'
import { Search, X } from 'lucide-react'

export default function Filters() {
  const { filters, setFilter, resetFilters } = useFinanceStore()
  const { search, type, category } = filters

  const hasActive = search || type || category

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
        <input
          value={search}
          onChange={(e) => setFilter('search', e.target.value)}
          placeholder="Search transactions..."
          className="w-full bg-[#1a1d27] border border-[#2a2d3a] rounded-lg pl-9 pr-3 py-2.5 text-white text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-[#3a3d4a]"
        />
      </div>

      {/* Type Filter */}
      <select
        value={type}
        onChange={(e) => setFilter('type', e.target.value)}
        className="bg-[#1a1d27] border border-[#2a2d3a] rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500 transition-colors"
      >
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setFilter('category', e.target.value)}
        className="bg-[#1a1d27] border border-[#2a2d3a] rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500 transition-colors"
      >
        <option value="">All Categories</option>
        {CATEGORY_NAMES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Reset */}
      {hasActive && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-medium hover:bg-red-500/20 transition-all"
        >
          <X size={13} /> Clear
        </button>
      )}
    </div>
  )
}