// src/components/NewsFeed.tsx
import { useState, useEffect, useCallback } from 'react' 
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { COUNTRY_SUBREDDITS } from '../services/redditCountries'
import { fetchSubredditPosts, RedditPost } from '../services/redditApi'
import ArticleCard from './ArticleCard/ArticleCard'
import { translateText } from '../services/translationService'

// Styled components
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

const FilterBar = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const RegionSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`

const SortSelect = styled(RegionSelect)``

const TranslateToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`

interface FilterOptions {
    region?: string
    sort: 'latest' | 'top'
    translate: boolean
  }
  
  interface Article extends RedditPost {
    countryCode: string
    countryName: string
  }
  
  export default function NewsFeed() {
    const navigate = useNavigate()
    const { region } = useParams()
    const [searchParams] = useSearchParams()
    
    const [articles, setArticles] = useState<Article[]>([])
    const [originalArticles, setOriginalArticles] = useState<Article[]>([]) 
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
      region: region || 'all',
      sort: (searchParams.get('sort') as 'latest' | 'top') || 'latest',
      translate: searchParams.get('translate') === 'true'
    })
  
    // Function to get countries based on selected region
    const getFilteredCountries = (selectedRegion: string) => {
      const countries = Object.values(COUNTRY_SUBREDDITS)
      if (selectedRegion === 'all') {
        return countries
      }
      return countries.filter(country => 
        country.region.toLowerCase() === selectedRegion.toLowerCase()
      )
    }
  
    // Function to get random countries from filtered list
    const getRandomCountries = (countries: typeof COUNTRY_SUBREDDITS[keyof typeof COUNTRY_SUBREDDITS][], count: number) => {
      const shuffled = [...countries].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
    }
  
    // Fetch posts when filters change
    const fetchPosts = useCallback(async () => {
        setIsLoading(true)
        setError(null)
    
        try {
          const filteredCountries = getFilteredCountries(filterOptions.region || 'all')
          const selectedCountries = getRandomCountries(filteredCountries, 3)
    
          const allPostsPromises = selectedCountries.map(async country => {
            const posts = await fetchSubredditPosts(country.subreddit)
            return posts.map(post => ({
              ...post,
              countryCode: country.code,
              countryName: country.name
            }))
          })
    
          const allPosts = await Promise.all(allPostsPromises)
          let flattenedPosts = allPosts.flat()
    
          if (filterOptions.sort === 'top') {
            flattenedPosts = flattenedPosts.sort((a, b) => b.score - a.score)
          } else {
            flattenedPosts = flattenedPosts.sort((a, b) => b.created_utc - a.created_utc)
          }
    
          setOriginalArticles(flattenedPosts)
          setArticles(flattenedPosts)
        } catch (error) {
          setError(`Failed to load posts: ${error instanceof Error ? error.message : 'Unknown error'}`)
          console.error('Error loading posts:', error)
        } finally {
          setIsLoading(false)
        }
      }, [filterOptions.sort, filterOptions.region]) // Add dependencies
    
      // Wrap translateArticles in useCallback
      const translateArticles = useCallback(async (articlesToTranslate: Article[]) => {
        setIsLoading(true)
        try {
          const translatedArticles = await Promise.all(
            articlesToTranslate.map(async article => {
              if (!filterOptions.translate) {
                return article
              }
              
              const translatedTitle = await translateText(article.title)
              const translatedContent = article.selftext 
                ? await translateText(article.selftext)
                : article.selftext
    
              return {
                ...article,
                title: translatedTitle,
                selftext: translatedContent,
                isTranslated: true
              }
            })
          )
          setArticles(translatedArticles)
        } catch (error) {
          setError('Translation failed')
          console.error('Translation error:', error)
        } finally {
          setIsLoading(false)
        }
      }, [filterOptions.translate]) // Add dependency
    
      // Effect for fetching posts
      useEffect(() => {
        if (filterOptions.region || filterOptions.sort) {
          fetchPosts()
        }
      }, [filterOptions.region, filterOptions.sort, fetchPosts]) // Add fetchPosts
    
      // Effect for translation
      useEffect(() => {
        if (originalArticles.length > 0) {
          if (filterOptions.translate) {
            translateArticles(originalArticles)
          } else {
            setArticles(originalArticles)
          }
        }
      }, [filterOptions.translate, originalArticles, translateArticles]) // Add missing dependencies
    
    const handleFilterChange = (newOptions: Partial<FilterOptions>) => {
      const updatedOptions = { ...filterOptions, ...newOptions }
      setFilterOptions(updatedOptions)
  
      // Update URL
      const params = new URLSearchParams()
      if (updatedOptions.sort) params.set('sort', updatedOptions.sort)
      if (updatedOptions.translate) params.set('translate', 'true')
  
      navigate(
        updatedOptions.region === 'all' 
          ? `/?${params}`
          : `/region/${updatedOptions.region}?${params}`
      )
    }
  
    return (
      <FeedContainer>
        <Header>Global Reddit Feed</Header>
        
        <FilterBar>
          <RegionSelect 
            value={filterOptions.region} 
            onChange={(e) => handleFilterChange({ region: e.target.value })}
          >
            <option value="all">All Regions</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="americas">Americas</option>
            <option value="africa">Africa</option>
            <option value="oceania">Oceania</option>
          </RegionSelect>
  
          <SortSelect 
            value={filterOptions.sort}
            onChange={(e) => handleFilterChange({ 
              sort: e.target.value as 'latest' | 'top' 
            })}
          >
            <option value="latest">Latest</option>
            <option value="top">Top</option>
          </SortSelect>
  
          <TranslateToggle>
            <input
              type="checkbox"
              checked={filterOptions.translate}
              onChange={(e) => handleFilterChange({ 
                translate: e.target.checked 
              })}
            />
            Translate to English
          </TranslateToggle>
        </FilterBar>
  
        {isLoading && <div>Loading posts...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        
        {!isLoading && !error && articles.map((article) => (
  <ArticleCard
    key={article.url}
    countryCode={article.countryCode}
    title={`[${article.countryName}] ${article.title}`}
    content={article.selftext || 'Click to view on Reddit'}
    url={article.url}
  />
))}
      </FeedContainer>
    )
  }