// src/services/cacheService.ts
export class CacheService {
    static set<T>(key: string, data: T, prefix: 'reddit' | 'translation') {
      try {
        sessionStorage.setItem(`${prefix}_${key}`, JSON.stringify(data))
      } catch (error) {
        console.error('Error setting cache:', error)
      }
    }
  
    static get<T>(key: string, prefix: 'reddit' | 'translation'): T | null {
      try {
        const item = sessionStorage.getItem(`${prefix}_${key}`)
        if (!item) return null
        return JSON.parse(item)
      } catch (error) {
        console.error('Error getting cache:', error)
        return null
      }
    }
  
    static remove(key: string) {
      try {
        sessionStorage.removeItem(key)
      } catch (error) {
        console.error('Error removing from cache:', error)
      }
    }
  }