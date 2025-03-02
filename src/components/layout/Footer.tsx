// src/components/layout/Footer.tsx

import styled from 'styled-components'


const FooterContainer = styled.footer`
  padding: 2rem;
  color: white;
  max-width: 800px;
  margin: 0 auto;

`


const ContactInfo = styled.div`
width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
`



export function Footer() {
  return (
    <FooterContainer>
        <ContactInfo>
          <p>Ragnar Gulin</p>
          <p><a target='blank' href="https://ragnargulin.se">Ragnargulin.se</a></p>
          <p><a target='blank' href="https://linkedin.com/in/ragnargulin">LinkedIn</a></p>
          <p><a target='blank' href="https://github.com/ragnargulin">GitHub</a></p>
        </ContactInfo>
    </FooterContainer>
  )
}
