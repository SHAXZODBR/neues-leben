# Click Tracking Setup

## Database Function

A SQL function has been created to track post clicks. You need to run this in your Supabase SQL editor:

**File:** `supabase/increment_post_views.sql`

## How to Apply

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/increment_post_views.sql`
4. Run the SQL query
5. The function will be created and ready to use

## How It Works

- When a user clicks on any blog post link, the `trackPostClick()` function is called
- This increments the `views` column in the database (repurposed as "clicks")
- The click count is displayed on each post card with an eye icon
- Only posts with clicks > 0 will show the counter

## Display Locations

- **Hero Post**: Shows clicks in the metadata section
- **Grid Posts**: Shows clicks next to the date at the bottom of each card
