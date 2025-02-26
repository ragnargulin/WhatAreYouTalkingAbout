// src/components/ArticleCard/ArticleCard.tsx
import { useState } from 'react'
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
const TranslatedBadge = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8em;
  margin-left: 8px;
`

interface ArticleProps {
  countryCode: string
  title: string
  content: string
  url: string
  isTranslated?: boolean
}

function ArticleCard({ 
  countryCode, 
  title,
  content,
  url,
  isTranslated 
 
}: ArticleProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  const handleRedditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(url, '_blank')
  }

  return (
    <Card onClick={handleClick}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ArticleHeader title={title} countryCode={countryCode} />
        {isTranslated && (
          <TranslatedBadge>Translated</TranslatedBadge>
        )}
      </div>
      <ArticleContent content={content} isExpanded={isExpanded} />
      {isExpanded && (
        <ViewOnReddit onClick={handleRedditClick}>
          View on Reddit
        </ViewOnReddit>
      )}
    </Card>
  )
}

export default ArticleCard