import useFinanceStore from '../../store/useFinanceStore'
import { formatINR } from '../../utils/formatters'
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'

export default function SummaryCards() {
  const getSummary = useFinanceStore((s) => s.getSummary)
  const transactions = useFinanceStore((s) => s.transactions)
  const { income, expenses, balance } = getSummary()

  const incomeCount = transactions.filter((t) => t.type === 'income').length
  const expenseCount = transactions.filter((t) => t.type === 'expense').length
  const savingsRate = income > 0 ? (((income - expenses) / income) * 100).toFixed(1) : 0

  const cards = [
    {
      label: 'Total Balance',
      value: formatINR(balance),
      sub: `${savingsRate}% savings rate`,
      icon: Wallet,
      iconClass: 'text-indigo-500',
      iconBg: 'bg-indigo-50',
      valueClass: 'text-slate-900',
      subClass: 'text-slate-400',
    },
    {
      label: 'Total Income',
      value: formatINR(income),
      sub: `${incomeCount} credit${incomeCount !== 1 ? 's' : ''}`,
      icon: TrendingUp,
      iconClass: 'text-emerald-500',
      iconBg: 'bg-emerald-50',
      valueClass: 'text-emerald-600',
      subClass: 'text-slate-400',
    },
    {
      label: 'Total Expenses',
      value: formatINR(expenses),
      sub: `${expenseCount} debit${expenseCount !== 1 ? 's' : ''}`,
      icon: TrendingDown,
      iconClass: 'text-red-500',
      iconBg: 'bg-red-50',
      valueClass: 'text-red-500',
      subClass: 'text-slate-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className="bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-5">
              <p className="text-slate-500 text-xs font-medium">{card.label}</p>
              <div className={`w-7 h-7 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                <Icon size={14} className={card.iconClass} strokeWidth={2} />
              </div>
            </div>
            <p className={`text-2xl font-bold tracking-tight ${card.valueClass}`}>
              {card.value}
            </p>
            <p className={`text-xs mt-2 ${card.subClass}`}>{card.sub}</p>
          </div>
        )
      })}
    </div>
  )
}