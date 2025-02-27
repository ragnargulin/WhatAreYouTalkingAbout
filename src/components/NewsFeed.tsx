// src/components/NewsFeed.tsx
import { useEffect, useCallback } from 'react' 
import { useParams, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { FilterBar } from './FilterBar'
import ArticleCard from './ArticleCard/ArticleCard'
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
  font-size: 3.5rem;
`

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: white;
`

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 20px;
  background: #fff3f3;
  border-radius: 8px;
  margin: 20px 0;
`

export default function NewsFeed() {
  const { region } = useParams()
  const [searchParams] = useSearchParams()

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
  } = useArticles(initialFilterOptions)

  const { filterOptions, handleFilterChange } = useFilterOptions({
    initialRegion: region || 'all',
    initialSort: (searchParams.get('sort') as 'latest' | 'top') || 'latest',
    initialTranslate: searchParams.get('translate') === 'true',
    originalArticles,
    setArticles,
    setOriginalArticles,
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

  const renderArticles = () => {
    if (isLoading) return <LoadingMessage>Loading posts...</LoadingMessage>
    if (error) return <ErrorMessage>{error}</ErrorMessage>

    return articles.map((article) => (
      <ArticleCard
        key={article.url}
        title={`[${article.countryName}] ${article.title}`}
        content={article.selftext || 'Click to view on Reddit'}
        url={article.url}
        isTranslated={article.isTranslated}
      />
    ))
  }

  return (
    <FeedContainer>
      <Header>what r u talking about?!</Header>
      <FilterBar 
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />
      {renderArticles()}
    </FeedContainer>
  )
}