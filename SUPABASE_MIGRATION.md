# Migration from Appwrite to Supabase

This document outlines the steps taken to migrate the Insai project from Appwrite to Supabase for authentication, database, and storage services.

## Changes Made

### 1. Dependency Updates
- Removed `appwrite` dependency
- Added `@supabase/supabase-js` dependency

### 2. Environment Variables
Updated `.env` file with Supabase configuration:
```
# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database configuration
NEXT_PUBLIC_DATABASE_ID=your_database_id
NEXT_PUBLIC_POSTS_TABLE=posts
```

### 3. Service Files

#### a. Supabase Configuration (`src/lib/supabase.ts`)
Created a new Supabase client configuration file.

#### b. Authentication Service (`src/lib/auth-service.ts`)
Replaced Appwrite authentication methods with Supabase equivalents:
- `signUp` - Uses `supabase.auth.signUp`
- `signIn` - Uses `supabase.auth.signInWithPassword`
- `signOut` - Uses `supabase.auth.signOut`
- `getCurrentUser` - Uses `supabase.auth.getSession`
- `sendPasswordReset` - Uses `supabase.auth.resetPasswordForEmail`
- `resetPassword` - Uses `supabase.auth.updateUser`
- `updateProfile` - Uses `supabase.auth.updateUser`
- `validateSession` - Uses `supabase.auth.getSession`

#### c. Posts Service (`src/lib/posts-service.ts`)
Created a new service for handling posts with Supabase:
- `getPosts` - Fetches posts with pagination
- `createPost` - Creates a new post
- `updatePost` - Updates an existing post
- `deletePost` - Deletes a post

#### d. API Routes (`src/app/api/posts/route.ts`)
Updated the posts API route to use the new Supabase posts service.

### 4. Context Updates
Updated the user context (`src/contexts/user-context.tsx`) to work with the new authentication service.

## Profile Creation Flow

After a user signs up, they are redirected to a profile creation page (`/signup/profile`) where they must provide:
- Full Name
- Username (unique, 3-30 characters, letters, numbers, and underscores only)
- Bio (optional)
- Avatar (optional)

This ensures that all users have complete profiles before accessing the main application.

## Supabase Setup Requirements

1. Create a Supabase project at https://supabase.io
2. Set up authentication (email/password provider)
3. Create a `posts` table with the following columns:
   - `id` (UUID, primary key)
   - `title` (text, optional)
   - `content` (text, required)
   - `userId` (UUID, required)
   - `userName` (text, required)
   - `isThread` (boolean, optional)
   - `createdAt` (timestamp, required)
   - `updatedAt` (timestamp, required)
4. Create a `profiles` table with the following columns:
   - `id` (UUID, primary key, references auth.users)
   - `name` (text, required)
   - `username` (text, unique)
   - `avatar` (text, optional)
   - `banner` (text, optional)
   - `bio` (text, optional)
   - `twitter` (text, optional)
   - `linkedin` (text, optional)
   - `instagram` (text, optional)
   - `youtube` (text, optional)
   - `github` (text, optional)
   - `website` (text, optional)
   - `isPremium` (boolean, default true)
   - `isBusiness` (boolean, default false)
   - `createdAt` (timestamp, default NOW())
   - `updatedAt` (timestamp, default NOW())

## Environment Variables

Make sure to set the following environment variables in your `.env` file:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_DATABASE_ID=your_database_id (if using a specific database)
NEXT_PUBLIC_POSTS_TABLE=posts
```

## Testing

After setting up your Supabase project and environment variables, you should be able to:
1. Sign up and sign in users
2. Create, read, update, and delete posts
3. Reset passwords
4. Update user profiles
5. Complete profile creation after signup

## Notes

- All existing functionality should work the same way as before
- The migration maintains the same API structure for frontend components
- Error handling has been updated to work with Supabase error responses