import useFinanceStore from '../../store/useFinanceStore'
import { formatINR, formatDate } from '../../utils/formatters'
import { CATEGORIES } from '../../constants/categories'

export default function RecentTransactions({ onNavigate }) {
  const transactions = useFinanceStore((s) => s.transactions)
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <div className="bg-[#1a1d27] rounded-xl border border-[#2a2d3a] mt-6">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2d3a]">
        <div>
          <h3 className="text-white font-semibold text-sm">Recent Activity</h3>
          <p className="text-[#64748b] text-xs font-mono mt-0.5">LAST 5 TRANSACTIONS</p>
        </div>
        <button
          onClick={() => onNavigate('transactions')}
          className="text-indigo-400 text-xs font-medium hover:text-indigo-300 transition-colors"
        >
          View all →
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">💸</p>
          <p className="text-[#64748b] text-sm font-mono">No transactions yet</p>
        </div>
      ) : (
        <div className="divide-y divide-[#2a2d3a]">
          {recent.map((tx) => {
            const cat = CATEGORIES[tx.category]
            return (
              <div key={tx.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-[#2a2d3a]/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${cat?.bg} flex items-center justify-center text-base`}>
                    {cat?.emoji}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{tx.desc}</p>
                    <p className="text-[#64748b] text-xs font-mono">{formatDate(tx.date)}</p>
                  </div>
                </div>
                <span className={`text-sm font-mono font-semibold ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatINR(tx.amount)}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}