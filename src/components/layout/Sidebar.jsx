import useFinanceStore from '../../store/useFinanceStore'
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  Eye, Zap, TrendingUp, X
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Overview',     icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights',     label: 'Insights',     icon: Lightbulb },
]

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }) {
  const { role, setRole, transactions } = useFinanceStore()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed top-0 left-0 h-full w-56 bg-slate-900 flex flex-col z-50 transition-transform duration-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

        {/* Logo */}
        <div className="px-5 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
              <TrendingUp size={13} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-white font-bold text-sm tracking-tight">Fintrek</div>
              <div className="text-slate-500 text-[9px] tracking-[0.15em] mt-0.5">FINANCE OS</div>
            </div>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3">
          <p className="text-slate-600 text-[9px] tracking-[0.15em] font-medium px-2 mb-2">NAVIGATION</p>
          <div className="flex flex-col gap-0.5">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const isActive = currentPage === id
              return (
                <button
                  key={id}
                  onClick={() => { onNavigate(id); onClose(); }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm w-full text-left transition-all duration-150
                    ${isActive
                      ? 'bg-indigo-500 text-white font-medium'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                >
                  <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
                  <span>{label}</span>
                  {id === 'transactions' && (
                    <span className={`ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded
                      ${isActive ? 'bg-indigo-400 text-white' : 'bg-slate-800 text-slate-500'}`}>
                      {transactions.length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Role Switcher */}
        <div className="px-3 pb-5">
          <p className="text-slate-600 text-[9px] tracking-[0.15em] font-medium px-2 mb-2">ROLE</p>
          <div className="bg-slate-800 rounded-lg p-1 flex gap-1">
            <button
              onClick={() => setRole('viewer')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150
                ${role === 'viewer'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-300'
                }`}
            >
              <Eye size={11} /> Viewer
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150
                ${role === 'admin'
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-300'
                }`}
            >
              <Zap size={11} /> Admin
            </button>
          </div>
        </div>

      </aside>
    </>
  )
}