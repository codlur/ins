-- Update policies for profiles table to allow users to insert and update their own profiles
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Also update policies for posts table to ensure proper access
DROP POLICY IF EXISTS "Users can view all posts" ON posts;
CREATE POLICY "Users can view all posts" ON posts
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own posts" ON posts;
CREATE POLICY "Users can insert their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = userId);

DROP POLICY IF EXISTS "Users can update their own posts" ON posts;
CREATE POLICY "Users can update their own posts" ON posts
  FOR UPDATE USING (auth.uid() = userId);

DROP POLICY IF EXISTS "Users can delete their own posts" ON posts;
CREATE POLICY "Users can delete their own posts" ON posts
  FOR DELETE USING (auth.uid() = userId);

-- Also update policies for bookmarks table to ensure proper access
DROP POLICY IF EXISTS "Users can view their own bookmarks" ON bookmarks;
CREATE POLICY "Users can view their own bookmarks" ON bookmarks
  FOR SELECT USING (auth.uid() = userId);

DROP POLICY IF EXISTS "Users can insert their own bookmarks" ON bookmarks;
CREATE POLICY "Users can insert their own bookmarks" ON bookmarks
  FOR INSERT WITH CHECK (auth.uid() = userId);

DROP POLICY IF EXISTS "Users can delete their own bookmarks" ON bookmarks;
CREATE POLICY "Users can delete their own bookmarks" ON bookmarks
  FOR DELETE USING (auth.uid() = userId);