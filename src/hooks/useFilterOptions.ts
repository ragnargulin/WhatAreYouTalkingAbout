// src/hooks/useFilterOptions.ts
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
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
}

export function useFilterOptions({
  initialRegion,
  initialSort,
  initialTranslate,
  originalArticles,
  setArticles,
  setOriginalArticles
}: UseFilterOptionsProps) {
  const navigate = useNavigate()
  
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    region: initialRegion || 'all',
    sort: initialSort,
    translate: initialTranslate
  })

  const handleFilterChange = useCallback((newOptions: Partial<FilterOptions>) => {
    const updatedOptions = { ...filterOptions, ...newOptions }
    
    if (Object.keys(newOptions).length === 1 && 'translate' in newOptions) {
      if (!newOptions.translate) {
        // If turning translation off, use original articles
        setArticles(originalArticles)
      } else {
        // If turning translation on, check cache first
        const cachedTranslated = CacheService.get<Article[]>(CACHED_ARTICLES_KEY, 'reddit')
        if (cachedTranslated) {
          setArticles(cachedTranslated)
        } else {
          setArticles([])
        }
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
  }, [filterOptions, navigate, originalArticles, setArticles, setOriginalArticles])

  return {
    filterOptions,
    handleFilterChange
  }
}