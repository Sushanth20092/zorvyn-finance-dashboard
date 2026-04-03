import useFinanceStore from '../../store/useFinanceStore'
import { formatINR } from '../../utils/formatters'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-lg px-3 py-2 text-xs">
      <p className="text-[#64748b] font-mono mb-1">{label}</p>
      <p className="text-indigo-400 font-bold">{formatINR(payload[0].value)}</p>
    </div>
  )
}

export default function BalanceTrend() {
  const getMonthlyData = useFinanceStore((s) => s.getMonthlyData)
  const monthly = getMonthlyData()

  // Build running balance
  let running = 0
  const data = monthly.map((m) => {
    running += m.income - m.expenses
    return { month: m.month, balance: running }
  })

  return (
    <div className="bg-[#1a1d27] rounded-xl p-5 border border-[#2a2d3a] flex-1">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-white font-semibold text-sm">Balance Trend</h3>
          <p className="text-[#64748b] text-xs font-mono mt-0.5">RUNNING BALANCE OVER TIME</p>
        </div>
        <span className="bg-indigo-500/10 text-indigo-400 text-xs font-mono px-2 py-1 rounded-full border border-indigo-500/20">
          {data.length} months
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'monospace' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={2.5} fill="url(#balanceGrad)" dot={{ fill: '#6366f1', r: 4 }} activeDot={{ r: 6 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}