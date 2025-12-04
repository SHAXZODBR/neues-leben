# How to Add New Blog Posts (Fikrlar)

This guide explains how to add new blog posts to your website with multi-language support.

## Overview

Blog posts are stored in a Supabase database. To add a new post, you'll need to insert data into the database with content in all 4 languages.

## Database Structure

Your blog posts table (`posts`) has these important fields:

### Required Fields
- `slug`: Unique URL identifier (e.g., "new-medical-breakthrough")
- `title`: Main title (English)
- `summary`: Brief summary (English)
- `content`: Full HTML content (English)
- `published`: Set to `true` to make visible

### Multi-language Fields (JSON)
- `title_i18n`: Titles in all languages
- `summary_i18n`: Summaries in all languages
- `content_i18n`: Full content in all languages

### Optional Fields
- `image_url`: Path to cover image (e.g., "/blogImages/post-image.jpg")
- `author`: Author name
- `author_credentials`: Author's credentials (e.g., "MD, PhD, Cardiologist")
- `category`: Post category
- `specialty`: Medical specialty
- `reading_time`: Estimated reading time (e.g., "5 min read")
- `featured`: Set to `true` to feature on blog homepage
- `views`: Number of views (auto-tracked)
- `citations`: Number of citations

## Template

Use this template when adding a new blog post:

```json
{
  "slug": "your-post-slug",
  "title": "Post Title in English",
  "summary": "Brief summary in English",
  "content": "<p>Full HTML content in English</p>",
  "title_i18n": {
    "en": "Post Title in English",
    "uz": "Maqola sarlavhasi o'zbekcha",
    "ru": "Заголовок статьи на русском",
    "de": "Artikeltitel auf Deutsch"
  },
  "summary_i18n": {
    "en": "Brief summary in English",
    "uz": "Qisqacha mazmun o'zbekcha",
    "ru": "Краткое содержание на русском",
    "de": "Kurze Zusammenfassung auf Deutsch"
  },
  "content_i18n": {
    "en": "<p>Full HTML content in English</p>",
    "uz": "<p>To'liq HTML kontent o'zbekcha</p>",
    "ru": "<p>Полное HTML содержание на русском</p>",
    "de": "<p>Vollständiger HTML-Inhalt auf Deutsch</p>"
  },
  "image_url": "/blogImages/your-image.jpg",
  "author": "Dr. John Doe",
  "author_credentials": "MD, PhD, Cardiologist",
  "category": "Cardiology",
  "specialty": "Cardiovascular Medicine",
  "reading_time": "5 min read",
  "featured": false,
  "published": true
}
```

## Step-by-Step Instructions

### 1. Prepare Your Content

1. Write your blog post in all 4 languages (EN, UZ, RU, DE)
2. Format content as HTML (use `<p>`, `<h2>`, `<ul>`, etc.)
3. Prepare a cover image (recommended: 1200x630 pixels)

### 2. Add Cover Image

1. Place your image in `/public/blogImages/` folder
2. Name it descriptively (e.g., `cardiology-research-2024.jpg`)
3. Supported formats: JPG, PNG, WebP

### 3. Insert into Database

You can insert the post using:

**Option A: Supabase Dashboard**
1. Go to your Supabase project dashboard
2. Navigate to Table Editor → `posts` table
3. Click "Insert row"
4. Fill in all fields using the template above
5. Click "Save"

**Option B: SQL Query**
```sql
INSERT INTO posts (
  slug, title, summary, content,
  title_i18n, summary_i18n, content_i18n,
  image_url, author, author_credentials,
  category, specialty, reading_time,
  featured, published
) VALUES (
  'your-post-slug',
  'Post Title in English',
  'Brief summary in English',
  '<p>Full HTML content in English</p>',
  '{"en": "Title EN", "uz": "Title UZ", "ru": "Title RU", "de": "Title DE"}',
  '{"en": "Summary EN", "uz": "Summary UZ", "ru": "Summary RU", "de": "Summary DE"}',
  '{"en": "<p>Content EN</p>", "uz": "<p>Content UZ</p>", "ru": "<p>Content RU</p>", "de": "<p>Content DE</p>"}',
  '/blogImages/your-image.jpg',
  'Dr. John Doe',
  'MD, PhD, Cardiologist',
  'Cardiology',
  'Cardiovascular Medicine',
  '5 min read',
  false,
  true
);
```

### 4. Verify

1. Refresh your blog page
2. Check that the post appears
3. Test all 4 language versions
4. Verify images load correctly

## Categories

Common medical categories:
- Cardiology / Kardiologiya / Кардиология / Kardiologie
- Pulmonology / Pulmonologiya / Пульмонология / Pneumologie
- Neurology / Nevrologiya / Неврология / Neurologie
- Endocrinology / Endokrinologiya / Эндокринология / Endokrinologie
- Gastroenterology / Gastroenterologiya / Гастроэнтерология / Gastroenterologie
- General Medicine / Umumiy tibbiyot / Общая медицина / Allgemeinmedizin

## HTML Formatting Tips

Use these HTML tags for rich content:

```html
<!-- Headings -->
<h2>Section Title</h2>
<h3>Subsection Title</h3>

<!-- Paragraphs -->
<p>Regular paragraph text.</p>

<!-- Lists -->
<ul>
  <li>Bullet point 1</li>
  <li>Bullet point 2</li>
</ul>

<ol>
  <li>Numbered item 1</li>
  <li>Numbered item 2</li>
</ol>

<!-- Emphasis -->
<strong>Bold text</strong>
<em>Italic text</em>

<!-- Links -->
<a href="https://example.com">Link text</a>

<!-- Images in content -->
<img src="/blogImages/inline-image.jpg" alt="Description" />
```

## Tips

- Keep slugs short and descriptive (use hyphens, not spaces)
- Write engaging summaries (150-200 characters)
- Use proper HTML formatting for readability
- Add author credentials for credibility
- Set `featured: true` for important posts
- Test all language versions before publishing
- Use high-quality images (1200x630 for covers)

## Need Help?

If you encounter issues:
1. Check JSON syntax in i18n fields
2. Verify image paths are correct
3. Ensure `published` is set to `true`
4. Check Supabase connection
5. Review browser console for errors
