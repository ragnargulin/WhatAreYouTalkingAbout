// src/services/cacheService.ts
interface CacheItem<T> {
    data: T
    timestamp: number
  }
  
  const CACHE_DURATION = 1000 * 60 * 60 // 1 hour
  const MAX_CACHE_ITEMS = 100 // Limit total cached items
  
  export class CacheService {
    private static cleanOldCache() {
      try {
        const now = Date.now()
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('reddit_') || key.startsWith('translation_')) {
            const item = JSON.parse(localStorage.getItem(key) || '')
            if (now - item.timestamp > CACHE_DURATION) {
              localStorage.removeItem(key)
            }
          }
        })
  
        // If we have too many items, remove the oldest ones
        const cacheKeys = Object.keys(localStorage)
          .filter(key => key.startsWith('reddit_') || key.startsWith('translation_'))
          .sort((a, b) => {
            const aTime = JSON.parse(localStorage.getItem(a) || '').timestamp
            const bTime = JSON.parse(localStorage.getItem(b) || '').timestamp
            return aTime - bTime
          })
  
        while (cacheKeys.length > MAX_CACHE_ITEMS) {
          localStorage.removeItem(cacheKeys.shift()!)
        }
      } catch (error) {
        console.error('Error cleaning cache:', error)
      }
    }
  
    static set<T>(key: string, data: T, prefix: 'reddit' | 'translation') {
      try {
        this.cleanOldCache()
        const cacheItem: CacheItem<T> = {
          data,
          timestamp: Date.now()
        }
        localStorage.setItem(`${prefix}_${key}`, JSON.stringify(cacheItem))
      } catch (error) {
        console.error('Error setting cache:', error)
      }
    }
  
    static get<T>(key: string, prefix: 'reddit' | 'translation'): T | null {
      try {
        const item = localStorage.getItem(`${prefix}_${key}`)
        if (!item) return null
  
        const cacheItem: CacheItem<T> = JSON.parse(item)
        
        // Check if cache is still valid
        if (Date.now() - cacheItem.timestamp > CACHE_DURATION) {
          localStorage.removeItem(`${prefix}_${key}`)
          return null
        }
  
        return cacheItem.data
      } catch (error) {
        console.error('Error getting cache:', error)
        return null
      }
    }
  
    // Add the remove method
    static remove(key: string) {
      try {
        localStorage.removeItem(key)
      } catch (error) {
        console.error('Error removing from cache:', error)
      }
    }
  }