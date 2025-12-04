-- Migration: Add multi-language support to blog posts
-- Run this in Supabase SQL Editor

-- Add JSONB columns for multi-language content
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS title_i18n JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS summary_i18n JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS content_i18n JSONB DEFAULT '{}';

-- Create GIN indexes for better query performance on JSONB columns
CREATE INDEX IF NOT EXISTS idx_posts_title_i18n ON posts USING GIN (title_i18n);
CREATE INDEX IF NOT EXISTS idx_posts_summary_i18n ON posts USING GIN (summary_i18n);
CREATE INDEX IF NOT EXISTS idx_posts_content_i18n ON posts USING GIN (content_i18n);

-- Example JSONB structure:
-- title_i18n: {
--   "en": "English Title",
--   "uz": "O'zbek sarlavha",
--   "ru": "Русский заголовок",
--   "de": "Deutscher Titel"
-- }

-- Optional: Migrate existing data to new structure
-- This copies existing title/summary/content to English (en) in the i18n fields
UPDATE posts
SET 
  title_i18n = jsonb_build_object('en', title),
  summary_i18n = CASE 
    WHEN summary IS NOT NULL THEN jsonb_build_object('en', summary)
    ELSE '{}'::jsonb
  END,
  content_i18n = jsonb_build_object('en', content)
WHERE title_i18n = '{}'::jsonb;

COMMENT ON COLUMN posts.title_i18n IS 'Multi-language titles stored as JSONB with language codes as keys';
COMMENT ON COLUMN posts.summary_i18n IS 'Multi-language summaries stored as JSONB with language codes as keys';
COMMENT ON COLUMN posts.content_i18n IS 'Multi-language content stored as JSONB with language codes as keys';
