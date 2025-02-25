import styled from 'styled-components'

const HeaderWrapper = styled.div`
  margin-bottom: 10px;
`

const Title = styled.h2`
  margin-bottom: 10px;
  color: #1a1a1a;
`

const CountryTag = styled.span`
  background: #e3f2fd;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #1976d2;
`

interface ArticleHeaderProps {
  title: string
  countryCode: string
}

export function ArticleHeader({ title, countryCode }: ArticleHeaderProps) {
  return (
    <HeaderWrapper>
      <Title>{title}</Title>
      <CountryTag>{countryCode}</CountryTag>
    </HeaderWrapper>
  )
}