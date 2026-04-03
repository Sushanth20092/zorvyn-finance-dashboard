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
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      valueColor: 'text-white',
    },
    {
      label: 'Total Income',
      value: formatINR(income),
      sub: `${incomeCount} credits this period`,
      icon: TrendingUp,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      valueColor: 'text-emerald-400',
    },
    {
      label: 'Total Expenses',
      value: formatINR(expenses),
      sub: `${expenseCount} debits this period`,
      icon: TrendingDown,
      iconColor: 'text-red-400',
      iconBg: 'bg-red-500/10',
      border: 'border-red-500/20',
      valueColor: 'text-red-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className={`bg-[#1a1d27] rounded-xl p-5 border ${card.border} hover:border-opacity-60 transition-all`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[#64748b] text-xs font-mono tracking-widest uppercase">
                  {card.label}
                </p>
              </div>
              <div className={`${card.iconBg} ${card.iconColor} p-2 rounded-lg`}>
                <Icon size={16} />
              </div>
            </div>
            <p className={`text-2xl font-bold ${card.valueColor} tracking-tight`}>
              {card.value}
            </p>
            <p className="text-[#64748b] text-xs mt-2">{card.sub}</p>
          </div>
        )
      })}
    </div>
  )
}