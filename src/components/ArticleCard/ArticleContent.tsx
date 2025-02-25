import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

const ContentWrapper = styled.div<{ showGradient: boolean; isExpanded: boolean }>`
  position: relative;
  margin-top: 10px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${props => props.isExpanded ? '0' : '50px'};
    background: ${props => props.isExpanded || !props.showGradient 
      ? 'none' 
      : 'linear-gradient(transparent, white)'};
    pointer-events: none;
  }
`

const Content = styled.p<{ isExpanded: boolean }>`
  color: #666;
  line-height: 1.5;
  max-height: ${props => props.isExpanded ? 'none' : '100px'};
  overflow: hidden;
  margin: 0;
`

interface ArticleContentProps {
  content: string
  isExpanded: boolean
}

export function ArticleContent({ content, isExpanded }: ArticleContentProps) {
  const contentRef = useRef<HTMLParagraphElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current
      setIsOverflowing(element.scrollHeight > element.clientHeight)
    }
  }, [content])

  return (
    <ContentWrapper showGradient={isOverflowing} isExpanded={isExpanded}>
      <Content ref={contentRef} isExpanded={isExpanded}>
        {content}
      </Content>
    </ContentWrapper>
  )
}