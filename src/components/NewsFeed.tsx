// src/components/NewsFeed.tsx
import { useEffect, useCallback } from 'react' 
import { useParams, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { FilterBar } from './FilterBar'
import { ArticleList } from './ArticleList'
import { useArticles } from '../hooks/useArticles'
import { useFilterOptions } from '../hooks/useFilterOptions'
import type { FilterOptions } from '../types'

const FeedContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`

const Header = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: white;
  font-size: 2.5rem;
`

export default function NewsFeed() {
  const { region } = useParams()
  const [searchParams] = useSearchParams()

  // Create initial filter options
  const initialFilterOptions: FilterOptions = {
    region: region || 'all',
    sort: (searchParams.get('sort') as 'latest' | 'top') || 'latest',
    translate: searchParams.get('translate') === 'true'
  }

  const {
    articles,
    originalArticles,
    isLoading,
    error,
    fetchPosts,
    clearArticles,
    setArticles,
    setOriginalArticles,
    setIsLoading
  } = useArticles(initialFilterOptions)

  const { filterOptions, handleFilterChange } = useFilterOptions({
    initialRegion: region || 'all',
    initialSort: (searchParams.get('sort') as 'latest' | 'top') || 'latest',
    initialTranslate: searchParams.get('translate') === 'true',
    originalArticles,
    setArticles,
    setOriginalArticles,
    setIsLoading
  })

  const handleRefresh = useCallback(() => {
    clearArticles()
    fetchPosts()
  }, [clearArticles, fetchPosts])

  useEffect(() => {
    if (articles.length === 0) {
      fetchPosts()
    }
  }, [filterOptions.region, filterOptions.sort, fetchPosts, articles.length])

  return (
    <FeedContainer>
      <Header>Global Reddit Feed</Header>
      <FilterBar 
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />
      <ArticleList 
        articles={articles}
        isLoading={isLoading}
        error={error}
      />
    </FeedContainer>
  )
}