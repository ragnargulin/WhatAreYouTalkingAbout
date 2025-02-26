// src/hooks/useFilterOptions.ts
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { translateText } from '../services/translationService'
import { CacheService } from '../services/cacheService'
import type { FilterOptions, Article } from '../types'

const CACHED_ARTICLES_KEY = 'articles'
const CACHED_ORIGINAL_ARTICLES_KEY = 'original_articles'

interface UseFilterOptionsProps {
  initialRegion: string | undefined
  initialSort: 'latest' | 'top'
  initialTranslate: boolean
  originalArticles: Article[]
  setArticles: (articles: Article[]) => void
  setOriginalArticles: (articles: Article[]) => void
  setIsLoading: (isLoading: boolean) => void
}

export function useFilterOptions({
  initialRegion,
  initialSort,
  initialTranslate,
  originalArticles,
  setArticles,
  setOriginalArticles,
  setIsLoading
}: UseFilterOptionsProps) {
  const navigate = useNavigate()
  
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    region: initialRegion || 'all',
    sort: initialSort,
    translate: initialTranslate
  })

  const handleFilterChange = useCallback((newOptions: Partial<FilterOptions>) => {
    const updatedOptions = { ...filterOptions, ...newOptions }
    
    const translateArticles = async (articlesToTranslate: Article[]): Promise<Article[]> => {
      try {
        return await Promise.all(
          articlesToTranslate.map(async article => {
            const translatedTitle = await translateText(article.title)
            const translatedContent = article.selftext 
              ? await translateText(article.selftext)
              : article.selftext

            const titleChanged = translatedTitle !== article.title
            const contentChanged = article.selftext ? translatedContent !== article.selftext : false

            return {
              ...article,
              title: translatedTitle,
              selftext: translatedContent,
              isTranslated: titleChanged || contentChanged
            }
          })
        )
      } catch (error) {
        console.error('Translation error:', error)
        throw error
      }
    }
    
    if (Object.keys(newOptions).length === 1 && 'translate' in newOptions) {
      setIsLoading(true)
      if (newOptions.translate) {
        translateArticles(originalArticles).then(translatedPosts => {
          CacheService.set(CACHED_ARTICLES_KEY, translatedPosts, 'reddit')
          setArticles(translatedPosts)
          setIsLoading(false)
        })
      } else {
        setArticles(originalArticles)
        CacheService.set(CACHED_ARTICLES_KEY, originalArticles, 'reddit')
        setIsLoading(false)
      }
    } else if ('region' in newOptions || 'sort' in newOptions) {
      CacheService.remove(`reddit_${CACHED_ARTICLES_KEY}`)
      CacheService.remove(`reddit_${CACHED_ORIGINAL_ARTICLES_KEY}`)
      setArticles([])
      setOriginalArticles([])
    }
    
    setFilterOptions(updatedOptions)

    const params = new URLSearchParams()
    if (updatedOptions.sort) params.set('sort', updatedOptions.sort)
    if (updatedOptions.translate) params.set('translate', 'true')

    navigate(
      updatedOptions.region === 'all' 
        ? `/?${params}`
        : `/region/${updatedOptions.region}?${params}`
    )
  }, [filterOptions, navigate, originalArticles, setArticles, setOriginalArticles, setIsLoading])

  return {
    filterOptions,
    handleFilterChange
  }
}