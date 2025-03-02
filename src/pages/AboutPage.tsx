// src/pages/AboutPage.tsx
import styled from 'styled-components'
import { COUNTRY_SUBREDDITS } from '../services/countryService'

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
`

const Section = styled.section`
  margin-bottom: 3rem;
`

const CountryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`

const CountryItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  
  a {
    color: #4CAF50;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const ContactButton = styled.a`
  display: inline-block;
  background: #4CAF50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 1rem;
  
  &:hover {
    background: #45a049;
  }
`

const Disclaimer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin: 2rem 0;
  font-style: italic;
`

export function AboutPage() {
  const countryList = Object.values(COUNTRY_SUBREDDITS)
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <AboutContainer>
      <Section>
        <h1>What is this?!</h1>
        <p>
          "what r u talking about?!" is a window into local discussions happening around the world. 
          Instead of relying on traditional news media, this platform taps into Reddit communities 
          from different countries, showing you what people are actually talking about in their local forums.
        </p>
        <p>
          Whether it's a heated political debate in France, a cultural celebration in South Korea, or 
          community concerns in Kenya, you get to see authentic conversations from local perspectives. 
          And with automatic translation available, language barriers won't stop you from understanding 
          what's being discussed.
        </p>
      </Section>
      <Section>
        <h1>Why This Matters</h1>
        <p>In today's interconnected world, we often find ourselves in echo chambers, primarily exposed to news and discussions from major Western countries. This platform aims to change that by providing a window into local discussions from communities around the globe.</p>
        <p>Making global discussions more accessible and translatable is important to:</p>
        <ul>
          <li>Promote cross-cultural understanding</li>
          <li>Give voice to underrepresented communities</li>
          <li>Challenge our preconceptions about different regions</li>
          <li>Create a more inclusive global dialogue</li>
        </ul>
      </Section>

      <Section>
        <h2>How It Works</h2>
        <p>This application aggregates posts from country-specific Reddit communities (subreddits), allowing you to:</p>
        <ul>
          <li>Browse posts from different regions of the world</li>
          <li>Sort by latest posts or popularity</li>
          <li>Translate content to English using Google Translate</li>
          <li>Explore discussions that might not make international headlines</li>
        </ul>
      </Section>

      <Disclaimer>
        <strong>Disclaimer:</strong> The content displayed on this site comes directly from Reddit communities. 
        I do not moderate, edit, or take responsibility for user-generated content. Please use your judgment 
        when interpreting discussions and verify important information through multiple sources.
      </Disclaimer>

      <Section>
        <h2>Included Communities</h2>
        <p>Currently, this site aggregate content from the following country-specific subreddits:</p>
        <CountryList>
          {countryList.map(country => (
            <CountryItem key={country.code}>
              <strong>{country.name}</strong><br />
              <a 
                href={`https://reddit.com/r/${country.subreddit}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                r/{country.subreddit}
              </a>
            </CountryItem>
          ))}
        </CountryList>
        <br></br>
        <p>Missing a country? Know a better subreddit for a specific country? Let me know!</p>
        <ContactButton 
          href="mailto:ragnarnilsgulin@gmail.com?subject=Subreddit%20Suggestion"
          target="_blank"
          rel="noopener noreferrer"
        >
          Suggest a Community
        </ContactButton>
      </Section>
    </AboutContainer>
  )
}

export default AboutPage