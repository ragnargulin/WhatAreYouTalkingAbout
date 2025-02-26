// src/components/NewsFeed.tsx
import { useState, useEffect, useCallback } from 'react' 
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { COUNTRY_SUBREDDITS } from '../services/redditCountries'
import { fetchSubredditPosts, RedditPost } from '../services/redditApi'
import { translateText } from '../services/translationService'
import { FilterBar } from './FilterBar'
import { ArticleList } from './ArticleList'
import { CacheService } from '../services/cacheService'

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

interface FilterOptions {
  region?: string
  sort: 'latest' | 'top'
  translate: boolean
}

interface Article extends RedditPost {
  countryCode: string
  countryName: string
  isTranslated?: boolean
}

const CACHED_ARTICLES_KEY = 'articles'
const CACHED_ORIGINAL_ARTICLES_KEY = 'original_articles'

export default function NewsFeed() {
  const navigate = useNavigate()
  const { region } = useParams()
  const [searchParams] = useSearchParams()
  
  // Initialize state with cached data
  const [articles, setArticles] = useState<Article[]>(() => {
    const cached = CacheService.get<Article[]>(CACHED_ARTICLES_KEY, 'reddit')
    return cached || []
  })

  const [originalArticles, setOriginalArticles] = useState<Article[]>(() => {
    const cached = CacheService.get<Article[]>(CACHED_ORIGINAL_ARTICLES_KEY, 'reddit')
    return cached || []
  })

  const [isLoading, setIsLoading] = useState(articles.length === 0)
  const [error, setError] = useState<string | null>(null)
  
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    region: region || 'all',
    sort: (searchParams.get('sort') as 'latest' | 'top') || 'latest',
    translate: searchParams.get('translate') === 'true'
  })

  const getFilteredCountries = (selectedRegion: string) => {
    const countries = Object.values(COUNTRY_SUBREDDITS)
    if (selectedRegion === 'all') {
      return countries
    }
    return countries.filter(country => 
      country.region.toLowerCase() === selectedRegion.toLowerCase()
    )
  }

  const getRandomCountries = (countries: typeof COUNTRY_SUBREDDITS[keyof typeof COUNTRY_SUBREDDITS][], count: number) => {
    const shuffled = [...countries].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const fetchPosts = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const filteredCountries = getFilteredCountries(filterOptions.region || 'all')
      const selectedCountries = getRandomCountries(filteredCountries, 15)

      const allPostsPromises = selectedCountries.map(async country => {
        const posts = await fetchSubredditPosts(country.subreddit)
        return posts.slice(0, 1).map(post => ({
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

      // Cache the results
      CacheService.set(CACHED_ORIGINAL_ARTICLES_KEY, flattenedPosts, 'reddit')
      setOriginalArticles(flattenedPosts)

      if (filterOptions.translate) {
        const translatedPosts = await Promise.all(
          flattenedPosts.map(async post => {
            const translatedTitle = await translateText(post.title)
            const translatedContent = post.selftext 
              ? await translateText(post.selftext)
              : post.selftext
      
            // Ensure boolean comparison
            const titleChanged = translatedTitle !== post.title
            const contentChanged = post.selftext ? translatedContent !== post.selftext : false
      
            return {
              ...post,
              title: translatedTitle,
              selftext: translatedContent,
              isTranslated: titleChanged || contentChanged
            }
          })
        )
        CacheService.set(CACHED_ARTICLES_KEY, translatedPosts, 'reddit')
        setArticles(translatedPosts)
      }
       else {
        CacheService.set(CACHED_ARTICLES_KEY, flattenedPosts, 'reddit')
        setArticles(flattenedPosts)
      }
    } catch (error) {
      setError(`Failed to load posts: ${error instanceof Error ? error.message : 'Unknown error'}`)
      console.error('Error loading posts:', error)
    } finally {
      setIsLoading(false)
    }
  }, [filterOptions.sort, filterOptions.region, filterOptions.translate])

  const handleFilterChange = useCallback((newOptions: Partial<FilterOptions>) => {
    const updatedOptions = { ...filterOptions, ...newOptions }
    
    // Define translateArticles inside handleFilterChange
    const translateArticles = async (articlesToTranslate: Article[]): Promise<Article[]> => {
      try {
        return await Promise.all(
          articlesToTranslate.map(async article => {
            const translatedTitle = await translateText(article.title)
            const translatedContent = article.selftext 
              ? await translateText(article.selftext)
              : article.selftext
  
            const titleChanged = translatedTitle !== article.title
            const contentChanged = article.selftext ? translatedContent !== article.selftext : false
  
            return {
              ...article,
              title: translatedTitle,
              selftext: translatedContent,
              isTranslated: titleChanged || contentChanged
            }
          })
        )
      } catch (error) {
        console.error('Translation error:', error)
        throw error
      }
    }
    
    // If only translation is being toggled, handle it separately
    if (Object.keys(newOptions).length === 1 && 'translate' in newOptions) {
      setIsLoading(true)
      if (newOptions.translate) {
        translateArticles(originalArticles).then(translatedPosts => {
          CacheService.set(CACHED_ARTICLES_KEY, translatedPosts, 'reddit')
          setArticles(translatedPosts)
          setIsLoading(false)
        })
      } else {
        setArticles(originalArticles)
        CacheService.set(CACHED_ARTICLES_KEY, originalArticles, 'reddit')
        setIsLoading(false)
      }
    } else if ('region' in newOptions || 'sort' in newOptions) {
      // Clear cache and fetch new posts for region or sort changes
      CacheService.remove(`reddit_${CACHED_ARTICLES_KEY}`)
      CacheService.remove(`reddit_${CACHED_ORIGINAL_ARTICLES_KEY}`)
      setArticles([])
      setOriginalArticles([])
    }
    
    setFilterOptions(updatedOptions)
  
    const params = new URLSearchParams()
    if (updatedOptions.sort) params.set('sort', updatedOptions.sort)
    if (updatedOptions.translate) params.set('translate', 'true')
  
    navigate(
      updatedOptions.region === 'all' 
        ? `/?${params}`
        : `/region/${updatedOptions.region}?${params}`
    )
  }, [filterOptions, navigate, originalArticles])

  
  const handleRefresh = useCallback(() => {
    // Clear cache
    CacheService.remove(`reddit_${CACHED_ARTICLES_KEY}`)
    CacheService.remove(`reddit_${CACHED_ORIGINAL_ARTICLES_KEY}`)
    
    // Clear state
    setArticles([])
    setOriginalArticles([])
    
    // Fetch new posts
    fetchPosts()
  }, [fetchPosts])

  useEffect(() => {
    if (articles.length === 0) {
      fetchPosts()
    }
  }, [filterOptions.region, filterOptions.sort, fetchPosts, articles.length])

  return (
    <FeedContainer>
      <Header>Global Reddit Feed</Header>
      <FilterBar 
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />
      <ArticleList 
        articles={articles}
        isLoading={isLoading}
        error={error}
      />
    </FeedContainer>
  )
}