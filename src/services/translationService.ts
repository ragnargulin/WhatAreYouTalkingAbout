// src/services/translationService.ts
import { CacheService } from './cacheService'

export async function translateText(text: string): Promise<string> {
  const cacheKey = text.slice(0, 100)
  
  // Check cache first
  const cachedTranslation = CacheService.get<string>(cacheKey, 'translation')
  if (cachedTranslation) {
    return cachedTranslation
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    
    if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
      const translatedText = data[0].map(sentence => sentence[0]).join(" ")
      
      // Cache the translation
      CacheService.set(cacheKey, translatedText, 'translation')
      
      return translatedText
    }

    throw new Error("Unexpected response format")
  } catch (error) {
    console.error("Translation error:", error)
    return text
  }
}