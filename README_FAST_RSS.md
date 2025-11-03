# Fast RSS Aggregator

A high-performance Python-based RSS feed aggregator with AI-powered filtering capabilities.

## Features

- **Concurrent Feed Fetching**: Fetches multiple RSS feeds simultaneously using asyncio and aiohttp
- **AI-Powered Filtering**: Automatically filters articles based on AI/ML content keywords
- **Database Storage**: Stores articles in SQLite for fast retrieval
- **RESTful API**: Provides a FastAPI-based server for accessing articles
- **Search Functionality**: Search articles by keywords
- **Pagination Support**: Efficient pagination for large datasets

## Requirements

- Python 3.7+
- Dependencies listed in `requirements.txt`

## Installation

1. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### 1. Run the RSS Aggregator

```bash
python fast_rss_aggregator.py
```

This will:
- Fetch articles from all configured RSS sources
- Filter articles based on AI content
- Store articles in a local SQLite database

### 2. Run the API Server

```bash
python fast_rss_api.py
```

The API server will start on `http://localhost:8000` with the following endpoints:

- `GET /` - Health check endpoint
- `GET /api/news` - Get news articles with pagination
- `GET /api/news/sources` - Get list of available sources
- `GET /api/news/search` - Search articles by query

### API Endpoints

#### Get News Articles
```
GET /api/news?page=1&limit=50
```

Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of articles per page (default: 50, max: 100)

#### Get Available Sources
```
GET /api/news/sources
```

#### Search Articles
```
GET /api/news/search?query=AI&page=1&limit=50
```

Parameters:
- `query` (required): Search query
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of articles per page (default: 50, max: 100)

## Configuration

### RSS Sources

RSS sources are configured in the `RSS_FEEDS` dictionary in `fast_rss_aggregator.py`. You can add or remove sources by modifying this dictionary.

### AI Keywords

AI-related keywords for filtering are defined in the `AI_KEYWORDS` list in `fast_rss_aggregator.py`. You can customize this list to adjust the filtering criteria.

## Performance Benefits

1. **Concurrent Requests**: Uses asyncio and aiohttp to fetch multiple feeds simultaneously
2. **Efficient Parsing**: Uses feedparser for robust RSS parsing
3. **Database Storage**: SQLite database for fast article retrieval
4. **Smart Filtering**: AI-powered content filtering reduces irrelevant articles
5. **Caching**: Articles are stored locally to avoid repeated fetching

## Database Schema

Articles are stored in an SQLite database with the following schema:

```sql
CREATE TABLE articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT,
    title TEXT,
    description TEXT,
    url TEXT UNIQUE,
    published_at TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Customization

You can customize the aggregator by modifying:

1. **RSS Sources**: Edit the `RSS_FEEDS` dictionary
2. **AI Keywords**: Edit the `AI_KEYWORDS` list
3. **Filtering Logic**: Modify the `filter_articles` function
4. **Database Storage**: Adjust the database schema and storage logic

## Troubleshooting

### Common Issues

1. **Connection Timeouts**: Some RSS feeds may be slow or unavailable. The aggregator handles these gracefully.
2. **Parsing Errors**: Some feeds may have invalid XML. These are logged and skipped.
3. **Rate Limiting**: Some sites may rate-limit requests. The concurrent fetching is designed to be respectful.

### Logs

The application logs information, warnings, and errors to the console. Check these logs if you encounter issues.

## License

This project is licensed under the MIT License.