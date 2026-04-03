import useFinanceStore from '../../store/useFinanceStore'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Eye,
  Zap,
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
]

export default function Sidebar({ currentPage, onNavigate }) {
  const { role, setRole, transactions } = useFinanceStore()

  return (
    <aside className="fixed top-0 left-0 h-full w-60 bg-[#1a1d27] border-r border-[#2a2d3a] flex flex-col z-50">
      
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#2a2d3a]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
            F
          </div>
          <div>
            <div className="text-white font-bold text-base leading-none">Fintrek</div>
            <div className="text-[#64748b] text-[10px] tracking-widest mt-0.5 font-mono">FINANCE OS</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        <span className="text-[#64748b] text-[10px] tracking-widest font-mono px-3 mb-1">MAIN</span>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = currentPage === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-left transition-all
                ${isActive
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  : 'text-[#64748b] hover:bg-[#2a2d3a] hover:text-white'
                }`}
            >
              <Icon size={16} />
              {label}
              {id === 'transactions' && (
                <span className="ml-auto bg-indigo-500/20 text-indigo-400 text-[10px] font-mono px-2 py-0.5 rounded-full">
                  {transactions.length}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Role Switcher */}
      <div className="px-4 py-4 border-t border-[#2a2d3a]">
        <div className="bg-[#0f1117] rounded-lg p-3 border border-[#2a2d3a]">
          <p className="text-[#64748b] text-[10px] tracking-widest font-mono mb-2">ACTIVE ROLE</p>
          <div className="flex gap-2">
            <button
              onClick={() => setRole('viewer')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-semibold transition-all
                ${role === 'viewer'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-[#64748b] hover:text-white'
                }`}
            >
              <Eye size={12} /> Viewer
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-semibold transition-all
                ${role === 'admin'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-[#64748b] hover:text-white'
                }`}
            >
              <Zap size={12} /> Admin
            </button>
          </div>
        </div>
      </div>

    </aside>
  )
}