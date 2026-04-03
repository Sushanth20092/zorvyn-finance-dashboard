import SummaryCards from '../components/dashboard/SummaryCards'
import BalanceTrend from '../components/dashboard/BalanceTrend'
import SpendingDonut from '../components/dashboard/SpendingDonut'
import RecentTransactions from '../components/dashboard/RecentTransactions'

export default function Dashboard({ onNavigate }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-white text-xl font-bold">Good morning, Sushanth 👋</h2>
        <p className="text-[#64748b] text-xs font-mono mt-1">HERE'S YOUR FINANCIAL SNAPSHOT</p>
      </div>

      <SummaryCards />

      <div className="flex gap-4">
        <BalanceTrend />
        <SpendingDonut />
      </div>

      <RecentTransactions onNavigate={onNavigate} />
    </div>
  )
}