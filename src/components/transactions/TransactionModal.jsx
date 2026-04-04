import { useState, useEffect } from 'react'
import useFinanceStore from '../../store/useFinanceStore'
import { CATEGORY_NAMES } from '../../constants/categories'
import { X } from 'lucide-react'

const EMPTY_FORM = {
  desc: '',
  amount: '',
  type: 'expense',
  category: 'Food',
  date: new Date().toISOString().split('T')[0],
}

export default function TransactionModal({ isOpen, onClose, editTx }) {
  const { addTransaction, updateTransaction } = useFinanceStore()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editTx) {
      setForm({ ...editTx, amount: String(editTx.amount) })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [editTx, isOpen])

  function validate() {
    const e = {}
    if (!form.desc.trim()) e.desc = 'Description is required'
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid amount'
    if (!form.date) e.date = 'Date is required'
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }

    const tx = { ...form, amount: Number(form.amount) }
    if (editTx) {
      updateTransaction(editTx.id, tx)
    } else {
      addTransaction(tx)
    }
    onClose()
  }

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl w-full max-w-md p-6 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-lg">
            {editTx ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose} className="text-[#64748b] hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="text-[#64748b] text-xs font-mono tracking-widest block mb-1.5">DESCRIPTION</label>
          <input
            value={form.desc}
            onChange={(e) => set('desc', e.target.value)}
            placeholder="e.g. Netflix Subscription"
            className="w-full bg-[#0f1117] border border-[#2a2d3a] rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-[#3a3d4a]"
          />
          {errors.desc && <p className="text-red-400 text-xs mt-1">{errors.desc}</p>}
        </div>

        {/* Amount + Type */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-[#64748b] text-xs font-mono tracking-widest block mb-1.5">AMOUNT (₹)</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => set('amount', e.target.value)}
              placeholder="0"
              min="0"
              className="w-full bg-[#0f1117] border border-[#2a2d3a] rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-[#3a3d4a]"
            />
            {errors.amount && <p className="text-red-400 text-xs mt-1">{errors.amount}</p>}
          </div>
          <div>
            <label className="text-[#64748b] text-xs font-mono tracking-widest block mb-1.5">TYPE</label>
            <select
              value={form.type}
              onChange={(e) => set('type', e.target.value)}
              className="w-full bg-[#0f1117] border border-[#2a2d3a] rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        {/* Category + Date */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <label className="text-[#64748b] text-xs font-mono tracking-widest block mb-1.5">CATEGORY</label>
            <select
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              className="w-full bg-[#0f1117] border border-[#2a2d3a] rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
            >
              {CATEGORY_NAMES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[#64748b] text-xs font-mono tracking-widest block mb-1.5">DATE</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
              className="w-full bg-[#0f1117] border border-[#2a2d3a] rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
            />
            {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#2a2d3a] text-[#64748b] hover:text-white text-sm font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold transition-all"
          >
            {editTx ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>

      </div>
    </div>
  )
}