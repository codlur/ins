-- SQL script to add demo content to the database
-- Run this in the Supabase SQL editor

-- Insert demo posts
INSERT INTO posts (title, content, userId, userName, isThread) VALUES
('Demo Product Launch Announcement', 'We''re excited to announce the launch of our new demo product! This is just a sample post to showcase our platform capabilities.', 'demo-user-1', 'Demo User', false),
('Sample AI Launch Coming Soon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a placeholder post for an upcoming AI product launch.', 'demo-user-2', 'Test Account', false),
('Example Post', 'This is an example post with no real content. It''s just here for testing purposes.', 'demo-user-3', 'Demo Tester', true),
('', 'This post has no title, just content. It''s a demo post for testing edge cases.', 'demo-user-1', 'Demo User', false);

-- Insert demo bookmarks
INSERT INTO bookmarks (userId, type, title, content, author, sourceName, sourceUrl, publishedAt, metadata) VALUES
('demo-user-1', 'product', 'Demo Product Announcement', 'Introducing our new demo product that showcases the latest in AI technology.', 'Demo Team', 'Demo Source', 'https://example.com/demo-product', NOW(), '{"name": "Demo Product", "description": "A sample product for demonstration purposes"}'),
('demo-user-2', 'launch', 'Upcoming Launch Preview', 'Sneak peek at our upcoming product launch. Coming soon!', 'Test Author', 'Test Source', 'https://example.com/upcoming-launch', NOW(), '{}'),
('demo-user-1', 'news', 'Sample News Article', 'This is a sample news article for testing bookmark functionality.', 'Demo Writer', 'Demo News', 'https://example.com/sample-news', NOW(), '{}');

-- Verify the inserted data
SELECT 'Posts' as table_name, COUNT(*) as count FROM posts
UNION ALL
SELECT 'Bookmarks' as table_name, COUNT(*) as count FROM bookmarks;