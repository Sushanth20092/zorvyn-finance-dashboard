import InsightCards from '../components/insights/InsightCards'
import MonthlyComparison from '../components/insights/MonthlyComparison'

export default function Insights() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-white text-xl font-bold">Insights</h2>
        <p className="text-[#64748b] text-xs font-mono mt-1">SPENDING PATTERNS & OBSERVATIONS</p>
      </div>

      <InsightCards />
      <MonthlyComparison />
    </div>
  )
}