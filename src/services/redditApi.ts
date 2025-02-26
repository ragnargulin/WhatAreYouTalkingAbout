// src/services/redditApi.ts
import { CacheService } from './cacheService'

export interface RedditPost {
  title: string
  selftext: string
  author: string
  created_utc: number
  url: string
  permalink: string
  score: number
  stickied: boolean
  isTranslated?: boolean
}

interface RedditChild {
  kind: string
  data: RedditPost
}

interface RedditResponse {
  kind: string
  data: {
    children: RedditChild[]
  }
}

function isValidTextPost(post: RedditPost): boolean {
  // Check if post exists and has required fields
  if (!post || !post.selftext || !post.title) {
    return false
  }

  // Clean up the text
  const cleanText = post.selftext.trim()

  // List of strings that indicate invalid/removed content
  const invalidContent = [
    '[removed]',
    '[deleted]',
    'deleted',
    'removed',
    ''  // empty string
  ]

  // Check minimum length (e.g., at least 100 characters)
  const MIN_LENGTH = 100
  if (cleanText.length < MIN_LENGTH) {
    return false
  }

  // Check if content is valid
  return !invalidContent.includes(cleanText)
}

export async function fetchSubredditPosts(subreddit: string): Promise<RedditPost[]> {
  // Check cache first
  const cachedPosts = CacheService.get<RedditPost[]>(subreddit, 'reddit')
  if (cachedPosts) {
    return cachedPosts
  }

  try {
    const response = await fetch(`https://old.reddit.com/r/${subreddit}/hot.json?limit=15`)
    
    if (!response.ok) {
      console.warn(`Subreddit r/${subreddit} returned status ${response.status}`)
      return []
    }

    const data: RedditResponse = await response.json()
    
    if (!data?.data?.children) {
      console.warn(`Unexpected response format from r/${subreddit}`)
      return []
    }

    const posts = data.data.children
      .map((post: RedditChild) => post.data)
      .filter((post: RedditPost) => {
        // Filter criteria:
        // 1. Not stickied
        // 2. Has valid text content (using our helper function)
        return !post.stickied && isValidTextPost(post)
      })

    // Cache the filtered results
    if (posts.length > 0) {
      CacheService.set(subreddit, posts, 'reddit')
    }

    return posts
  } catch (error) {
    console.error(`Error fetching from r/${subreddit}:`, error)
    return []
  }
}

// Optional: Add a function to clear cache for a specific subreddit
export function clearSubredditCache(subreddit: string): void {
  CacheService.remove(`reddit_${subreddit}`)
}

// Optional: Add a function to get fresh posts ignoring cache
export async function fetchFreshSubredditPosts(subreddit: string): Promise<RedditPost[]> {
  clearSubredditCache(subreddit)
  return fetchSubredditPosts(subreddit)
}