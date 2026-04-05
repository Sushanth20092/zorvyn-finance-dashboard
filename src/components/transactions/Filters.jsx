import useFinanceStore from '../../store/useFinanceStore'
import { CATEGORY_NAMES } from '../../constants/categories'
import { Search, X } from 'lucide-react'

export default function Filters() {
  const { filters, setFilter, resetFilters } = useFinanceStore()
  const { search, type, category } = filters
  const hasActive = search || type || category

  return (
    <div className="flex flex-wrap gap-2.5 mb-4">
      <div className="relative flex-1 min-w-48">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setFilter('search', e.target.value)}
          placeholder="Search transactions..."
          className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-slate-700 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder:text-slate-300"
        />
      </div>
      <select
        value={type}
        onChange={(e) => setFilter('type', e.target.value)}
        className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 outline-none focus:border-indigo-400 transition-all"
      >
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select
        value={category}
        onChange={(e) => setFilter('category', e.target.value)}
        className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 outline-none focus:border-indigo-400 transition-all"
      >
        <option value="">All Categories</option>
        {CATEGORY_NAMES.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      {hasActive && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-500 border border-red-100 text-sm font-medium hover:bg-red-100 transition-all"
        >
          <X size={12} /> Clear
        </button>
      )}
    </div>
  )
}