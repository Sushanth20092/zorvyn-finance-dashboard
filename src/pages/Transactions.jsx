import { useState } from 'react'
import useFinanceStore from '../store/useFinanceStore'
import Filters from '../components/transactions/Filters'
import TransactionTable from '../components/transactions/TransactionTable'
import TransactionModal from '../components/transactions/TransactionModal'
import { Plus } from 'lucide-react'

export default function Transactions() {
  const role = useFinanceStore((s) => s.role)
  const isAdmin = role === 'admin'
  const [modalOpen, setModalOpen] = useState(false)
  const [editTx, setEditTx] = useState(null)

  function handleEdit(tx) {
    setEditTx(tx)
    setModalOpen(true)
  }

  function handleClose() {
    setModalOpen(false)
    setEditTx(null)
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">Transactions</h2>
          <p className="text-[#64748b] text-xs font-mono mt-1">ALL FINANCIAL ACTIVITY</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold transition-all"
          >
            <Plus size={15} /> Add Transaction
          </button>
        )}
      </div>

      <Filters />
      <TransactionTable onEdit={handleEdit} />

      <TransactionModal
        isOpen={modalOpen}
        onClose={handleClose}
        editTx={editTx}
      />
    </div>
  )
}