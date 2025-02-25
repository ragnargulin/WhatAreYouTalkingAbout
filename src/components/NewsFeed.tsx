import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import ArticleCard from './ArticleCard/ArticleCard'

const FeedContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 2.5rem;
`

interface Article {
  id: number
  countryCode: string
  title: string
  content: string
}

function NewsFeed() {
    const { articleId } = useParams()
    const [expandedArticleId, setExpandedArticleId] = useState<number | null>(
      articleId ? Number(articleId) : null
    )
    
    const [articles] = useState<Article[]>([
      {
        id: 1,
        countryCode: 'SE',
        title: 'Breaking News from Sweden',
        content: 'This is some interesting news from Sweden... '.repeat(1)
      },
      {
        id: 2,
        countryCode: 'US',
        title: 'Latest Updates from USA',
        content: 'Something interesting happened in the United States... '.repeat(100)
      },
      {
        id: 3,
        countryCode: 'JP',
        title: 'News from Japan',
        content: 'An interesting development in Japan... '.repeat(10)
      }
    ])
  
    // Update expanded article when URL changes
    useEffect(() => {
      if (articleId) {
        setExpandedArticleId(Number(articleId))
      } else {
        setExpandedArticleId(null)
      }
    }, [articleId])
  
    const handleExpand = (id: number) => {
      setExpandedArticleId(expandedArticleId === id ? null : id)
    }
  
    return (
      <FeedContainer>
        <Header>Global News Feed</Header>
        {articles.map(article => (
          <ArticleCard
            key={article.id}
            {...article}
            isExpanded={article.id === expandedArticleId}
            onExpand={handleExpand}
          />
        ))}
      </FeedContainer>
    )
  }
  
  export default NewsFeed