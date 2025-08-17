# THRIVE Work - Supabase Setup

## 1. Create Supabase Database Tables

Run these SQL commands in your Supabase SQL editor:

```sql
-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_type TEXT CHECK (user_type IN ('individual', 'company')) DEFAULT 'individual',
    company_id UUID REFERENCES companies(id),
    onboarding_completed BOOLEAN DEFAULT FALSE,
    first_name TEXT,
    last_name TEXT,
    job_title TEXT,
    department TEXT
);

-- Companies table
CREATE TABLE companies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    admin_id UUID REFERENCES auth.users(id) NOT NULL,
    employee_count TEXT,
    industry TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessments table
CREATE TABLE assessments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    company_id UUID REFERENCES companies(id),
    responses JSONB NOT NULL,
    thrive_scores JSONB,
    ocean_scores JSONB,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company insights table (aggregated data)
CREATE TABLE company_insights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES companies(id) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    total_assessments INTEGER DEFAULT 0,
    avg_thrive_scores JSONB,
    avg_ocean_scores JSONB,
    insights JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_insights ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: users can see their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Companies: admins can see their company, employees can see their company
CREATE POLICY "Company admins can view their company" ON companies
    FOR SELECT USING (auth.uid() = admin_id);

CREATE POLICY "Company employees can view their company" ON companies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.company_id = companies.id
        )
    );

-- Assessments: users can see their own assessments, company admins can see company assessments
CREATE POLICY "Users can view own assessments" ON assessments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments" ON assessments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Company admins can view company assessments" ON assessments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM companies 
            WHERE companies.id = assessments.company_id 
            AND companies.admin_id = auth.uid()
        )
    );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 2. Update Configuration

Replace the placeholder values in `/assets/js/auth.js`:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

## 3. Auth Settings in Supabase Dashboard

1. Go to Authentication > Settings
2. Set Site URL to: `https://thrive-work.com`
3. Add redirect URLs:
   - `https://thrive-work.com/auth/callback`
   - `http://localhost:3000/auth/callback` (for development)

## 4. Email Templates (Optional)

Customize the magic link email template in Authentication > Templates

## 5. Test the Flow

1. Try signing up with your email
2. Check the magic link email
3. Verify callback handling works
4. Test both individual and company signup flows