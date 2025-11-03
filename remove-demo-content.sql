-- SQL script to remove demo content from the database
-- Run this in the Supabase SQL editor

-- First, let's see what we're working with
SELECT 'Posts' as table_name, COUNT(*) as total_count FROM posts
UNION ALL
SELECT 'Bookmarks' as table_name, COUNT(*) as total_count FROM bookmarks;

-- Show demo posts that would be deleted
SELECT 'Posts to delete' as action, COUNT(*) as count FROM posts 
WHERE 
  LOWER(title) LIKE '%demo%' OR
  LOWER(title) LIKE '%sample%' OR
  LOWER(title) LIKE '%test%' OR
  LOWER(title) LIKE '%placeholder%' OR
  LOWER(content) LIKE '%lorem ipsum%' OR
  LOWER(content) LIKE '%demo%' OR
  LOWER(content) LIKE '%sample%' OR
  LOWER(content) LIKE '%test%' OR
  LOWER(content) LIKE '%placeholder%' OR
  LOWER(userName) LIKE '%demo%' OR
  LOWER(userName) LIKE '%test%' OR
  (title = '' AND LENGTH(content) < 50);

-- Show demo bookmarks that would be deleted
SELECT 'Bookmarks to delete' as action, COUNT(*) as count FROM bookmarks
WHERE
  LOWER(title) LIKE '%demo%' OR
  LOWER(title) LIKE '%sample%' OR
  LOWER(title) LIKE '%test%' OR
  LOWER(title) LIKE '%placeholder%' OR
  LOWER(content) LIKE '%demo%' OR
  LOWER(content) LIKE '%sample%' OR
  LOWER(content) LIKE '%test%' OR
  LOWER(content) LIKE '%placeholder%' OR
  LOWER(sourceName) LIKE '%demo%' OR
  LOWER(sourceName) LIKE '%test%' OR
  type IN ('launch', 'product') AND (
    LOWER(title) LIKE '%demo%' OR
    LOWER(content) LIKE '%demo%'
  );

-- Identify and remove demo posts
-- Delete posts with demo-related content
DELETE FROM posts 
WHERE 
  LOWER(title) LIKE '%demo%' OR
  LOWER(title) LIKE '%sample%' OR
  LOWER(title) LIKE '%test%' OR
  LOWER(title) LIKE '%placeholder%' OR
  LOWER(content) LIKE '%lorem ipsum%' OR
  LOWER(content) LIKE '%demo%' OR
  LOWER(content) LIKE '%sample%' OR
  LOWER(content) LIKE '%test%' OR
  LOWER(content) LIKE '%placeholder%' OR
  LOWER(userName) LIKE '%demo%' OR
  LOWER(userName) LIKE '%test%' OR
  (title = '' AND LENGTH(content) < 50);

-- Identify and remove demo bookmarks
-- Delete bookmarks with demo-related content
DELETE FROM bookmarks
WHERE
  LOWER(title) LIKE '%demo%' OR
  LOWER(title) LIKE '%sample%' OR
  LOWER(title) LIKE '%test%' OR
  LOWER(title) LIKE '%placeholder%' OR
  LOWER(content) LIKE '%demo%' OR
  LOWER(content) LIKE '%sample%' OR
  LOWER(content) LIKE '%test%' OR
  LOWER(content) LIKE '%placeholder%' OR
  LOWER(sourceName) LIKE '%demo%' OR
  LOWER(sourceName) LIKE '%test%' OR
  type IN ('launch', 'product') AND (
    LOWER(title) LIKE '%demo%' OR
    LOWER(content) LIKE '%demo%'
  );

-- Show final counts
SELECT 'Posts' as table_name, COUNT(*) as final_count FROM posts
UNION ALL
SELECT 'Bookmarks' as table_name, COUNT(*) as final_count FROM bookmarks;