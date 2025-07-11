document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('searchBox');
    const articleList = document.getElementById('articleList');
    const tagList = document.getElementById('tagList');
    const dateList = document.getElementById('dateList');
    let articles = Array.from(articleList.getElementsByTagName('li'));
    let selectedTags = new Set();
    let selectedDate = null;

    // Check for tag in URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const initialTag = urlParams.get('tag');
    if (initialTag) {
        selectedTags.add(initialTag.toLowerCase());
    }

    // Make article rows clickable
    articles.forEach(article => {
        article.addEventListener('click', () => {
            const href = article.dataset.href;
            if (href) {
                window.location.href = href;
            }
        });
    });

    // Function to render articles based on current filters
    function renderArticles() {
        const searchTerm = searchBox.value.toLowerCase();

        articles.forEach(article => {
            const articleTitle = article.querySelector('a').textContent.toLowerCase();
            const articleTags = article.dataset.tags ? article.dataset.tags.toLowerCase().split(',') : [];
            const articleDate = article.querySelector('.date').textContent.trim();
            const [articleMonth, articleDay, articleYear] = articleDate.replace(',', '').split(' ');

            const matchesSearch = articleTitle.includes(searchTerm) ||
                                  articleTags.some(tag => tag.includes(searchTerm));

            const matchesTags = selectedTags.size === 0 ||
                                articleTags.some(tag => selectedTags.has(tag));

            const articleMonthYear = `${articleMonth} ${articleYear}`;
            const matchesDate = !selectedDate ||
                                (selectedDate.length === 4 && articleYear === selectedDate) || // Year only
                                (selectedDate.includes(' ') && articleMonthYear === selectedDate); // Month and Year

            if (matchesSearch && matchesTags && matchesDate) {
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
                renderDates(); // Re-render dates to update counts based on tag filter
                renderArticles(); // Re-render articles to apply tag filter
            });
            tagList.appendChild(tagSpan);
        });
    }

    // Function to render dates
    function renderDates() {
        dateList.innerHTML = ''; // Clear existing dates
        const dates = {}; // { year: { month: count } }
        const filteredArticles = articles.filter(article => {
            const articleTags = article.dataset.tags ? article.dataset.tags.toLowerCase().split(',') : [];
            return selectedTags.size === 0 || articleTags.some(tag => selectedTags.has(tag));
        });

        filteredArticles.forEach(article => {
            const dateText = article.querySelector('.date').textContent.trim();
            const [month, day, year] = dateText.replace(',', '').split(' ');
            
            if (!dates[year]) {
                dates[year] = { _count: 0 }; // Initialize year count
            }
            if (!dates[year][month]) {
                dates[year][month] = 0;
            }
            dates[year][month]++;
            dates[year]._count++; // Increment year count
        });

        Object.keys(dates).sort((a, b) => b - a).forEach(year => {
            const yearDiv = document.createElement('div');
            yearDiv.classList.add('date-year');
            yearDiv.textContent = `${year} (${dates[year]._count})`; // Add year count
            yearDiv.addEventListener('click', () => {
                if (selectedDate === year) {
                    selectedDate = null; // Deselect if already selected
                } else {
                    selectedDate = year;
                }
                renderDates(); // Re-render dates to update selection
                renderArticles(); // Re-render articles to apply date filter
            });
            if (selectedDate === year) {
                yearDiv.classList.add('selected');
            }
            dateList.appendChild(yearDiv);

            Object.keys(dates[year]).sort((a, b) => {
                const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                return monthOrder.indexOf(a) - monthOrder.indexOf(b);
            }).forEach(month => {
                if (month === '_count') return; // Skip the internal count property
                const monthSpan = document.createElement('span');
                monthSpan.classList.add('date-month');
                monthSpan.textContent = `${month} (${dates[year][month]})`;
                monthSpan.addEventListener('click', () => {
                    const newSelectedDate = `${month} ${year}`;
                    if (selectedDate === newSelectedDate) {
                        selectedDate = null; // Deselect if already selected
                    } else {
                        selectedDate = newSelectedDate;
                    }
                    renderDates(); // Re-render dates to update selection
                    renderArticles(); // Re-render articles to apply date filter
                });
                if (selectedDate === `${month} ${year}`) {
                    monthSpan.classList.add('selected');
                }
                dateList.appendChild(monthSpan);
            });
        });
    }

    // Event Listeners
    searchBox.addEventListener('input', renderArticles);

    // Initial render
    renderTags();
    renderDates();
    renderArticles();
});
