// src/components/styles/NewsFeedStyles.ts
import styled from 'styled-components'

export const FeedContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

export const Header = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 2.5rem;
`

export const ArticleCard = styled.div`
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`

export const ArticleTitle = styled.h2`
  margin-bottom: 10px;
  color: #1a1a1a;
`

export const CountryTag = styled.span`
  background: #e3f2fd;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #1976d2;
`

export const ArticleContent = styled.p`
  margin-top: 10px;
  color: #666;
  line-height: 1.5;
`