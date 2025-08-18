# 🟦 Next.js + Contentlayer Multilingual Portfolio Shell

## ⚙️ Tech

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (minimal classes only, no custom design)
- **Content**: Markdown (`.md`, `.sv.md`, `.fa.md`) in `/src/content`
- **Contentlayer**: for parsing blog + portfolio with translations
- **MDX**: enabled for embedding React in markdown
- **i18n**:

  - Languages: English (`en`, default), Swedish (`sv`), Farsi (`fa`)
  - No language prefix in URLs → `/portfolio/project` is the same for all languages
  - Language switcher in header, fallback to English if translation missing

---

## 📂 Structure

```
/app
  /layout.tsx
  /page.tsx                          # Home
  /about/page.tsx
  /contact/page.tsx
  /blog/page.tsx
  /blog/[slug]/page.tsx
  /portfolio/page.tsx
  /portfolio/[slug]/page.tsx
  /portfolio/tags/[slug]/page.tsx
  /portfolio/category/[slug]/page.tsx
/components
  /MDXComponents.tsx
  /LanguageSwitcher.tsx
/src/content
  /blog/
    post-1.md
    post-1.sv.md
    post-1.fa.md
  /portfolio/
    /project-name/
      project-name.md        # English
      project-name.sv.md     # Swedish
      project-name.fa.md     # Farsi
      logo.png
      cover.jpg
      image1.jpg
      background.jpg
/lib
  /contentlayer.config.ts
  /i18n.ts
/styles
  globals.css
```

---

## 📝 Content Models

### Blog

- `title`: string
- `date`: date
- `summary`: string
- `tags`: list of strings
- `cover`: string
- `lang`: computed (en | sv | fa) from file extension
- `slug`: computed from filename (no lang suffix)

### Portfolio

- `title`: string
- `date`: date
- `status`: string
- `permalink`: string
- `author`: string
- `type`: string
- `id`: number
- `agency`: string
- `category`: list of strings
- `tag`: list of strings
- `case_link_url`: string
- `client`: string
- `tagline`: string
- `background_image`: string
- `logo`: string
- `images`: list of strings
- `port_date`: list of strings
- `lang`: computed (en | sv | fa) from file extension
- `slug`: computed from parent folder name

---

## 📑 Pages

### Home `/`

- Minimal list of latest portfolio projects + blog posts in current language

### Blog

- `/blog` → list all posts (title, date, link) for current language
- `/blog/[slug]` → render single post in current language (fallback English)

### Portfolio

- `/portfolio` → list all projects (title, category, tags) in current language
- `/portfolio/[slug]` → render single project in current language (fallback English)
- `/portfolio/tags/[slug]` → show all projects that include that tag in current language
- `/portfolio/category/[slug]` → show all projects in that category in current language

### Static pages

- `/about`, `/contact`, etc. → minimal placeholders with multilingual content support

---

## 🎨 Styling

- Only minimal Tailwind classes: `prose`, `p-4`, `m-2`, `flex`, `grid`
- Layout = simple `<header>`, `<main>`, `<footer>`
- Header includes nav links + `LanguageSwitcher` (`EN | SV | FA`)

---

## ⚡ Features

- All content stored in `/src/content`
- Multilingual handled by file suffix:

  - `.md` = English
  - `.sv.md` = Swedish
  - `.fa.md` = Farsi

- Static generation for all pages, tags, and categories
- Language switcher updates content without changing URL
- Fallback to English if translation is missing
- Metadata (`export const metadata`) per page

---

## ✅ Acceptance

- Project builds (`next build`) and runs (`next dev`)
- Blog + portfolio rendered from markdown
- Multilingual works with same URLs, language switcher available
- Portfolio tag and category routes filter correctly per language
- Minimal shell with Tailwind utilities only

---

**language fallback logic**
spec (how `/portfolio/[slug]` should resolve if `.sv.md` is missing → load `.md`)?
