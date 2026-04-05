import {
  Trophy, PiggyBank, BarChart2,
  TrendingUp, Receipt, Zap
} from 'lucide-react'
import useFinanceStore from '../../store/useFinanceStore'
import { formatINR } from '../../utils/formatters'
import { CATEGORIES } from '../../constants/categories'

export default function InsightCards() {
  const getSummary = useFinanceStore((s) => s.getSummary)
  const getCategoryTotals = useFinanceStore((s) => s.getCategoryTotals)
  const getMonthlyData = useFinanceStore((s) => s.getMonthlyData)
  const transactions = useFinanceStore((s) => s.transactions)

  const { income, expenses, balance } = getSummary()
  const categoryTotals = getCategoryTotals()
  const monthly = getMonthlyData()

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]
  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0
  const lastTwo = monthly.slice(-2)
  const momChange = lastTwo.length === 2
    ? (((lastTwo[1].expenses - lastTwo[0].expenses) / lastTwo[0].expenses) * 100).toFixed(1)
    : null
  const avgMonthlyExpense = monthly.length > 0
    ? monthly.reduce((sum, m) => sum + m.expenses, 0) / monthly.length
    : 0
  const maxExpense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a.amount > b.amount ? a : b, {})

  const cards = [
    {
      icon: Trophy,
      iconClass: 'bg-amber-50 text-amber-500 border-amber-100',
      label: 'Top Spending Category',
      value: topCategory ? topCategory[0] : '—',
      detail: topCategory ? `${formatINR(topCategory[1])} total spent` : 'No data',
      valueClass: topCategory ? CATEGORIES[topCategory[0]]?.text : 'text-slate-800',
    },
    {
      icon: PiggyBank,
      iconClass: 'bg-emerald-50 text-emerald-500 border-emerald-100',
      label: 'Savings Rate',
      value: `${savingsRate}%`,
      detail: `${formatINR(balance)} of ${formatINR(income)} saved`,
      valueClass: Number(savingsRate) >= 20 ? 'text-emerald-500' : 'text-amber-500',
    },
    {
      icon: BarChart2,
      iconClass: 'bg-indigo-50 text-indigo-500 border-indigo-100',
      label: 'Avg Monthly Expense',
      value: formatINR(Math.round(avgMonthlyExpense)),
      detail: `Across ${monthly.length} month${monthly.length !== 1 ? 's' : ''}`,
      valueClass: 'text-slate-800',
    },
    {
      icon: TrendingUp,
      iconClass: 'bg-blue-50 text-blue-500 border-blue-100',
      label: 'Expense Change (MoM)',
      value: momChange !== null ? `${momChange > 0 ? '+' : ''}${momChange}%` : '—',
      detail: momChange > 0 ? 'Up vs last month' : 'Down vs last month',
      valueClass: momChange > 0 ? 'text-red-500' : 'text-emerald-500',
    },
    {
      icon: Receipt,
      iconClass: 'bg-slate-50 text-slate-500 border-slate-100',
      label: 'Total Transactions',
      value: String(transactions.length),
      detail: `${transactions.filter(t => t.type === 'income').length} income · ${transactions.filter(t => t.type === 'expense').length} expenses`,
      valueClass: 'text-slate-800',
    },
    {
      icon: Zap,
      iconClass: 'bg-pink-50 text-pink-500 border-pink-100',
      label: 'Highest Single Expense',
      value: maxExpense?.amount ? formatINR(maxExpense.amount) : '—',
      detail: maxExpense?.desc || 'No expenses',
      valueClass: 'text-slate-800',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div key={card.label} className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-sm transition-all">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border mb-3 ${card.iconClass}`}>
              <Icon size={15} />
            </div>
            <p className="text-slate-400 text-xs font-medium mb-1.5">{card.label}</p>
            <p className={`text-xl font-bold ${card.valueClass}`}>{card.value}</p>
            <p className="text-slate-400 text-xs mt-1">{card.detail}</p>
          </div>
        )
      })}
    </div>
  )
}