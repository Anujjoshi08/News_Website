# News API Server

A simple Express.js API server that provides demo news articles for the News Website application.

## Installation

1. Navigate to the api folder:
```bash
cd api
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Get All News
- **URL:** `/api/news`
- **Method:** `GET`
- **Query Parameters:**
  - `category` (optional): Filter by category (ipl, finance, politics, etc.)
  - `search` (optional): Search in title and description
- **Example:** 
  - `/api/news` - Get all news
  - `/api/news?category=ipl` - Get IPL news
  - `/api/news?search=cricket` - Search for cricket-related news

### Get News by Category
- **URL:** `/api/news/:category`
- **Method:** `GET`
- **Example:** `/api/news/finance` - Get finance news

## Demo Categories

The API includes demo news in the following categories:
- IPL (Cricket)
- Finance
- Politics
- Technology
- Science

## Testing the API

You can test the API using:
- Browser: `http://localhost:3000/api/news`
- cURL: `curl http://localhost:3000/api/news`
- Postman or any API testing tool
