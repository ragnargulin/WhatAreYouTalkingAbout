// src/components/ArticleList.tsx
import styled from 'styled-components'
import ArticleCard from './ArticleCard/ArticleCard'
import { RedditPost } from '../services/redditApi'

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

interface Article extends RedditPost {
  countryName: string
}

interface ArticleListProps {
  articles: Article[]
  isLoading: boolean
  error: string | null
}

export function ArticleList({ articles, isLoading, error }: ArticleListProps) {
  if (isLoading) return <LoadingMessage>Loading posts...</LoadingMessage>
  if (error) return <ErrorMessage>{error}</ErrorMessage>

  return (
    <>
      {articles.map((article) => (
        <ArticleCard
          key={article.url}
          title={`[${article.countryName}] ${article.title}`}
          content={article.selftext || 'Click to view on Reddit'}
          url={article.url}
          isTranslated={article.isTranslated}
        />
      ))}
    </>
  )
}