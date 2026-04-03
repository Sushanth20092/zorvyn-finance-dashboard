import useFinanceStore from '../../store/useFinanceStore'
import { formatINR } from '../../utils/formatters'
import { CATEGORIES } from '../../constants/categories'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-lg px-3 py-2 text-xs">
      <p className="text-[#64748b] font-mono mb-1">{payload[0].name}</p>
      <p className="text-white font-bold">{formatINR(payload[0].value)}</p>
    </div>
  )
}

export default function SpendingDonut() {
  const getCategoryTotals = useFinanceStore((s) => s.getCategoryTotals)
  const totals = getCategoryTotals()

  const data = Object.entries(totals).map(([name, value]) => ({
    name,
    value,
    color: CATEGORIES[name]?.color || '#64748b',
    emoji: CATEGORIES[name]?.emoji || '📦',
  }))

  if (data.length === 0) {
    return (
      <div className="bg-[#1a1d27] rounded-xl p-5 border border-[#2a2d3a] w-72 flex items-center justify-center">
        <p className="text-[#64748b] text-sm font-mono">No expense data</p>
      </div>
    )
  }

  return (
    <div className="bg-[#1a1d27] rounded-xl p-5 border border-[#2a2d3a] w-72">
      <div className="mb-4">
        <h3 className="text-white font-semibold text-sm">Spending Breakdown</h3>
        <p className="text-[#64748b] text-xs font-mono mt-0.5">BY CATEGORY</p>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-2 mt-2">
        {data.slice(0, 4).map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[#64748b] text-xs">{item.emoji} {item.name}</span>
            </div>
            <span className="text-white text-xs font-mono">{formatINR(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}