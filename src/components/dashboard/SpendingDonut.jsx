import useFinanceStore from '../../store/useFinanceStore'
import { formatINR } from '../../utils/formatters'
import { CATEGORIES } from '../../constants/categories'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-slate-400 mb-1">{payload[0].name}</p>
      <p className="text-slate-800 font-bold">{formatINR(payload[0].value)}</p>
    </div>
  )
}

export default function SpendingDonut() {
  const getCategoryTotals = useFinanceStore((s) => s.getCategoryTotals)
  const totals = getCategoryTotals()

  const data = Object.entries(totals).map(([name, value]) => ({
    name, value, color: CATEGORIES[name]?.color || '#64748b',
  }))

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-5 border border-slate-200 w-full lg:w-72 flex items-center justify-center">
        <p className="text-slate-400 text-sm">No expense data</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 w-full lg:w-72 hover:shadow-sm transition-all">
      <div className="mb-3">
        <h3 className="text-slate-800 font-semibold text-sm">Spending Breakdown</h3>
        <p className="text-slate-400 text-xs mt-0.5">By category</p>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-1.5 mt-1">
        {data.slice(0, 4).map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-slate-500 text-xs">{item.name}</span>
            </div>
            <span className="text-slate-700 text-xs font-mono font-medium">{formatINR(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}