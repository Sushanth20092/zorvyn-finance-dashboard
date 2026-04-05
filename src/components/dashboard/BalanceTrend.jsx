import useFinanceStore from '../../store/useFinanceStore'
import { formatINR } from '../../utils/formatters'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-slate-400 font-mono mb-1">{label}</p>
      <p className="text-indigo-600 font-bold">{formatINR(payload[0].value)}</p>
    </div>
  )
}

export default function BalanceTrend() {
  const getMonthlyData = useFinanceStore((s) => s.getMonthlyData)
  const monthly = getMonthlyData()

  let running = 0
  const data = monthly.map((m) => {
    running += m.income - m.expenses
    return { month: m.month, balance: running }
  })

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 flex-1 hover:shadow-sm transition-all">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-slate-800 font-semibold text-sm">Balance Trend</h3>
          <p className="text-slate-400 text-xs mt-0.5">Running balance over time</p>
        </div>
        <span className="bg-indigo-50 text-indigo-500 text-xs font-mono px-2 py-1 rounded-full border border-indigo-100">
          {data.length}mo
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={2} fill="url(#balanceGrad)" dot={{ fill: '#6366f1', r: 3, strokeWidth: 0 }} activeDot={{ r: 5, strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}