// src/hooks/useArticles.ts
import { useState, useCallback } from 'react'
import { CacheService } from '../services/cacheService'
import { fetchSubredditPosts } from '../services/redditApi'
import { translateText } from '../services/translationService'
import { getFilteredCountries, getRandomCountries } from '../services/countryService'
import type { Article, FilterOptions } from '../types'

const CACHED_ARTICLES_KEY = 'articles'
const CACHED_ORIGINAL_ARTICLES_KEY = 'original_articles'

export function useArticles(filterOptions: FilterOptions) {
  const [articles, setArticles] = useState<Article[]>(() => {
    const cached = CacheService.get<Article[]>(CACHED_ARTICLES_KEY, 'reddit')
    return cached || []
  })

  const [originalArticles, setOriginalArticles] = useState<Article[]>(() => {
    const cached = CacheService.get<Article[]>(CACHED_ORIGINAL_ARTICLES_KEY, 'reddit')
    return cached || []
  })

  const [isLoading, setIsLoading] = useState(articles.length === 0)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const filteredCountries = getFilteredCountries(filterOptions.region || 'all')
      const selectedCountries = getRandomCountries(filteredCountries, 15)

      const allPostsPromises = selectedCountries.map(async country => {
        const posts = await fetchSubredditPosts(country.subreddit)
        return posts.slice(0, 1).map(post => ({
          ...post,
          countryName: country.name
        }))
      })

      const allPosts = await Promise.all(allPostsPromises)
      let flattenedPosts = allPosts.flat()

      if (filterOptions.sort === 'top') {
        flattenedPosts = flattenedPosts.sort((a, b) => b.score - a.score)
      } else {
        flattenedPosts = flattenedPosts.sort((a, b) => b.created_utc - a.created_utc)
      }

      CacheService.set(CACHED_ORIGINAL_ARTICLES_KEY, flattenedPosts, 'reddit')
      setOriginalArticles(flattenedPosts)

      if (filterOptions.translate) {
        const translatedPosts = await Promise.all(
          flattenedPosts.map(async post => {
            const translatedTitle = await translateText(post.title)
            const translatedContent = post.selftext 
              ? await translateText(post.selftext)
              : post.selftext

            const titleChanged = translatedTitle !== post.title
            const contentChanged = post.selftext ? translatedContent !== post.selftext : false

            return {
              ...post,
              title: translatedTitle,
              selftext: translatedContent,
              isTranslated: titleChanged || contentChanged
            }
          })
        )
        CacheService.set(CACHED_ARTICLES_KEY, translatedPosts, 'reddit')
        setArticles(translatedPosts)
      } else {
        CacheService.set(CACHED_ARTICLES_KEY, flattenedPosts, 'reddit')
        setArticles(flattenedPosts)
      }
    } catch (error) {
      setError(`Failed to load posts: ${error instanceof Error ? error.message : 'Unknown error'}`)
      console.error('Error loading posts:', error)
    } finally {
      setIsLoading(false)
    }
  }, [filterOptions.sort, filterOptions.region, filterOptions.translate])

  const clearArticles = useCallback(() => {
    CacheService.remove(`reddit_${CACHED_ARTICLES_KEY}`)
    CacheService.remove(`reddit_${CACHED_ORIGINAL_ARTICLES_KEY}`)
    setArticles([])
    setOriginalArticles([])
  }, [])

  return {
    articles,
    originalArticles,
    isLoading,
    error,
    fetchPosts,
    clearArticles,
    setArticles,
    setOriginalArticles,
    setIsLoading
  }
}