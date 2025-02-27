// src/types.ts
import { RedditPost } from './services/redditApi'

export interface FilterOptions {
  region?: string
  sort: 'latest' | 'top'
  translate: boolean
}

export interface Article extends RedditPost {
  countryName: string
  isTranslated?: boolean
}