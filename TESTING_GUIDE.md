# Testing Guide for Twitter-Inspired Features

## Overview
This guide will help you test the new Twitter-inspired post and thread creation features.

## Prerequisites
- The development server should be running on port 3001
- You should have access to the Access application

## Test Cases

### 1. Single Post Creation
1. Navigate to http://localhost:3001
2. Click on the "Create" button in the sidebar
3. Select "Post"
4. Write a post with or without a title
5. Click "Post"
6. Verify the post appears on the home page with the new Twitter-inspired card design

### 2. Thread Creation
1. Navigate to http://localhost:3001
2. Click on the "Create" button in the sidebar
3. Select "Post"
4. Write your first post
5. Click the "+" button below the post
6. Write your second post
7. Click "Post" to publish the entire thread
8. Verify both posts appear on the home page with thread indicators

### 3. Character Counter
1. Create a new post
2. Type content and observe the character counter
3. Verify it changes color when approaching the 280-character limit
4. Verify it prevents posting when exceeding the limit

### 4. Media Embedding
1. Create a new post
2. Click the image icon and add an image URL
3. Click the video icon and add a YouTube or Vimeo URL
4. Click "Preview" to verify media displays correctly
5. Post and verify media displays correctly on the home page

### 5. Engagement Features
1. Navigate to the home page
2. Find a post and click the heart icon to like it
3. Verify the like count increases
4. Click the retweet icon
5. Verify the retweet count increases
6. Verify the icons change color to indicate engagement

## Expected Results
- Posts should display with a clean, Twitter-inspired design
- Threads should show visual indicators connecting posts
- Character counter should function correctly
- Media should embed properly
- Engagement features should work as expected

## Troubleshooting
- If the server is not running, start it with `npm run dev`
- If you encounter errors, check the browser console for details
- If posts don't appear, check the API response in the network tab