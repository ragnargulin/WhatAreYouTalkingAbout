// src/components/ArticleCard/ArticleCard.tsx
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ArticleHeader } from './ArticleHeader'
import { ArticleContent } from './ArticleContent'

const Card = styled.div`
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`

const ViewOnReddit = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background: #ff4500;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #ff5722;
  }
`

interface ArticleProps {
  id: number
  countryCode: string
  title: string
  content: string
  isExpanded: boolean
  onExpand: (id: number) => void
  url: string
}

export default function ArticleCard({ 
  id, 
  countryCode, 
  title,
  content,
  isExpanded,
  onExpand,
  url 
}: ArticleProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    onExpand(id)
    if (!isExpanded) {
      navigate(`/article/${id}`)
    } else {
      navigate('/')
    }
  }

  const handleRedditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(url, '_blank')
  }

  return (
    <Card onClick={handleClick}>
      <ArticleHeader title={title} countryCode={countryCode} />
      <ArticleContent content={content} isExpanded={isExpanded} />
      {isExpanded && (
        <ViewOnReddit onClick={handleRedditClick}>
          View on Reddit
        </ViewOnReddit>
      )}
    </Card>
  )
}