# Reusable Components

This directory contains reusable HTML components that are loaded dynamically across all pages.

## Available Components

### header.html
Navigation header with brand logo and menu links.

**Used on**: All pages
**Loaded by**: `scripts/enhancements.js`
**Placeholder**: `<div id="header-placeholder"></div>`

**To modify navigation**:
1. Edit `components/header.html`
2. Changes automatically appear on all pages
3. No need to update individual HTML files

### footer.html
Site footer with copyright information.

**Used on**: All pages
**Loaded by**: `scripts/enhancements.js`
**Placeholder**: `<div id="footer-placeholder"></div>`

## How Components Are Loaded

1. Each page includes `<div id="header-placeholder"></div>` and `<div id="footer-placeholder"></div>`
2. The `scripts/enhancements.js` file runs on page load
3. Components are fetched and injected into the placeholders
4. Navigation links are automatically adjusted based on page location
5. Active page is automatically highlighted

## Path Resolution

The loading script automatically handles path differences:
- **Root pages** (index.html): Loads from `/components/`
- **Subdirectory pages** (html/*.html): Loads from `../components/`

Navigation links in the header use absolute paths (`/index.html`, `/html/projects.html`) which are converted to relative paths for subdirectory pages.

## Benefits

✅ **Single Source of Truth** - Update navigation once, changes everywhere
✅ **Consistency** - Guaranteed same header/footer on all pages
✅ **Maintainability** - Easy to update and manage
✅ **Performance** - Browser caches components after first load
✅ **Scalability** - Add new pages without duplicating navigation code

## Adding New Pages

1. Create your new page HTML file
2. Add the placeholder divs:
   ```html
   <div id="header-placeholder"></div>
   <!-- Your page content -->
   <div id="footer-placeholder"></div>
   ```
3. Include the enhancement script:
   ```html
   <script src="../scripts/enhancements.js" defer></script>
   ```
4. Add your page link to `components/header.html`

Done! Your new page will automatically have the same navigation as all other pages.

## Troubleshooting

**Components not loading?**
- Check browser console for errors
- Verify `scripts/enhancements.js` is included with `defer` attribute
- Ensure placeholder divs have correct IDs
- Check that paths to components are correct

**Navigation links broken?**
- Verify links use correct format with data attributes
- Check path resolution logic in `enhancements.js`
- Test both root and subdirectory pages

**Active page not highlighting?**
- Ensure links have `data-nav-link` attribute
- Check path normalization in `setActiveNavLink()` function
