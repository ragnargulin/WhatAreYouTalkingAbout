// src/hooks/useArticles.ts
import { useState, useCallback, useEffect } from 'react'
import { CacheService } from '../services/cacheService'
import { fetchSubredditPosts } from '../services/redditApi'
import { translateText } from '../services/translationService'
import { getFilteredCountries, getRandomCountries } from '../services/countryService'
import type { Article, FilterOptions } from '../types'

const CACHED_ARTICLES_KEY = 'articles'
const CACHED_ORIGINAL_ARTICLES_KEY = 'original_articles'

async function translatePost(post: Article) {
  const titleTranslation = await translateText(post.title)
  const contentTranslation = post.selftext 
    ? await translateText(post.selftext)
    : { text: post.selftext, needsTranslation: false }

  return {
    ...post,
    title: titleTranslation.text,
    selftext: contentTranslation.text,
    isTranslated: titleTranslation.needsTranslation || contentTranslation.needsTranslation
  }
}

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
      // Fetch and prepare posts
      const filteredCountries = getFilteredCountries(filterOptions.region || 'all')
      const selectedCountries = getRandomCountries(filteredCountries, 15)
      const allPosts = await Promise.all(
        selectedCountries.map(async country => {
          const posts = await fetchSubredditPosts(country.subreddit)
          return posts.slice(0, 1).map(post => ({
            ...post,
            countryName: country.name
          }))
        })
      )

      // Sort posts
      const flattenedPosts = allPosts.flat().sort((a: Article, b: Article) => 
        filterOptions.sort === 'top' 
          ? b.score - a.score 
          : b.created_utc - a.created_utc
      )

      // Save original posts
      CacheService.set(CACHED_ORIGINAL_ARTICLES_KEY, flattenedPosts, 'reddit')
      setOriginalArticles(flattenedPosts)

      // Handle translation if needed
      const finalPosts = filterOptions.translate
        ? await Promise.all(flattenedPosts.map(translatePost))
        : flattenedPosts

      CacheService.set(CACHED_ARTICLES_KEY, finalPosts, 'reddit')
      setArticles(finalPosts)
    } catch (error) {
      setError(`Failed to load posts: ${error instanceof Error ? error.message : 'Unknown error'}`)
      console.error('Error loading posts:', error)
    } finally {
      setIsLoading(false)
    }
  }, [filterOptions.sort, filterOptions.region, filterOptions.translate])

  const handleTranslationToggle = useCallback(async () => {
    if (!originalArticles.length) return

    setIsLoading(true)
    try {
      const finalPosts = filterOptions.translate
        ? await Promise.all(originalArticles.map(translatePost))
        : originalArticles

      CacheService.set(CACHED_ARTICLES_KEY, finalPosts, 'reddit')
      setArticles(finalPosts)
    } catch (error) {
      console.error('Translation error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [filterOptions.translate, originalArticles])

  const clearArticles = useCallback(() => {
    CacheService.remove(`reddit_${CACHED_ARTICLES_KEY}`)
    CacheService.remove(`reddit_${CACHED_ORIGINAL_ARTICLES_KEY}`)
    setArticles([])
    setOriginalArticles([])
  }, [])

  useEffect(() => {
    handleTranslationToggle()
  }, [filterOptions.translate, handleTranslationToggle])

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