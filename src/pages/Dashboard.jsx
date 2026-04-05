import SummaryCards from '../components/dashboard/SummaryCards'
import BalanceTrend from '../components/dashboard/BalanceTrend'
import SpendingDonut from '../components/dashboard/SpendingDonut'
import RecentTransactions from '../components/dashboard/RecentTransactions'

export default function Dashboard({ onNavigate }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-slate-900 text-lg font-semibold">Good morning, Sushanth</h2>
        <p className="text-slate-400 text-xs mt-0.5">Here is your financial snapshot for April 2026</p>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:flex lg:flex-row gap-4">
        <BalanceTrend />
        <SpendingDonut />
      </div>

      <RecentTransactions onNavigate={onNavigate} />
    </div>
  )
}