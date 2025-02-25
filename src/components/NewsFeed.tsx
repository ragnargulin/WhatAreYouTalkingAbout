import { useState } from 'react'
import { 
  FeedContainer, 
  Header, 
  ArticleCard,
  ArticleTitle,
  CountryTag,
  ArticleContent 
} from './styles/NewsFeedStyles'

interface Article {
  id: number
  countryCode: string
  title: string
  content: string
}

function NewsFeed() {
  const [articles] = useState<Article[]>([
    {
      id: 1,
      countryCode: 'SE',
      title: 'Breaking News from Sweden',
      content: 'This is some news from Sweden...'
    },
    {
      id: 2,
      countryCode: 'US',
      title: 'Latest Updates from USA',
      content: 'Something happened in the United States...'
    },
    {
      id: 3,
      countryCode: 'JP',
      title: 'News from Japan',
      content: 'A development in Japan...'
    }
  ])

  return (
    <FeedContainer>
      <Header>Global News Feed</Header>
      {articles.map(article => (
        <ArticleCard key={article.id}>
          <ArticleTitle>{article.title}</ArticleTitle>
          <CountryTag>{article.countryCode}</CountryTag>
          <ArticleContent>{article.content}</ArticleContent>
        </ArticleCard>
      ))}
    </FeedContainer>
  )
}

export default NewsFeed