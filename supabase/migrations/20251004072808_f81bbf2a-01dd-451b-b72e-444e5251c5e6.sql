-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create DataSources table
CREATE TABLE public.data_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  url TEXT NOT NULL,
  chart_type TEXT NOT NULL,
  last_fetched_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Scenarios table
CREATE TABLE public.scenarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  roi_inputs JSONB,
  roi_outputs JSONB,
  sustain_inputs JSONB,
  sustain_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Ventures table
CREATE TABLE public.ventures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  sector TEXT NOT NULL,
  stage TEXT NOT NULL,
  country TEXT NOT NULL,
  website TEXT,
  short_pitch TEXT,
  last_funding_usd DECIMAL(15,2),
  sustainability_score INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Tenders table
CREATE TABLE public.tenders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  agency TEXT NOT NULL,
  due_date DATE NOT NULL,
  link TEXT,
  tags TEXT[],
  posted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Investors table
CREATE TABLE public.investors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  focus_areas TEXT[],
  ticket_size_min_usd DECIMAL(15,2),
  ticket_size_max_usd DECIMAL(15,2),
  geo TEXT,
  link TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Bookmarks table
CREATE TABLE public.bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL,
  item_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Settings table
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nasa_api_key TEXT,
  data_sources JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.data_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for data_sources (public read, admin write)
CREATE POLICY "Anyone can view data sources" ON public.data_sources FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert data sources" ON public.data_sources FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update data sources" ON public.data_sources FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete data sources" ON public.data_sources FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS Policies for scenarios (user-specific)
CREATE POLICY "Users can view their own scenarios" ON public.scenarios FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own scenarios" ON public.scenarios FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own scenarios" ON public.scenarios FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for ventures (public read, authenticated write)
CREATE POLICY "Anyone can view ventures" ON public.ventures FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert ventures" ON public.ventures FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update ventures" ON public.ventures FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete ventures" ON public.ventures FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS Policies for tenders (public read, authenticated write)
CREATE POLICY "Anyone can view tenders" ON public.tenders FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert tenders" ON public.tenders FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update tenders" ON public.tenders FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete tenders" ON public.tenders FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS Policies for investors (public read, authenticated write)
CREATE POLICY "Anyone can view investors" ON public.investors FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert investors" ON public.investors FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update investors" ON public.investors FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete investors" ON public.investors FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS Policies for bookmarks (user-specific)
CREATE POLICY "Users can view their own bookmarks" ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own bookmarks" ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own bookmarks" ON public.bookmarks FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for settings (public read, authenticated write)
CREATE POLICY "Anyone can view settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert settings" ON public.settings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update settings" ON public.settings FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Insert default data sources
INSERT INTO public.data_sources (name, type, url, chart_type) VALUES
  ('CelesTrak Active Satellites', 'csv', 'https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=csv', 'pie'),
  ('Launch Library Upcoming', 'json', 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10', 'line');

-- Insert sample ventures
INSERT INTO public.ventures (name, sector, stage, country, website, short_pitch, last_funding_usd, sustainability_score) VALUES
  ('OrbitFab', 'In-Space Refueling', 'Series A', 'USA', 'https://orbitfab.com', 'Gas stations in space for satellite refueling', 15000000, 85),
  ('LeoLabs', 'Space Tracking', 'Series B', 'USA', 'https://leolabs.space', 'Commercial space tracking and debris monitoring', 82000000, 90),
  ('Varda Space', 'Space Manufacturing', 'Series A', 'USA', 'https://varda.com', 'In-space pharmaceutical manufacturing', 53000000, 78);

-- Insert sample tenders
INSERT INTO public.tenders (title, agency, due_date, link, tags) VALUES
  ('ISS Commercial Module Partnership', 'NASA', '2025-12-15', 'https://nasa.gov/tenders/iss-module', ARRAY['ISS', 'Commercial', 'Module']),
  ('Orbital Debris Removal Demo', 'ESA', '2025-11-30', 'https://esa.int/tenders/debris', ARRAY['Debris', 'Sustainability', 'Demo']);

-- Insert sample investors
INSERT INTO public.investors (name, focus_areas, ticket_size_min_usd, ticket_size_max_usd, geo, link) VALUES
  ('Space Capital', ARRAY['Infrastructure', 'Manufacturing'], 5000000, 50000000, 'Global', 'https://spacecapital.com'),
  ('Seraphim Space', ARRAY['Data', 'Sustainability'], 2000000, 25000000, 'UK/US', 'https://seraphim.vc');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_data_sources_updated_at BEFORE UPDATE ON public.data_sources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ventures_updated_at BEFORE UPDATE ON public.ventures FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investors_updated_at BEFORE UPDATE ON public.investors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();