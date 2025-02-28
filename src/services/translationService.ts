// src/services/translationService.ts
import { CacheService } from './cacheService'

interface TranslationResult {
  text: string;
  needsTranslation: boolean;
}

function isEnglishText(text: string): boolean {
  const englishRegex = /^[a-zA-Z0-9\s.,!?'"()-]+$/;
  const commonEnglishWords = ['the', 'a', 'an', 'in', 'on', 'at', 'and', 'or', 'for', 'to', 'of'];
  const words = text.toLowerCase().split(' ');
  
  const hasCommonEnglishWords = commonEnglishWords.some(word => 
    words.includes(word)
  );
  
  return englishRegex.test(text) && hasCommonEnglishWords;
}

function calculateTextDifference(original: string, translated: string): number {
  const normalizedOriginal = original.toLowerCase().replace(/\s+/g, ' ').trim();
  const normalizedTranslated = translated.toLowerCase().replace(/\s+/g, ' ').trim();

  if (normalizedOriginal === normalizedTranslated) return 0;

  let differences = 0;
  const length = Math.max(normalizedOriginal.length, normalizedTranslated.length);
  
  for (let i = 0; i < length; i++) {
    if (normalizedOriginal[i] !== normalizedTranslated[i]) {
      differences++;
    }
  }

  return differences / length;
}

export async function translateText(text: string): Promise<TranslationResult> {
  // If it's clearly English, return original text
  if (isEnglishText(text)) {
    return {
      text: text,
      needsTranslation: false
    };
  }

  const cacheKey = text.slice(0, 100)
  const cachedTranslation = CacheService.get<TranslationResult>(cacheKey, 'translation')
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
      
      // Calculate difference percentage
      const diffPercentage = calculateTextDifference(text, translatedText);
      const needsTranslation = diffPercentage > 0.1; // 10% threshold

      const result: TranslationResult = {
        text: translatedText,
        needsTranslation
      };

      CacheService.set(cacheKey, result, 'translation')
      return result
    }

    throw new Error("Unexpected response format")
  } catch (error) {
    console.error("Translation error:", error)
    return {
      text: text,
      needsTranslation: false
    }
  }
}