// src/services/redditApi.ts
export interface RedditPost {
    title: string
    selftext: string
    author: string
    created_utc: number
    url: string
    permalink: string
    score: number
    stickied: boolean
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
  
  export async function fetchSubredditPosts(subreddit: string): Promise<RedditPost[]> {
    try {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`)
      const data: RedditResponse = await response.json()
      
      return data.data.children
        .map((post: RedditChild) => post.data)
        .filter((post: RedditPost) => !post.stickied)
  
    } catch (error) {
      console.error(`Error fetching from r/${subreddit}:`, error)
      return []
    }
  }