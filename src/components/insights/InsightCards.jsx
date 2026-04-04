import useFinanceStore from '../../store/useFinanceStore'
import { formatINR } from '../../utils/formatters'
import { CATEGORIES } from '../../constants/categories'

export default function InsightCards() {
  const getSummary = useFinanceStore((s) => s.getSummary)
  const getCategoryTotals = useFinanceStore((s) => s.getCategoryTotals)
  const getMonthlyData = useFinanceStore((s) => s.getMonthlyData)

  const { income, expenses, balance } = getSummary()
  const categoryTotals = getCategoryTotals()
  const monthly = getMonthlyData()

  // Highest spending category
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]

  // Savings rate
  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0

  // Month over month change
  const lastTwo = monthly.slice(-2)
  const momChange = lastTwo.length === 2
    ? (((lastTwo[1].expenses - lastTwo[0].expenses) / lastTwo[0].expenses) * 100).toFixed(1)
    : null

  // Avg monthly expense
  const avgMonthlyExpense = monthly.length > 0
    ? monthly.reduce((sum, m) => sum + m.expenses, 0) / monthly.length
    : 0

  const cards = [
    {
      emoji: '🏆',
      label: 'TOP SPENDING CATEGORY',
      value: topCategory ? topCategory[0] : '—',
      detail: topCategory ? `${formatINR(topCategory[1])} total spent` : 'No expense data',
      accent: topCategory ? CATEGORIES[topCategory[0]]?.text : 'text-white',
    },
    {
      emoji: '💰',
      label: 'SAVINGS RATE',
      value: `${savingsRate}%`,
      detail: `${formatINR(balance)} saved of ${formatINR(income)} earned`,
      accent: Number(savingsRate) >= 20 ? 'text-emerald-400' : 'text-amber-400',
    },
    {
      emoji: '📊',
      label: 'AVG MONTHLY EXPENSE',
      value: formatINR(Math.round(avgMonthlyExpense)),
      detail: `Across ${monthly.length} month${monthly.length !== 1 ? 's' : ''} of data`,
      accent: 'text-indigo-400',
    },
    {
      emoji: '📈',
      label: 'EXPENSE CHANGE (MoM)',
      value: momChange !== null ? `${momChange > 0 ? '+' : ''}${momChange}%` : '—',
      detail: momChange !== null
        ? momChange > 0 ? 'Spending increased vs last month' : 'Spending decreased vs last month'
        : 'Not enough data',
      accent: momChange > 0 ? 'text-red-400' : 'text-emerald-400',
    },
    {
      emoji: '🧾',
      label: 'TOTAL TRANSACTIONS',
      value: String(useFinanceStore.getState().transactions.length),
      detail: `${useFinanceStore.getState().transactions.filter(t => t.type === 'income').length} income · ${useFinanceStore.getState().transactions.filter(t => t.type === 'expense').length} expenses`,
      accent: 'text-blue-400',
    },
    {
      emoji: '⚡',
      label: 'HIGHEST SINGLE EXPENSE',
      value: (() => {
        const expenses = useFinanceStore.getState().transactions.filter(t => t.type === 'expense')
        if (!expenses.length) return '—'
        const max = expenses.reduce((a, b) => a.amount > b.amount ? a : b)
        return formatINR(max.amount)
      })(),
      detail: (() => {
        const expenses = useFinanceStore.getState().transactions.filter(t => t.type === 'expense')
        if (!expenses.length) return 'No expenses'
        const max = expenses.reduce((a, b) => a.amount > b.amount ? a : b)
        return max.desc
      })(),
      accent: 'text-pink-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <div key={card.label} className="bg-[#1a1d27] rounded-xl p-5 border border-[#2a2d3a] hover:border-[#3a3d4a] transition-all">
          <div className="text-2xl mb-3">{card.emoji}</div>
          <p className="text-[#64748b] text-xs font-mono tracking-widest mb-2">{card.label}</p>
          <p className={`text-xl font-bold ${card.accent}`}>{card.value}</p>
          <p className="text-[#64748b] text-xs mt-1.5">{card.detail}</p>
        </div>
      ))}
    </div>
  )
}