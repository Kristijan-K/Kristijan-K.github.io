# kkosu: git log --oneline

This repository contains the code for "My 90s Tech Journal" website.

## Example Article Structure

To add a new article, create a new HTML file in the `/articles` directory. The file should follow this structure to ensure it is styled correctly and that the navigation links work properly.

Here is the full code for a sample article:

```html
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Understanding TCP/IP</title>
	<link rel="stylesheet" href="../style.css">
</head>

<body>
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
			<span class="date">July 8, 2025</span>
			<span class="read-time">5 min read</span>
			<span class="tags"><span class="tag-item">networking</span> <span class="tag-item">tcpip</span></span>
		</div>
		<p>This is a placeholder for the article content. Replace this with your actual article.</p>
		<a href="../index.html">Back to main</a>
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

<body>
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
			<span class="date">July 8, 2025</span>
			<span class="read-time">5 min read</span>
			<span class="tags"><span class="tag-item">networking</span> <span class="tag-item">tcpip</span></span>
		</div>
		<p>This is a placeholder for the article content. Replace this with your actual article.</p>
		<a href="../index.html">Back to main</a>
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

To make a new article appear on the main page (`index.html`) and be searchable/filterable:

1.  **Create the Article HTML File**: Follow the "Example Article Page Structure" above to create your article's HTML file (e.g., `articles/my-new-article.html`).
2.  **Add Entry to `index.html`**:
    *   Open `index.html`.
    *   Locate the `<ul id="articleList">` section.
    *   Add a new `<li>` element for your article, following this structure:

    ```html
    <li data-tags="your-tag-1,your-tag-2">
        <a href="articles/your-article-file.html">Your Article Title Here</a>
        <div class="metadata">
            <span class="date">Month Day, Year</span>
            <span class="read-time">X min read</span>
            <span class="tags">#your-tag-1 #your-tag-2</span>
        </div>
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

## Important CSS Classes (from `index.html` and `search.js` context)

While `style.css` defines the visual appearance, here are some important classes and IDs used in `index.html` and manipulated by `search.js` that are critical for the layout and functionality:

*   `.container`: Main wrapper for the entire page content.
*   `header`: Contains the site navigation.
*   `nav`: Navigation links.
*   `.content-wrapper`: Wraps the sidebar and main content area.
*   `.sidebar`: Container for the tag list.
*   `#tagList`: The `div` where tags are dynamically loaded by `search.js`.
*   `.tag`: Applied to individual tag elements in the sidebar.
*   `.tag.selected`: Applied to a tag when it's actively selected for filtering.
*   `.tag-link`: Applied to tag links generated by `populateTagList` function in `search.js`.
*   `.main-content`: Main area for the article list and search box.
*   `#searchBox`: The input field for searching articles.
*   `#articleList`: The `ul` element containing all article `<li>` entries.
*   `.metadata`: Container for article date, read time, and tags.
*   `.date`: Span for the article publication date.
*   `.read-time`: Span for the estimated reading time.
*   `.tags`: Span for displaying article tags (e.g., `#networking #tcpip`).

## Search and Tag Filtering Functionality

*   **Search on Main Page**: The search functionality on the main page (`index.html`) works by filtering articles based on the text entered in the `#searchBox`. It searches both the article title (from the `<a>` tag) and the `data-tags` attribute of each `<li>` element.
*   **Tag Links from Article to Main**: When you click on a tag in the sidebar on `index.html`, or if an article links back to `index.html` with a `?tag=your-tag` query parameter (e.g., `index.html?tag=networking`), the `search.js` script will automatically filter the articles on the main page to show only those associated with that specific tag.
*   **Tag Filtering on Main Page**:
    *   The `search.js` script dynamically generates the tag list in the sidebar from the `data-tags` attributes of all articles.
    *   Clicking a tag in the sidebar toggles its selection. Multiple tags can be selected to narrow down the results (articles must match *any* of the selected tags).
    *   The `renderArticles()` function in `search.js` applies both the search box filter and the selected tag filters to display relevant articles.
