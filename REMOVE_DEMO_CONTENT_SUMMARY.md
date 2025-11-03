# Remove Demo Content - Summary

## What We've Created

We've developed a comprehensive solution to remove demo posts, launches, and products from your database. The solution includes:

### 1. Node.js Scripts
- `clean-database.js` - Main cleanup tool that identifies and removes demo content
- `create-demo-content.js` - Tool to create demo content for testing
- `remove-demo-content-simple.js` - Simplified version of the cleanup tool
- `refresh-schema.js` - Tool to refresh Supabase schema cache
- `test-database.js` - Diagnostic tool to verify database connectivity

### 2. SQL Scripts
- `add-demo-content.sql` - SQL script to add demo content directly in Supabase
- `remove-demo-content.sql` - SQL script to remove demo content directly in Supabase

### 3. Documentation
- `DATABASE_CLEANUP.md` - Comprehensive guide for using all tools
- `REMOVE_DEMO_CONTENT_SUMMARY.md` - This summary document

## How to Use

### Recommended Approach: SQL Scripts

Due to potential RLS policy restrictions and schema caching issues, we recommend using the SQL scripts:

1. **To add demo content for testing:**
   - Open your Supabase dashboard
   - Go to the SQL editor
   - Copy and paste the contents of `add-demo-content.sql`
   - Run the script

2. **To remove demo content:**
   - Open your Supabase dashboard
   - Go to the SQL editor
   - Copy and paste the contents of `remove-demo-content.sql`
   - Run the script

### Alternative Approach: Node.js Scripts

If you prefer to use the Node.js scripts:

1. Ensure your `.env` file is properly configured with Supabase credentials
2. Run `npm run clean-database` to remove demo content
3. Run `npm run create-demo-content` to add demo content for testing

## Key Features

### Content Detection
The tools identify demo content using multiple criteria:
- Keyword matching ("demo", "sample", "test", etc.)
- Pattern matching ("Lorem ipsum", etc.)
- Content quality analysis (empty or minimal content)
- Metadata analysis (demo usernames)

### Safety Features
- Preview of content to be deleted
- Database statistics before and after operations
- Error handling and reporting
- Non-destructive testing capabilities

### Supported Content Types
- Posts in the `posts` table
- Bookmarks in the `bookmarks` table (news, products, launches)

## Troubleshooting Common Issues

### Schema Cache Issues
If you encounter "Could not find column in schema cache" errors:
- Use the SQL scripts instead of Node.js scripts
- Run `npm run refresh-schema` to attempt cache refresh

### RLS Policy Violations
If you see "row-level security policy" errors:
- Use the SQL scripts in the Supabase dashboard
- The dashboard runs with administrative privileges

### Column Name Issues
The database uses lowercase column names:
- Use `userid` instead of `userId`
- Use `username` instead of `userName`
- Use `isthread` instead of `isThread`

## Customization

You can customize the detection criteria by modifying:
- The `DEMO_KEYWORDS` array in the JavaScript files
- The WHERE clauses in the SQL scripts
- The pattern matching functions

## Next Steps

1. **Test the solution** by adding demo content and then removing it
2. **Customize the detection criteria** based on your specific needs
3. **Schedule regular cleanup** if needed
4. **Monitor for edge cases** that might not be caught by automated detection

## Support

If you encounter issues:
1. Check the documentation in `DATABASE_CLEANUP.md`
2. Verify your database schema matches the expected structure
3. Contact Supabase support for persistent schema issues
4. Review the database policies and permissions