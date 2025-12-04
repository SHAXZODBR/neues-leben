-- Create a function to increment post views/clicks
CREATE OR REPLACE FUNCTION increment_post_views(post_id TEXT)
RETURNS void AS $$
BEGIN
  UPDATE posts
  SET views = COALESCE(views, 0) + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
