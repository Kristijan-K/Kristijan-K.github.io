document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('searchBox');
    const articleList = document.getElementById('articleList');
    const tagList = document.getElementById('tagList');
    let articles = Array.from(articleList.getElementsByTagName('li'));
    let selectedTags = new Set();

    // Check for tag in URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const initialTag = urlParams.get('tag');
    if (initialTag) {
        selectedTags.add(initialTag.toLowerCase());
    }

    // Function to render articles based on current filters
    function renderArticles() {
        const searchTerm = searchBox.value.toLowerCase();

        articles.forEach(article => {
            const articleTitle = article.querySelector('a').textContent.toLowerCase();
            const articleTags = article.dataset.tags ? article.dataset.tags.toLowerCase().split(',') : [];

            const matchesSearch = articleTitle.includes(searchTerm) ||
                                  articleTags.some(tag => tag.includes(searchTerm));

            const matchesTags = selectedTags.size === 0 ||
                                articleTags.some(tag => selectedTags.has(tag));

            if (matchesSearch && matchesTags) {
                article.style.display = '';
            } else {
                article.style.display = 'none';
            }
        });
    }

    // Function to render unique tags
    function renderTags() {
        tagList.innerHTML = ''; // Clear existing tags
        const allTags = new Set();
        articles.forEach(article => {
            const articleTags = article.dataset.tags ? article.dataset.tags.toLowerCase().split(',') : [];
            articleTags.forEach(tag => allTags.add(tag));
        });

        Array.from(allTags).sort().forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.classList.add('tag');
            if (selectedTags.has(tag)) {
                tagSpan.classList.add('selected');
            }
            tagSpan.textContent = tag;
            tagSpan.addEventListener('click', () => {
                if (selectedTags.has(tag)) {
                    selectedTags.delete(tag);
                } else {
                    selectedTags.add(tag);
                }
                renderTags(); // Re-render tags to update selection
                renderArticles(); // Re-render articles to apply tag filter
            });
            tagList.appendChild(tagSpan);
        });
    }

    // Event Listeners
    searchBox.addEventListener('input', renderArticles);

    // Initial render
    renderTags();
    renderArticles();
});
