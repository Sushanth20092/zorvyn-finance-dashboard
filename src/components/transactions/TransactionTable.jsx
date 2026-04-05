import useFinanceStore from '../../store/useFinanceStore'
import { formatINR, formatDate } from '../../utils/formatters'
import { CATEGORIES } from '../../constants/categories'
import CategoryIcon from '../ui/CategoryIcon'
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react'

export default function TransactionTable({ onEdit }) {
  const { getFilteredTransactions, deleteTransaction, role, filters, setSortField } = useFinanceStore()
  const transactions = getFilteredTransactions()
  const isAdmin = role === 'admin'

  function SortIcon({ field }) {
    if (filters.sortField !== field) return <ArrowUpDown size={11} className="text-slate-300" />
    return <span className="text-indigo-500 text-xs">{filters.sortAsc ? '↑' : '↓'}</span>
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 py-16 text-center">
        <p className="text-slate-800 font-medium text-sm">No transactions found</p>
        <p className="text-slate-400 text-xs mt-1">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-sm transition-all">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-5 py-3 text-slate-400 text-xs font-medium">Description</th>
              <th className="text-left px-5 py-3 text-slate-400 text-xs font-medium cursor-pointer hover:text-slate-600 transition-colors" onClick={() => setSortField('category')}>
                <div className="flex items-center gap-1">Category <SortIcon field="category" /></div>
              </th>
              <th className="text-left px-5 py-3 text-slate-400 text-xs font-medium cursor-pointer hover:text-slate-600 transition-colors" onClick={() => setSortField('date')}>
                <div className="flex items-center gap-1">Date <SortIcon field="date" /></div>
              </th>
              <th className="text-left px-5 py-3 text-slate-400 text-xs font-medium cursor-pointer hover:text-slate-600 transition-colors" onClick={() => setSortField('amount')}>
                <div className="flex items-center gap-1">Amount <SortIcon field="amount" /></div>
              </th>
              <th className="text-left px-5 py-3 text-slate-400 text-xs font-medium">Type</th>
              {isAdmin && <th className="text-left px-5 py-3 text-slate-400 text-xs font-medium">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((tx) => {
              const cat = CATEGORIES[tx.category]
              return (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <CategoryIcon category={tx.category} />
                      <span className="text-slate-700 text-sm font-medium">{tx.desc}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cat?.bg} ${cat?.text} border ${cat?.border}`}>
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-slate-400 text-xs font-mono">{formatDate(tx.date)}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm font-mono font-semibold ${tx.type === 'income' ? 'text-emerald-500' : 'text-red-500'}`}>
                      {tx.type === 'income' ? '+' : '-'}{formatINR(tx.amount)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border
                      ${tx.type === 'income'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : 'bg-red-50 text-red-500 border-red-100'
                      }`}>
                      {tx.type}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(tx)} className="w-7 h-7 rounded-md bg-indigo-50 text-indigo-500 hover:bg-indigo-100 flex items-center justify-center transition-all border border-indigo-100">
                          <Pencil size={11} />
                        </button>
                        <button onClick={() => deleteTransaction(tx.id)} className="w-7 h-7 rounded-md bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-all border border-red-100">
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
        <p className="text-slate-400 text-xs font-mono">
          {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}