# kkosu: git log --oneline

Non AI generated reflections on various tech related topics. 

## Example Article Page Structure

To create a new article page, create a new HTML file in the `/articles` directory. The file should follow this structure to ensure it is styled correctly and that the navigation links work properly.

Here is the full code for a sample article page:

```html
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Understanding TCP/IP</title>
	<link rel="stylesheet" href="../style.css">
</head>

<body class="article-page">
	<div class="container">
		<header>
			<nav>
				<a href="../index.html">Articles</a>
				<a href="../about.html">About</a>
				<a href="../contact.html">Contact</a>
			</nav>
		</header>
		<h1>Understanding TCP/IP</h1>
		<div class="metadata">
			<span class="date">July 8, 2025</span>, <span class="read-time">5 min read</span>, <span class="tags"><span class="tag-item">networking</span> <span class="tag-item">tcpip</span></span>
		</div>
		<p>This is a placeholder for the article content. Replace this with your actual article.</p>
	</div>
</body>

<script>
    document.querySelectorAll('.tag-item').forEach(tagItem => {
        tagItem.addEventListener('click', function() {
            const tag = this.textContent.trim();
            window.location.href = `../index.html?tag=${tag}`;
        });
    });
</script>

</html>
```

## How to Add a New Article to the Main Page

To make a new article appear on the main page (`index.html`) and be searchable/filterable, add a new `<li>` element to the `<ul id="articleList">` section. The entire list item is clickable. Here's the structure:

    ```html
    <li data-tags="your-tag-1,your-tag-2" data-href="articles/your-article-file.html">
    <span class="date">Month Day Year</span>, <span class="read-time">X min read</span>, <a href="articles/your-article-file.html">Your Article Title Here</a>
</li>
    ```
    *   **`data-tags` Attribute**: This is crucial for search and tag filtering. Add a `data-tags` attribute to the `<li>` element. Its value should be a comma-separated list of relevant tags (e.g., `data-tags="programming,javascript,webdev"`).
    *   **Article Link**: Ensure the `href` in the `<a>` tag points to your new article's HTML file (e.g., `articles/my-new-article.html`).
    *   **Metadata**: Update the `date`, `read-time`, and `#tags` within the `<div class="metadata">` to reflect your article's details.

## How to Add a New Tag

New tags are automatically recognized by the system. To add a new tag:

1.  Simply include the new tag in the `data-tags` attribute of any article's `<li>` element in `index.html`.
2.  Ensure the tag is also included in the `#tags` span within the article's metadata for display.

The `search.js` script will automatically detect and display new unique tags in the "Tags" sidebar.


## Search and Tag Filtering Functionality

*   **Search on Main Page**: The search functionality on the main page (`index.html`) works by filtering articles based on the text entered in the `#searchBox`. It searches both the article title (from the `<a>` tag) and the `data-tags` attribute of each `<li>` element.
*   **Tag Links from Article to Main**: When you click on a tag in the sidebar on `index.html`, or if an article links back to `index.html` with a `?tag=your-tag` query parameter (e.g., `index.html?tag=networking`), the `search.js` script will automatically filter the articles on the main page to show only those associated with that specific tag.
*   **Tag Filtering on Main Page**:
    *   The `search.js` script dynamically generates the tag list in the sidebar from the `data-tags` attributes of all articles.
    *   Clicking a tag in the sidebar toggles its selection. Multiple tags can be selected to narrow down the results (articles must match *any* of the selected tags).
    *   The `renderArticles()` function in `search.js` applies both the search box filter and the selected tag filters to display relevant articles.

## Date Filtering Functionality

*   The `search.js` script dynamically generates the date list in the sidebar from the dates of all articles.
*   **Year Filtering**: Clicking a year in the sidebar will filter articles to show only those published in that specific year.
*   **Month Filtering**: Clicking a month (e.g., "July (2)") will filter articles to show only those published in that specific month and year.
*   Clicking a selected year or month again will deselect it and remove the date filter.

## SEO Management

To ensure your articles are discoverable by search engines, you need to update the `sitemap.xml` and `robots.txt` files.

### Sitemap (`sitemap.xml`)

For each new article you publish, you must add a new `<url>` entry to the `sitemap.xml` file. This helps search engines like Google understand your site structure and discover new content more efficiently.

**Example Entry:**

If you create a new article at `articles/my-cool-article.html`, you would add the following block to `sitemap.xml` inside the `<urlset>` tag:

```xml
<url>
  <loc>https://your-website-url.com/articles/my-cool-article.html</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

**Instructions:**

1.  Open `sitemap.xml`.
2.  Copy an existing `<url>` block.
3.  Update the `<loc>` tag to the full URL of your new article.
4.  Update the `<lastmod>` tag to the date you published or last modified the article (in `YYYY-MM-DD` format).

### Robots (`robots.txt`)

The `robots.txt` file tells search engine crawlers which pages or files the crawler can or can't request from your site.

The default configuration should allow crawlers to access all articles. Ensure that you do not have any `Disallow` rules that would block access to the `/articles/` directory.

**Good Configuration (allows everything):**
```
User-agent: *
Allow: /
```

**Bad Configuration (blocks articles):**
```
User-agent: *
Disallow: /articles/
```

Make sure your `robots.txt` does not block access to your articles.
