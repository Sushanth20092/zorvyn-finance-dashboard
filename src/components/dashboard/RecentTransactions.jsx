import useFinanceStore from '../../store/useFinanceStore'
import { formatINR, formatDate } from '../../utils/formatters'
import CategoryIcon from '../ui/CategoryIcon'

export default function RecentTransactions({ onNavigate }) {
  const transactions = useFinanceStore((s) => s.transactions)
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <div className="bg-white rounded-xl border border-slate-200 mt-6 hover:shadow-sm transition-all">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-slate-800 font-semibold text-sm">Recent Activity</h3>
          <p className="text-slate-400 text-xs mt-0.5">Last 5 transactions</p>
        </div>
        <button
          onClick={() => onNavigate('transactions')}
          className="text-indigo-500 text-xs font-medium hover:text-indigo-600 transition-colors"
        >
          View all →
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400 text-sm">No transactions yet</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {recent.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <CategoryIcon category={tx.category} />
                <div>
                  <p className="text-slate-700 text-sm font-medium">{tx.desc}</p>
                  <p className="text-slate-400 text-xs font-mono">{formatDate(tx.date)}</p>
                </div>
              </div>
              <span className={`text-sm font-mono font-semibold ${tx.type === 'income' ? 'text-emerald-500' : 'text-red-500'}`}>
                {tx.type === 'income' ? '+' : '-'}{formatINR(tx.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}