# Database Cleanup Tools

This project includes tools to help you manage demo content in your database.

## Overview

The database cleanup system provides multiple approaches to handle demo content:

1. **Node.js Scripts** - For programmatic control
2. **SQL Scripts** - For direct database manipulation
3. **Manual Process** - For fine-grained control

## Node.js Scripts

### 1. Clean Database (`npm run clean-database`)

Removes demo posts, launches, and products from the database based on content patterns.

```bash
npm run clean-database
```

This script will:
- Identify posts with demo content based on keywords and patterns
- Identify bookmarks with demo content (including launches and products)
- Show what content will be removed
- Remove the identified demo content

### 2. Create Demo Content (`npm run create-demo-content`)

Creates sample demo content for testing purposes.

```bash
npm run create-demo-content
```

This script will:
- Create sample posts with demo content
- Create sample bookmarks with demo content (including products and launches)

### 3. Remove Demo Content (`npm run remove-demo-content`)

Simple script to remove demo content (legacy version).

```bash
npm run remove-demo-content
```

### 4. Refresh Schema (`npm run refresh-schema`)

Attempts to refresh the Supabase schema cache.

```bash
npm run refresh-schema
```

## SQL Scripts

If you're having issues with the Node.js scripts, you can use the SQL scripts directly in the Supabase SQL editor:

### 1. Add Demo Content (`add-demo-content.sql`)

Adds sample demo content to your database.

### 2. Remove Demo Content (`remove-demo-content.sql`)

Identifies and removes demo content from your database.

## How It Works

### Content Identification

The cleanup tools identify demo content using:

1. **Keyword matching**: Content containing words like "demo", "sample", "test", "placeholder", etc.
2. **Pattern matching**: Content matching common demo patterns like "Lorem ipsum" text
3. **Metadata analysis**: Checking usernames and other metadata for demo indicators
4. **Content quality**: Identifying posts with minimal or no meaningful content

### Supported Content Types

1. **Posts**: Regular posts in the posts table
2. **Bookmarks**: Saved content in the bookmarks table, including:
   - News articles
   - Product announcements
   - Launch announcements
   - Other bookmarked content

## Customization

You can customize the demo content identification by modifying the keyword lists in the scripts:

- `DEMO_KEYWORDS` array in `clean-database.js`
- Pattern matching rules in the `matchesDemoPattern()` function
- SQL WHERE clauses in the SQL scripts

## Safety

The tools include safety features:

1. **Preview**: Shows what content will be removed before deletion
2. **Statistics**: Displays database stats before and after cleanup
3. **Error handling**: Gracefully handles errors and reports them
4. **Non-destructive testing**: You can create demo content to test the cleanup process

## Usage Examples

### Clean your database:
```bash
npm run clean-database
```

### Create demo content for testing:
```bash
npm run create-demo-content
```

### Verify the cleanup worked:
```bash
npm run clean-database
```
(This should show 0 demo items found after cleanup)

## Troubleshooting

### "Supabase URL and Anon Key must be set" Error

Make sure your `.env` file contains the required Supabase configuration:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### "Module type" Warning

This is a harmless warning that occurs because we're using ES modules. You can eliminate it by ensuring the "type": "module" line is present in your package.json file.

### Schema Cache Issues

If you encounter errors like "Could not find the 'isThread' column of 'posts' in the schema cache", try using the SQL scripts instead of the Node.js scripts. These issues are related to Supabase's schema caching and are more reliably handled through direct SQL.

### RLS Policy Violations

If you see "new row violates row-level security policy" errors, this means the database has security policies that prevent unauthorized data insertion. Use the SQL scripts in the Supabase dashboard, which run with administrative privileges.

### Column Name Issues

PostgreSQL column names are case-sensitive. The database uses lowercase column names (userid, username) rather than camelCase (userId, userName).

### UUID Validation Errors

The userId fields expect valid UUID format. Use proper UUIDs like "00000000-0000-0000-0000-000000000001" rather than arbitrary strings.

## Using SQL Scripts

1. Open your Supabase project dashboard
2. Go to the SQL editor
3. Copy and paste the contents of `add-demo-content.sql` or `remove-demo-content.sql`
4. Run the script

## Manual Process

If all else fails, you can manually identify and remove demo content:

1. Connect to your database using a database client
2. Run SELECT queries to identify demo content:
   ```sql
   SELECT * FROM posts WHERE LOWER(title) LIKE '%demo%' OR LOWER(content) LIKE '%lorem ipsum%';
   SELECT * FROM bookmarks WHERE LOWER(title) LIKE '%demo%' OR type IN ('launch', 'product');
   ```
3. Delete identified demo content:
   ```sql
   DELETE FROM posts WHERE id IN ('uuid1', 'uuid2', ...);
   DELETE FROM bookmarks WHERE id IN ('uuid1', 'uuid2', ...);
   ```

## Best Practices

1. **Always backup your database** before running cleanup operations
2. **Test on a development database** first
3. **Review content to be deleted** before confirming deletion
4. **Use the preview features** to see what will be affected
5. **Monitor for errors** and address them promptly

## Limitations

1. The Node.js scripts require proper authentication and may be restricted by RLS policies
2. Column name issues may occur due to case sensitivity
3. Schema caching issues may require manual refresh
4. Some edge cases may not be caught by the automated detection

## Support

If you continue to have issues:

1. Check the Supabase documentation for your specific error
2. Verify your database schema matches the expected structure
3. Contact Supabase support for persistent schema issues
4. Review the database policies and permissions