# Database Migrations

This folder contains SQL migration files for the Green Street application.

## Running Migrations

To apply these migrations to your Supabase database:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run each migration file in order:
   - `001_create_contractors_table.sql` - Creates the contractors table
   - `002_create_transactions_table.sql` - Creates the transactions table with enum
   - `003_seed_contractors.sql` - Seeds the contractors table with 50 mock entries

## Tables Created

### contractors

- `id`: UUID (Primary Key)
- `name`: VARCHAR(100) (Required)
- `image`: TEXT (Required) - URL to contractor's image
- `created_at`: TIMESTAMP

### transactions

- `id`: UUID (Primary Key)
- `date`: TIMESTAMP (defaults to NOW())
- `account_from`: UUID (Foreign Key to contractors.id)
- `account_to`: UUID (Foreign Key to contractors.id)
- `amount`: INTEGER (Required, positive) - Amount in cents
- `state`: ENUM ('SEND', 'RECEIVED', 'PAYED') - defaults to 'SEND'
- `created_at`: TIMESTAMP

## Security

Row Level Security (RLS) is enabled on both tables with appropriate policies for authenticated users.
