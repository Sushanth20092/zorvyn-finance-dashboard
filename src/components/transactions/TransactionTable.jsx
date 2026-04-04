import useFinanceStore from '../../store/useFinanceStore'
import { formatINR, formatDate } from '../../utils/formatters'
import { CATEGORIES } from '../../constants/categories'
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react'

export default function TransactionTable({ onEdit }) {
  const { getFilteredTransactions, deleteTransaction, role, filters, setSortField } = useFinanceStore()
  const transactions = getFilteredTransactions()
  const isAdmin = role === 'admin'

  function SortIcon({ field }) {
    if (filters.sortField !== field) return <ArrowUpDown size={12} className="text-[#3a3d4a]" />
    return <span className="text-indigo-400">{filters.sortAsc ? '↑' : '↓'}</span>
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-[#1a1d27] rounded-xl border border-[#2a2d3a] py-16 text-center">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-white font-medium text-sm">No transactions found</p>
        <p className="text-[#64748b] text-xs font-mono mt-1">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="bg-[#1a1d27] rounded-xl border border-[#2a2d3a] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2a2d3a] bg-[#0f1117]">
              <th className="text-left px-5 py-3 text-[#64748b] text-xs font-mono tracking-widest">DESCRIPTION</th>
              <th
                className="text-left px-5 py-3 text-[#64748b] text-xs font-mono tracking-widest cursor-pointer hover:text-white transition-colors"
                onClick={() => setSortField('category')}
              >
                <div className="flex items-center gap-1.5">CATEGORY <SortIcon field="category" /></div>
              </th>
              <th
                className="text-left px-5 py-3 text-[#64748b] text-xs font-mono tracking-widest cursor-pointer hover:text-white transition-colors"
                onClick={() => setSortField('date')}
              >
                <div className="flex items-center gap-1.5">DATE <SortIcon field="date" /></div>
              </th>
              <th
                className="text-left px-5 py-3 text-[#64748b] text-xs font-mono tracking-widest cursor-pointer hover:text-white transition-colors"
                onClick={() => setSortField('amount')}
              >
                <div className="flex items-center gap-1.5">AMOUNT <SortIcon field="amount" /></div>
              </th>
              <th className="text-left px-5 py-3 text-[#64748b] text-xs font-mono tracking-widest">TYPE</th>
              {isAdmin && (
                <th className="text-left px-5 py-3 text-[#64748b] text-xs font-mono tracking-widest">ACTIONS</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2d3a]">
            {transactions.map((tx) => {
              const cat = CATEGORIES[tx.category]
              return (
                <tr key={tx.id} className="hover:bg-[#2a2d3a]/40 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${cat?.bg} flex items-center justify-center text-sm shrink-0`}>
                        {cat?.emoji}
                      </div>
                      <span className="text-white text-sm font-medium">{tx.desc}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold ${cat?.text}`}>{tx.category}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[#64748b] text-xs font-mono">{formatDate(tx.date)}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm font-mono font-semibold ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {tx.type === 'income' ? '+' : '-'}{formatINR(tx.amount)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-mono font-semibold px-2 py-1 rounded-full
                      ${tx.type === 'income'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                      {tx.type}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(tx)}
                          className="w-7 h-7 rounded-md bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 flex items-center justify-center transition-all border border-indigo-500/20"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => deleteTransaction(tx.id)}
                          className="w-7 h-7 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-all border border-red-500/20"
                        >
                          <Trash2 size={12} />
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
      <div className="px-5 py-3 border-t border-[#2a2d3a]">
        <p className="text-[#64748b] text-xs font-mono">
          SHOWING {transactions.length} TRANSACTION{transactions.length !== 1 ? 'S' : ''}
        </p>
      </div>
    </div>
  )
}