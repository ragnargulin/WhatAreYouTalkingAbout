// src/services/translationService.ts
export async function translateText(text: string, targetLang: string = 'en'): Promise<string> {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      const data = await response.json()
      
      // Extract translated text from Google's response format
      if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
        return data[0].map(sentence => sentence[0]).join(" ")
      }
  
      throw new Error("Unexpected response format")
    } catch (error) {
      console.error("Translation error:", error)
      return text // Return original text if translation fails
    }
  }