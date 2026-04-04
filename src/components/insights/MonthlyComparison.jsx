import useFinanceStore from '../../store/useFinanceStore'
import { formatINR } from '../../utils/formatters'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-lg px-3 py-2.5 text-xs">
      <p className="text-[#64748b] font-mono mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-[#64748b]">{p.name}:</span>
          <span className="text-white font-semibold">{formatINR(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function MonthlyComparison() {
  const getMonthlyData = useFinanceStore((s) => s.getMonthlyData)
  const data = getMonthlyData()

  if (data.length === 0) {
    return (
      <div className="bg-[#1a1d27] rounded-xl border border-[#2a2d3a] py-16 text-center">
        <p className="text-4xl mb-3">📊</p>
        <p className="text-[#64748b] text-sm font-mono">No monthly data available</p>
      </div>
    )
  }

  return (
    <div className="bg-[#1a1d27] rounded-xl p-5 border border-[#2a2d3a]">
      <div className="mb-5">
        <h3 className="text-white font-semibold text-sm">Monthly Comparison</h3>
        <p className="text-[#64748b] text-xs font-mono mt-0.5">INCOME VS EXPENSES PER MONTH</p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace', color: '#64748b' }}
          />
          <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}