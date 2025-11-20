# Database Setup for Payment Integration

## Overview
This document provides instructions for setting up the Supabase database schema for payment processing and PDF downloads.

## Prerequisites
- Access to Supabase dashboard
- Database connection configured in `.env` file

## Manual Database Setup

Since automated migration is currently unavailable, please execute the following SQL in your Supabase SQL Editor:

### Step 1: Create Tables

```sql
-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  amount numeric(10, 2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  payment_gateway text NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending',
  transaction_id text,
  payment_method text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create downloads table
CREATE TABLE IF NOT EXISTS downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id uuid REFERENCES payments(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  resume_data jsonb NOT NULL,
  download_count integer DEFAULT 0,
  max_downloads integer DEFAULT 5,
  expires_at timestamptz DEFAULT (now() + interval '30 days'),
  created_at timestamptz DEFAULT now(),
  last_downloaded_at timestamptz
);

-- Create ats_scores table
CREATE TABLE IF NOT EXISTS ats_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  resume_data jsonb NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  recommendations jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);
```

### Step 2: Create Indexes

```sql
CREATE INDEX IF NOT EXISTS idx_payments_user_email ON payments(user_email);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);
CREATE INDEX IF NOT EXISTS idx_downloads_user_email ON downloads(user_email);
CREATE INDEX IF NOT EXISTS idx_downloads_payment_id ON downloads(payment_id);
CREATE INDEX IF NOT EXISTS idx_ats_scores_user_email ON ats_scores(user_email);
```

### Step 3: Enable Row Level Security

```sql
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE ats_scores ENABLE ROW LEVEL SECURITY;
```

### Step 4: Create RLS Policies

```sql
-- Payments policies
CREATE POLICY "Users can view their own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can create their own payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (user_email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can update their own payments"
  ON payments FOR UPDATE
  TO authenticated
  USING (user_email = current_setting('request.jwt.claims', true)::json->>'email')
  WITH CHECK (user_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Downloads policies
CREATE POLICY "Users can view their own downloads"
  ON downloads FOR SELECT
  TO authenticated
  USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can create their own downloads"
  ON downloads FOR INSERT
  TO authenticated
  WITH CHECK (user_email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can update their own downloads"
  ON downloads FOR UPDATE
  TO authenticated
  USING (user_email = current_setting('request.jwt.claims', true)::json->>'email')
  WITH CHECK (user_email = current_setting('request.jwt.claims', true)::json->>'email');

-- ATS scores policies
CREATE POLICY "Users can view their own ATS scores"
  ON ats_scores FOR SELECT
  TO authenticated
  USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can create their own ATS scores"
  ON ats_scores FOR INSERT
  TO authenticated
  WITH CHECK (user_email = current_setting('request.jwt.claims', true)::json->>'email');
```

### Step 5: Create Triggers

```sql
-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for payments table
DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Features Enabled

### 1. Payment Processing
- Support for multiple payment gateways (Stripe, Razorpay, PayPal, UPI)
- Transaction tracking and history
- Payment status management

### 2. Download Management
- Download count tracking (max 5 per payment)
- 30-day expiration on download links
- Resume data storage for regeneration

### 3. ATS Score Tracking
- Score calculation and storage
- Recommendations tracking
- Historical score data

## Security Notes

- All tables have Row Level Security (RLS) enabled
- Users can only access their own data
- Authentication is required for all operations
- Payment data is encrypted at rest by Supabase

## Testing

After setup, you can test the database with:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('payments', 'downloads', 'ats_scores');

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('payments', 'downloads', 'ats_scores');
```

## Next Steps

1. Execute all SQL commands in Supabase SQL Editor
2. Verify tables are created correctly
3. Test RLS policies with authenticated users
4. Configure payment gateway API keys in environment variables
