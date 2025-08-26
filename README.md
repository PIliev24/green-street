# Green Street - Transaction Management App

A modern, responsive transaction management application built with Next.js, Supabase, and shadcn/ui.

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure login/logout with Supabase Auth
- **Transaction Management** - Create, view, and track transactions
- **Contractor Management** - Search and select contractors with avatars
- **Real-time Data** - Live updates using SWR for data fetching
- **Status Tracking** - Transaction states: SEND (red), RECEIVED (yellow), PAYED (green)

### User Experience
- **Responsive Design** - Mobile-first approach with breakpoint optimization
- **Search & Filter** - Real-time search across transactions and contractors
- **Sortable Tables** - Click column headers to sort by date, amount, or contractor
- **Smart Forms** - Self-transaction prevention and form validation
- **Toast Notifications** - User feedback with Sonner
- **Loading States** - Proper loading indicators throughout the app

### Technical Features
- **Server Actions** - Next.js 13+ server actions for database operations
- **Type Safety** - Full TypeScript with Zod validation
- **Responsive Tables** - Horizontal scroll on mobile, proper overflow handling
- **Sticky Header** - Persistent navigation with adaptive sizing
- **Debounced Search** - Optimized search with 300ms debouncing

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Fetching**: SWR
- **Validation**: Zod
- **Notifications**: Sonner
- **Package Manager**: pnpm

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/green-street.git
cd green-street
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run database migrations:
```bash
# Run the SQL files in the migrations/ folder in your Supabase dashboard
```

5. Start the development server:
```bash
pnpm dev
```

## 🗃️ Database Schema

### Contractors Table
- `id` (UUID, Primary Key)
- `name` (Text)
- `image` (Text, Profile image URL)
- `created_at` (Timestamp)

### Transactions Table
- `id` (UUID, Primary Key)
- `date` (Date)
- `account_from` (UUID, Foreign Key to contractors)
- `account_to` (UUID, Foreign Key to contractors)
- `amount` (Integer, stored in cents)
- `state` (Enum: SEND, RECEIVED, PAYED)
- `created_at` (Timestamp)

## 🏗️ Project Structure

```
green-street/
├── actions/              # Server actions for database operations
├── app/                  # Next.js app router pages
├── components/           # Reusable React components
│   ├── ui/              # shadcn/ui base components
│   └── ...              # Custom application components
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries (Supabase client)
├── migrations/          # Database migration scripts
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## 🎨 Component Architecture

### Main Components
- **HomePage** - Dashboard with transaction table and create form
- **TransactionsTable** - Sortable, searchable transaction display
- **CreateTransactionForm** - Form for creating new transactions
- **ContractorSelect** - Searchable contractor dropdown
- **TransactionView** - Detailed transaction page

### Reusable Components
- **AppHeader** - Responsive navigation header
- **SortableTableHeader** - Clickable column headers with sort indicators
- **TransactionRow** - Individual transaction table row
- **TransactionStateBadge** - Color-coded status badges

## 🔧 Key Features Implementation

### Search & Sort
```typescript
// Custom hook for transaction filtering
const { searchQuery, sortConfig, filteredTransactions } = useTransactionFiltering(transactions);
```

### Self-Transaction Prevention
```typescript
// Both client-side and server-side validation
if (account_from === account_to) {
  return { errors: { account_to: ["Cannot send money to the same person"] } };
}
```

### Responsive Design
```typescript
// Mobile-first approach with breakpoints
<div className="h-14 sm:h-16">  // Smaller on mobile
<span className="hidden sm:inline">Sign Out</span>  // Adaptive text
```

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any hosting service that supports Next.js.

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

## 📱 Mobile Optimization

- **Touch-friendly** interfaces with proper spacing
- **Horizontal scroll** for wide tables
- **Adaptive text sizing** based on screen size
- **Sticky header** that works on mobile browsers
- **Optimized forms** with proper keyboard types

## 🔒 Security Features

- **Server-side validation** for all forms
- **Protected routes** with middleware
- **Type-safe database operations**
- **SQL injection protection** via Supabase
- **XSS protection** through proper escaping

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Bug Reports

If you encounter any issues, please create an issue on GitHub with detailed information about the problem.
