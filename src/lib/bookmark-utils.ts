// Define the structure for different types of bookmarks
export interface NewsBookmark {
  type: 'news';
  title: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  bookmarkedAt: string;
}

export interface ProductBookmark {
  type: 'product';
  id: string;
  name: string;
  description: string;
  status: string;
  bookmarkedAt: string;
}

export interface LaunchBookmark {
  type: 'launch';
  id: string;
  name: string;
  description: string;
  date: string;
  bookmarkedAt: string;
}

export interface PostBookmark {
  type: 'post';
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  bookmarkedAt: string;
}

export type BookmarkItem = NewsBookmark | ProductBookmark | LaunchBookmark | PostBookmark;

// Save a bookmark to localStorage
export const saveBookmark = (bookmark: BookmarkItem) => {
  if (typeof window !== 'undefined') {
    const bookmarks = getBookmarks();
    // Check if already bookmarked
    const existingIndex = bookmarks.findIndex((b: BookmarkItem) => {
      switch (b.type) {
        case 'news':
          return b.sourceUrl === (bookmark as NewsBookmark).sourceUrl;
        case 'product':
          return b.id === (bookmark as ProductBookmark).id;
        case 'launch':
          return b.id === (bookmark as LaunchBookmark).id;
        case 'post':
          return b.id === (bookmark as PostBookmark).id;
        default:
          return false;
      }
    });
    
    if (existingIndex === -1) {
      // Add new bookmark
      bookmarks.push(bookmark);
    } else {
      // Update existing bookmark
      bookmarks[existingIndex] = bookmark;
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('storage'));
  }
};

// Remove a bookmark from localStorage
export const removeBookmark = (bookmark: BookmarkItem) => {
  if (typeof window !== 'undefined') {
    const bookmarks = getBookmarks();
    const filteredBookmarks = bookmarks.filter((b: BookmarkItem) => {
      switch (b.type) {
        case 'news':
          return b.sourceUrl !== (bookmark as NewsBookmark).sourceUrl;
        case 'product':
          return b.id !== (bookmark as ProductBookmark).id;
        case 'launch':
          return b.id !== (bookmark as LaunchBookmark).id;
        case 'post':
          return b.id !== (bookmark as PostBookmark).id;
        default:
          return true;
      }
    });
    
    localStorage.setItem('bookmarks', JSON.stringify(filteredBookmarks));
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('storage'));
  }
};

// Get all bookmarks from localStorage
export const getBookmarks = (): BookmarkItem[] => {
  if (typeof window !== 'undefined') {
    try {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      return bookmarks;
    } catch (error) {
      console.error('Error parsing bookmarks:', error);
      return [];
    }
  }
  return [];
};

// Check if an item is bookmarked
export const isBookmarked = (item: any): boolean => {
  if (typeof window !== 'undefined') {
    const bookmarks = getBookmarks();
    
    return bookmarks.some((bookmark: BookmarkItem) => {
      switch (bookmark.type) {
        case 'news':
          return bookmark.sourceUrl === item.sourceUrl;
        case 'product':
          return bookmark.id === item.id;
        case 'launch':
          return bookmark.id === item.id;
        case 'post':
          return bookmark.id === item.id;
        default:
          return false;
      }
    });
  }
  return false;
};

// Toggle bookmark status
export const toggleBookmark = (item: any) => {
  if (isBookmarked(item)) {
    // Remove bookmark
    switch (item.type) {
      case 'news':
        removeBookmark({
          type: 'news',
          title: item.title,
          sourceName: item.sourceName,
          sourceUrl: item.sourceUrl,
          publishedAt: item.publishedAt,
          bookmarkedAt: new Date().toISOString()
        } as NewsBookmark);
        break;
      case 'product':
        removeBookmark({
          type: 'product',
          id: item.id,
          name: item.name,
          description: item.description,
          status: item.status,
          bookmarkedAt: new Date().toISOString()
        } as ProductBookmark);
        break;
      case 'launch':
        removeBookmark({
          type: 'launch',
          id: item.id,
          name: item.name,
          description: item.description,
          date: item.date,
          bookmarkedAt: new Date().toISOString()
        } as LaunchBookmark);
        break;
      case 'post':
        removeBookmark({
          type: 'post',
          id: item.id,
          title: item.title,
          content: item.content,
          author: item.author,
          publishedAt: item.publishedAt,
          bookmarkedAt: new Date().toISOString()
        } as PostBookmark);
        break;
    }
  } else {
    // Add bookmark
    const bookmarkedAt = new Date().toISOString();
    
    switch (item.type) {
      case 'news':
        saveBookmark({
          type: 'news',
          title: item.title,
          sourceName: item.sourceName,
          sourceUrl: item.sourceUrl,
          publishedAt: item.publishedAt,
          bookmarkedAt
        } as NewsBookmark);
        break;
      case 'product':
        saveBookmark({
          type: 'product',
          id: item.id,
          name: item.name,
          description: item.description,
          status: item.status,
          bookmarkedAt
        } as ProductBookmark);
        break;
      case 'launch':
        saveBookmark({
          type: 'launch',
          id: item.id,
          name: item.name,
          description: item.description,
          date: item.date,
          bookmarkedAt
        } as LaunchBookmark);
        break;
      case 'post':
        saveBookmark({
          type: 'post',
          id: item.id,
          title: item.title,
          content: item.content,
          author: item.author,
          publishedAt: item.publishedAt,
          bookmarkedAt
        } as PostBookmark);
        break;
    }
  }
};