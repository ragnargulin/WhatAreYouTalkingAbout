// src/services/countryService.ts
import { COUNTRY_SUBREDDITS } from './redditCountries'
import type { SubredditInfo } from './redditCountries'

export function getFilteredCountries(selectedRegion: string) {
  const countries = Object.values(COUNTRY_SUBREDDITS)
  if (selectedRegion === 'all') {
    return countries
  }
  return countries.filter(country => 
    country.region.toLowerCase() === selectedRegion.toLowerCase()
  )
}

export function getRandomCountries(countries: SubredditInfo[], count: number) {
  const shuffled = [...countries].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}