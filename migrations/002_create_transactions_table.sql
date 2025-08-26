-- Create transaction state enum
CREATE TYPE transaction_state AS ENUM ('SEND', 'RECEIVED', 'PAYED');

-- Create transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    account_from UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
    account_to UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL CHECK (amount > 0),
    state transaction_state NOT NULL DEFAULT 'SEND',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraint to prevent self-transactions
    CONSTRAINT no_self_transactions CHECK (account_from != account_to)
);

-- Add RLS (Row Level Security)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read and create transactions
CREATE POLICY "Authenticated users can view transactions" ON transactions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create transactions" ON transactions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update transactions" ON transactions
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_transactions_account_from ON transactions (account_from);
CREATE INDEX idx_transactions_account_to ON transactions (account_to);
CREATE INDEX idx_transactions_date ON transactions (date);
CREATE INDEX idx_transactions_state ON transactions (state);
CREATE INDEX idx_transactions_created_at ON transactions (created_at);
