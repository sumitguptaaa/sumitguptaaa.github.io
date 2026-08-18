# sumitguptaaa.github.io

A minimal Jekyll research notebook published with GitHub Pages.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

The production build is generated with:

```bash
JEKYLL_ENV=production bundle exec jekyll build --strict_front_matter
```

## Publish writing

1. Copy the closest file from `_templates/` into `_posts/`.
2. Rename it to `YYYY-MM-DD-short-title.md`.
3. Complete the front matter and write the article in Markdown.
4. Preview the site locally before committing.

Posts are published at `/writing/short-title/` and automatically appear in the yearly and tag archives.

## Publish a project

1. Copy `_templates/project-page.md` into `_projects/`.
2. Use a short lowercase filename such as `project-name.md`.
3. Add a factual description, repository URL, status, and display order.
4. Set `featured: true` only when the project should appear on the homepage.

Projects are published at `/projects/project-name/`.

## Deployment

GitHub Pages builds the `main` branch from the repository root. Merging a reviewed pull request into `main` updates the live site automatically.
