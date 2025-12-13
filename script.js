// Use localhost for development (file:// or localhost), relative URL for production
const API_URL = (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? "http://localhost:3000/api/news" 
    : "/api/news";

const cardsContainer = document.getElementById("cards-container");
const newsCardTemplate = document.getElementById("template-news-card");
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

window.addEventListener("load", () => fetchNews());

function reload() {
    window.location.reload();
}

async function fetchNews(query = null, category = null) {
    try {
        let url = API_URL;
        const params = new URLSearchParams();
        
        if (category) {
            params.append('category', category);
        }
        
        if (query) {
            params.append('search', query);
        }
        
        if (params.toString()) {
            url += '?' + params.toString();
        }

        const res = await fetch(url);
        const data = await res.json();

        if (data.status === 'ok') {
            bindData(data.articles);
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        cardsContainer.innerHTML = '<p class="error-message">Failed to load news. Make sure the API server is running on port 3000.</p>';
    }
}

function bindData(articles) {
    cardsContainer.innerHTML = "";

    if (!articles || articles.length === 0) {
        cardsContainer.innerHTML = '<p class="no-news">No news articles found.</p>';
        return;
    }

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

function onNavItemClick(category) {
    fetchNews(null, category);
    
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    const clickedItem = document.getElementById(category);
    if (clickedItem) {
        clickedItem.classList.add('active');
    }
}

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
});

searchText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = searchText.value;
        if (!query) return;
        fetchNews(query);
        
        // Remove active class from all nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
    }
});
