import styled from 'styled-components'

const Title = styled.h2`
  margin-bottom: 10px;
  color: #1a1a1a;
`
const HeaderWrapper = styled.div`
  margin-bottom: 10px;
`

interface ArticleHeaderProps {
  title: string
}

export function ArticleHeader({ title }: ArticleHeaderProps) {
  return (
    <HeaderWrapper>
      <Title>{title}</Title>
    </HeaderWrapper>
  )
}
