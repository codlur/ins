-- Create the posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  content TEXT NOT NULL,
  userId UUID NOT NULL,
  userName TEXT NOT NULL,
  isThread BOOLEAN DEFAULT false,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_posts_userId ON posts(userId);
CREATE INDEX IF NOT EXISTS idx_posts_createdAt ON posts(createdAt DESC);

-- Enable Row Level Security (RLS) for posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies for posts table
CREATE POLICY "Users can view all posts" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = userId);

CREATE POLICY "Users can update their own posts" ON posts
  FOR UPDATE USING (auth.uid() = userId);

CREATE POLICY "Users can delete their own posts" ON posts
  FOR DELETE USING (auth.uid() = userId);

-- Create a trigger to automatically update the updatedAt column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER IF NOT EXISTS update_posts_updated_at 
  BEFORE UPDATE ON posts 
  FOR EACH ROW 
  EXECUTE PROCEDURE update_updated_at_column();

-- Create a profiles table for additional user information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  username TEXT UNIQUE,
  avatar TEXT,
  banner TEXT,
  bio TEXT,
  twitter TEXT,
  linkedin TEXT,
  instagram TEXT,
  youtube TEXT,
  github TEXT,
  website TEXT,
  isPremium BOOLEAN DEFAULT true,
  isBusiness BOOLEAN DEFAULT false,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create a bookmarks table to store user bookmarks
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID REFERENCES auth.users NOT NULL,
  type TEXT NOT NULL, -- 'news', 'product', 'launch', 'post'
  title TEXT,
  content TEXT,
  author TEXT,
  sourceName TEXT,
  sourceUrl TEXT,
  publishedAt TIMESTAMP WITH TIME ZONE,
  bookmarkedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB -- Flexible field for additional data specific to each bookmark type
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookmarks_userId ON bookmarks(userId);
CREATE INDEX IF NOT EXISTS idx_bookmarks_type ON bookmarks(type);
CREATE INDEX IF NOT EXISTS idx_bookmarks_sourceUrl ON bookmarks(sourceUrl);

-- Enable Row Level Security (RLS) for bookmarks table
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policies for bookmarks table
CREATE POLICY "Users can view their own bookmarks" ON bookmarks
  FOR SELECT USING (auth.uid() = userId);

CREATE POLICY "Users can insert their own bookmarks" ON bookmarks
  FOR INSERT WITH CHECK (auth.uid() = userId);

CREATE POLICY "Users can delete their own bookmarks" ON bookmarks
  FOR DELETE USING (auth.uid() = userId);

-- Create a function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', ''), COALESCE(NEW.raw_user_meta_data->>'username', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();