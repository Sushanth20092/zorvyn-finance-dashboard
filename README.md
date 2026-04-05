# Fintrek — Finance Dashboard

A clean, interactive finance dashboard built as part of the Zorvyn Frontend Developer Intern screening assessment.

---

## Live Demo

(https://zorvyn-finance-dashboard-orcin.vercel.app/)

---

## Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | React 19 + Vite | Fast dev setup, component-based architecture |
| Styling | Tailwind CSS v4 | Utility-first, consistent design system |
| State Management | Zustand | Lightweight, minimal boilerplate, built-in persistence |
| Charts | Recharts | React-native, composable chart components |
| Icons | Lucide React | Consistent, clean icon set |
| Language | JavaScript (JSX) | Appropriate for scope, no unnecessary complexity |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd Zorvyn

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
npm run preview
```

---

## Project Structure

src/
├── components/
│   ├── layout/          # Sidebar, Topbar, Layout wrapper
│   ├── dashboard/       # SummaryCards, BalanceTrend, SpendingDonut, RecentTransactions
│   ├── transactions/    # TransactionTable, TransactionModal, Filters
│   ├── insights/        # InsightCards, MonthlyComparison
│   └── ui/              # Shared components (CategoryIcon)
├── store/
│   └── useFinanceStore.js   # Zustand store — single source of truth
├── data/
│   └── mockData.js          # Seed transactions
├── utils/
│   └── formatters.js        # Currency (INR) and date formatters
├── constants/
│   └── categories.js        # Category metadata (colors, icons, labels)
└── pages/
├── Dashboard.jsx
├── Transactions.jsx
└── Insights.jsx

---

## Features

### Dashboard Overview
- Summary cards showing Total Balance, Income, and Expenses
- Balance trend area chart showing running balance over time
- Spending breakdown donut chart by category
- Recent activity list with the 5 latest transactions

### Transactions
- Full transaction table with description, category, date, amount, and type
- Search by description or category
- Filter by type (income/expense) and category
- Sort by date, amount, or category (ascending/descending)
- Admin-only: Add, edit, and delete transactions via modal with form validation

### Insights
- Top spending category
- Savings rate
- Average monthly expense
- Month-over-month expense change
- Highest single expense
- Monthly income vs expenses bar chart

### Role-Based UI
Roles are simulated on the frontend via a toggle in the sidebar:
- **Viewer** — read-only access, no add/edit/delete controls visible
- **Admin** — full access including transaction management

### Data Persistence
All transactions, selected role, and theme are persisted to `localStorage` via Zustand's `persist` middleware. Data survives page refreshes.

### Export
Transactions can be exported as a JSON file via the Export button in the topbar.

### Responsive Design
- Fully responsive across desktop, tablet, and mobile
- Collapsible sidebar with overlay on mobile screens

---

## State Management Approach

A single Zustand store (`useFinanceStore`) manages all application state:

- **Transactions** — full CRUD operations
- **Filters** — search, type, category, sort field, sort direction
- **Role** — viewer or admin
- **Derived computations** — `getFilteredTransactions`, `getSummary`, `getCategoryTotals`, `getMonthlyData` are computed inside the store as functions, keeping components clean and logic centralised
- **Persistence** — `persist` middleware syncs a subset of state to localStorage automatically

---

## Assumptions Made

- Data is mock/static — no backend or API integration
- Authentication is not required — role switching is for UI demonstration only
- INR (Indian Rupee) is used as the currency throughout
- Dates are in the recent past (Jan–Mar 2026) for meaningful chart data

---