// Vercel Serverless Function (moved under client/ for Vercel root)
const demoNews = {
    articles: [
        {
            title: "India Wins Historic Cricket Match Against Australia",
            description: "In a thrilling encounter at the Melbourne Cricket Ground, India secured a remarkable victory against Australia with a last-ball six.",
            url: "https://example.com/cricket-news-1",
            urlToImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400",
            publishedAt: "2025-12-12T10:30:00Z",
            source: { name: "Sports Today" },
            category: "ipl"
        },
        {
            title: "IPL 2025 Auction Sets New Records",
            description: "The IPL auction witnessed unprecedented bidding wars as teams scrambled to secure top talent for the upcoming season.",
            url: "https://example.com/cricket-news-2",
            urlToImage: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400",
            publishedAt: "2025-12-11T14:20:00Z",
            source: { name: "Cricket World" },
            category: "ipl"
        },
        {
            title: "Stock Markets Reach All-Time High",
            description: "Global stock markets surged to record highs today as investors responded positively to economic indicators showing strong growth.",
            url: "https://example.com/finance-news-1",
            urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
            publishedAt: "2025-12-12T08:15:00Z",
            source: { name: "Financial Times" },
            category: "finance"
        },
        {
            title: "Federal Reserve Announces New Interest Rate Policy",
            description: "The Federal Reserve has announced a significant change in its interest rate policy, impacting borrowing costs for consumers and businesses.",
            url: "https://example.com/finance-news-2",
            urlToImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
            publishedAt: "2025-12-11T16:45:00Z",
            source: { name: "Economic Daily" },
            category: "finance"
        },
        {
            title: "Cryptocurrency Market Shows Strong Recovery",
            description: "Bitcoin and other major cryptocurrencies have shown remarkable recovery, with Bitcoin crossing the $50,000 mark after months of volatility.",
            url: "https://example.com/finance-news-3",
            urlToImage: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400",
            publishedAt: "2025-12-10T12:30:00Z",
            source: { name: "Crypto Insider" },
            category: "finance"
        },
        {
            title: "New Climate Policy Announced by Government",
            description: "The government has unveiled an ambitious new climate policy aimed at achieving net-zero emissions by 2050.",
            url: "https://example.com/politics-news-1",
            urlToImage: "https://images.unsplash.com/photo-1473172707857-f9e276582ab6?w=400",
            publishedAt: "2025-12-12T09:00:00Z",
            source: { name: "Political News Network" },
            category: "politics"
        },
        {
            title: "Election Results Show Unexpected Turnout",
            description: "Recent elections have shown an unprecedented voter turnout, with younger demographics participating in record numbers.",
            url: "https://example.com/politics-news-2",
            urlToImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400",
            publishedAt: "2025-12-11T18:30:00Z",
            source: { name: "Democracy Today" },
            category: "politics"
        },
        {
            title: "International Summit Addresses Global Security",
            description: "World leaders gathered at the international summit to discuss pressing global security concerns and forge new alliances.",
            url: "https://example.com/politics-news-3",
            urlToImage: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400",
            publishedAt: "2025-12-10T15:20:00Z",
            source: { name: "World Affairs" },
            category: "politics"
        },
        {
            title: "Breakthrough in AI Technology Announced",
            description: "Scientists have achieved a major breakthrough in artificial intelligence, developing a system that can understand complex human emotions.",
            url: "https://example.com/tech-news-1",
            urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
            publishedAt: "2025-12-12T11:15:00Z",
            source: { name: "Tech Innovations" },
            category: "technology"
        },
        {
            title: "Space Exploration: New Planet Discovered",
            description: "Astronomers have discovered a potentially habitable exoplanet located in the Goldilocks zone of a nearby star system.",
            url: "https://example.com/science-news-1",
            urlToImage: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400",
            publishedAt: "2025-12-11T13:45:00Z",
            source: { name: "Science Today" },
            category: "science"
        }
    ]
};

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { category, search } = req.query;
    let filteredArticles = [...demoNews.articles];

    // Filter by category
    if (category) {
        filteredArticles = filteredArticles.filter(article => 
            article.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Filter by search query
    if (search) {
        filteredArticles = filteredArticles.filter(article =>
            article.title.toLowerCase().includes(search.toLowerCase()) ||
            article.description.toLowerCase().includes(search.toLowerCase()) ||
            article.category.toLowerCase().includes(search.toLowerCase())
        );
    }

    res.status(200).json({
        status: 'ok',
        totalResults: filteredArticles.length,
        articles: filteredArticles
    });
}
