import Sidebar from './Sidebar'
import Topbar from './Topbar'
import useFinanceStore from '../../store/useFinanceStore'
import { useEffect } from 'react'

export default function Layout({ children, currentPage, onNavigate }) {
  const theme = useFinanceStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="flex min-h-screen bg-[#0f1117]">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="flex flex-col flex-1 ml-60">
        <Topbar currentPage={currentPage} />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}