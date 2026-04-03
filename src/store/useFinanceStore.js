import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MOCK_TRANSACTIONS } from '../data/mockData'

const useFinanceStore = create(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────
      transactions: MOCK_TRANSACTIONS,
      role: 'viewer',
      theme: 'dark',
      filters: {
        search: '',
        type: '',
        category: '',
        sortField: 'date',
        sortAsc: false,
      },

      // ── Role ───────────────────────────────────────
      setRole: (role) => set({ role }),

      // ── Theme ──────────────────────────────────────
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      // ── Filters ────────────────────────────────────
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      setSortField: (field) =>
        set((state) => ({
          filters: {
            ...state.filters,
            sortField: field,
            sortAsc:
              state.filters.sortField === field
                ? !state.filters.sortAsc
                : false,
          },
        })),

      resetFilters: () =>
        set({
          filters: {
            search: '',
            type: '',
            category: '',
            sortField: 'date',
            sortAsc: false,
          },
        }),

      // ── Transactions CRUD ──────────────────────────
      addTransaction: (tx) =>
        set((state) => ({
          transactions: [
            { ...tx, id: Date.now() },
            ...state.transactions,
          ],
        })),

      updateTransaction: (id, updated) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...updated } : tx
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),

      // ── Derived / Computed ─────────────────────────
      getFilteredTransactions: () => {
        const { transactions, filters } = get()
        const { search, type, category, sortField, sortAsc } = filters

        return transactions
          .filter((tx) => {
            const matchSearch =
              tx.desc.toLowerCase().includes(search.toLowerCase()) ||
              tx.category.toLowerCase().includes(search.toLowerCase())
            const matchType = type ? tx.type === type : true
            const matchCat = category ? tx.category === category : true
            return matchSearch && matchType && matchCat
          })
          .sort((a, b) => {
            let valA = a[sortField]
            let valB = b[sortField]
            if (sortField === 'date') {
              valA = new Date(valA)
              valB = new Date(valB)
            }
            if (valA < valB) return sortAsc ? -1 : 1
            if (valA > valB) return sortAsc ? 1 : -1
            return 0
          })
      },

      getSummary: () => {
        const { transactions } = get()
        const income = transactions
          .filter((tx) => tx.type === 'income')
          .reduce((sum, tx) => sum + tx.amount, 0)
        const expenses = transactions
          .filter((tx) => tx.type === 'expense')
          .reduce((sum, tx) => sum + tx.amount, 0)
        return { income, expenses, balance: income - expenses }
      },

      getCategoryTotals: () => {
        const { transactions } = get()
        return transactions
          .filter((tx) => tx.type === 'expense')
          .reduce((acc, tx) => {
            acc[tx.category] = (acc[tx.category] || 0) + tx.amount
            return acc
          }, {})
      },

      getMonthlyData: () => {
        const { transactions } = get()
        const map = {}
        transactions.forEach((tx) => {
          const date = new Date(tx.date)
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
          if (!map[key]) map[key] = { income: 0, expenses: 0 }
          if (tx.type === 'income') map[key].income += tx.amount
          else map[key].expenses += tx.amount
        })
        return Object.entries(map)
          .sort()
          .map(([key, val]) => {
            const [y, m] = key.split('-')
            return {
              month: new Date(y, m - 1).toLocaleString('default', {
                month: 'short',
                year: '2-digit',
              }),
              ...val,
            }
          })
      },
    }),
    {
      name: 'fintrek-storage', // localStorage key
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        theme: state.theme,
      }),
    }
  )
)

export default useFinanceStore