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
  const [articles, setArticles] = useState<Article[]>(() => 
    CacheService.get<Article[]>(CACHED_ARTICLES_KEY, 'reddit') || []
  )
  const [originalArticles, setOriginalArticles] = useState<Article[]>(() => 
    CacheService.get<Article[]>(CACHED_ORIGINAL_ARTICLES_KEY, 'reddit') || []
  )
  const [isLoading, setIsLoading] = useState(articles.length === 0)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Get posts from selected countries
      const countries = getRandomCountries(
        getFilteredCountries(filterOptions.region || 'all'), 
        15
      )
      
      const posts = (await Promise.all(
        countries.map(async country => {
          const result = await fetchSubredditPosts(country.subreddit)
          return Array.isArray(result) && result.length > 0
            ? [{ ...result[0], countryName: country.name }]
            : []
        })
      )).flat().filter(Boolean)

      // Sort and save posts
      const sortedPosts = posts.sort((a, b) => 
        filterOptions.sort === 'top' ? b.score - a.score : b.created_utc - a.created_utc
      )

      if (sortedPosts.length > 0) {
        // Save and set original posts
        CacheService.set(CACHED_ORIGINAL_ARTICLES_KEY, sortedPosts, 'reddit')
        setOriginalArticles(sortedPosts)

        // Handle translations
        const finalPosts = filterOptions.translate
          ? await Promise.all(sortedPosts.map(translatePost))
          : sortedPosts

        CacheService.set(CACHED_ARTICLES_KEY, finalPosts, 'reddit')
        setArticles(finalPosts)
      }
    } catch (error) {
      setError(`Failed to load posts: ${error instanceof Error ? error.message : 'Unknown error'}`)
      console.error('Error loading posts:', error)
    }
    
    setIsLoading(false)
  }, [filterOptions.sort, filterOptions.region, filterOptions.translate])

  // Handle translation toggle
  useEffect(() => {
    if (originalArticles.length > 0) {
      setIsLoading(true)
      Promise.resolve()
        .then(async () => {
          const finalPosts = filterOptions.translate
            ? await Promise.all(originalArticles.map(translatePost))
            : originalArticles

          CacheService.set(CACHED_ARTICLES_KEY, finalPosts, 'reddit')
          setArticles(finalPosts)
        })
        .catch(error => console.error('Translation error:', error))
        .finally(() => setIsLoading(false))
    }
  }, [filterOptions.translate, originalArticles])

  const handleRefresh = useCallback(() => {
    CacheService.remove(`reddit_${CACHED_ARTICLES_KEY}`)
    CacheService.remove(`reddit_${CACHED_ORIGINAL_ARTICLES_KEY}`)
    setArticles([])
    setOriginalArticles([])
    fetchPosts()
  }, [fetchPosts])

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
    handleRefresh,
    clearArticles,
    setArticles,      
    setOriginalArticles,  
  }
}