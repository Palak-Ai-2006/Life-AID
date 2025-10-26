// Gemini API service for emergency call transcription and processing
import { config } from './config'

export interface TranscriptionResult {
  text: string
  confidence: number
  language: string
}

export interface ProcessedEmergency {
  title: string
  description: string
  urgencyLevel: 'critical' | 'high' | 'moderate'
  caseType: 'cardiac' | 'trauma' | 'respiratory' | 'other'
  location?: {
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  patientCondition?: string
  callerInfo?: {
    name?: string
    phone?: string
  }
}

class GeminiAPIService {
  private apiKey: string
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta'

  constructor(apiKey?: string) {
    this.apiKey = apiKey || config.geminiApiKey
  }

  /**
   * Note: Audio transcription is now handled by Web Speech API in the browser
   * This method is kept for interface compatibility but is not used
   */
  async transcribeAudio(audioBlob: Blob): Promise<TranscriptionResult> {
    // This method is no longer used - transcription happens via Web Speech API
    console.log('Transcription handled by Web Speech API')
    return {
      text: '',
      confidence: 0,
      language: 'en'
    }
  }

  /**
   * Process transcribed text to extract emergency information
   */
  async processEmergencyCall(transcribedText: string): Promise<ProcessedEmergency> {
    console.log('ProcessEmergencyCall called with text:', transcribedText)
    
    if (!this.apiKey) {
      console.warn('No API key, using mock data')
      return this.getMockProcessedEmergency()
    }

    try {
      const prompt = `You are an emergency dispatch AI. Analyze this emergency call transcription and extract key information. 

Return ONLY valid JSON with these exact fields:
{
  "title": "Short emergency title (max 50 chars)",
  "description": "Detailed emergency description summarizing the situation",
  "urgencyLevel": "critical" or "high" or "moderate",
  "caseType": "cardiac" or "trauma" or "respiratory" or "other",
  "location": { "address": "extracted address or 'Location not specified'" },
  "patientCondition": "Patient condition description",
  "callerInfo": { "name": "name if mentioned", "phone": "phone if mentioned" }
}

Emergency call transcription: "${transcribedText}"

Important: Return ONLY the JSON object, no other text, no explanations, no markdown formatting.`

      console.log('Sending request to Gemini API...')
      
      // Use v1 API which supports gemini-pro model
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.1,
            topK: 1,
            topP: 1,
            maxOutputTokens: 1024,
          }
        })
      })

      console.log('Gemini API response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Gemini API error response:', errorText)
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}. Response: ${errorText}`)
      }

      const data = await response.json()
      console.log('Gemini processing response:', data)
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No candidates returned from Gemini API')
      }
      
      const jsonText = data.candidates[0]?.content?.parts?.[0]?.text || '{}'
      console.log('Extracted JSON text from Gemini:', jsonText)
      
      try {
        // Clean the JSON text
        let cleanedJson = jsonText.trim()
        
        // Remove any markdown code blocks
        cleanedJson = cleanedJson.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        
        // Remove any leading/trailing text that's not JSON
        const jsonStart = cleanedJson.indexOf('{')
        const jsonEnd = cleanedJson.lastIndexOf('}')
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
          cleanedJson = cleanedJson.substring(jsonStart, jsonEnd + 1)
        }
        
        console.log('Cleaned JSON text:', cleanedJson)
        
        const parsed = JSON.parse(cleanedJson)
        console.log('Successfully parsed Gemini response:', parsed)
        
        // Validate required fields
        if (!parsed.title || !parsed.description || !parsed.urgencyLevel || !parsed.caseType) {
          throw new Error('Missing required fields in Gemini response')
        }
        
        return parsed
      } catch (parseError) {
        console.error('Failed to parse Gemini response:', parseError)
        console.error('Original JSON text:', jsonText)
        
        // Try to create a fallback response from the raw text
        return this.createFallbackResponse(transcribedText)
      }
    } catch (error) {
      console.error('Processing error:', error)
      throw error
    }
  }

  /**
   * Create a fallback response when JSON parsing fails
   */
  private createFallbackResponse(transcribedText: string): ProcessedEmergency {
    console.log('Creating fallback response for:', transcribedText)
    
    // Simple keyword-based analysis
    const text = transcribedText.toLowerCase()
    
    let urgencyLevel: 'critical' | 'high' | 'moderate' = 'moderate'
    if (text.includes('emergency') || text.includes('urgent') || text.includes('critical') || text.includes('help')) {
      urgencyLevel = 'critical'
    } else if (text.includes('accident') || text.includes('injury') || text.includes('pain')) {
      urgencyLevel = 'high'
    }
    
    let caseType: 'cardiac' | 'trauma' | 'respiratory' | 'other' = 'other'
    if (text.includes('heart') || text.includes('cardiac') || text.includes('chest pain')) {
      caseType = 'cardiac'
    } else if (text.includes('accident') || text.includes('crash') || text.includes('injury')) {
      caseType = 'trauma'
    } else if (text.includes('breathing') || text.includes('asthma') || text.includes('respiratory')) {
      caseType = 'respiratory'
    }
    
    return {
      title: `Emergency Call - ${caseType.charAt(0).toUpperCase() + caseType.slice(1)}`,
      description: transcribedText.substring(0, 200) + (transcribedText.length > 200 ? '...' : ''),
      urgencyLevel,
      caseType,
      location: {
        address: 'Location not specified'
      },
      patientCondition: 'Condition details not available',
      callerInfo: {
        name: 'Not provided',
        phone: 'Not provided'
      }
    }
  }

  /**
   * Convert blob to base64 string
   */
  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        // Remove data URL prefix
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  /**
   * Get mock processed emergency for demo purposes
   */
  private getMockProcessedEmergency(): ProcessedEmergency {
    const mockEmergencies = [
      {
        title: "Cardiac Arrest - Downtown",
        description: "Male patient, 58 years old, experiencing chest pain and difficulty breathing. Bystander performing CPR. Patient unconscious, possible myocardial infarction.",
        urgencyLevel: "critical" as const,
        caseType: "cardiac" as const,
        location: {
          address: "1234 Main Street, Downtown District"
        },
        patientCondition: "Patient unconscious, CPR in progress. Possible myocardial infarction.",
        callerInfo: {
          name: "Sarah Johnson",
          phone: "+1 (555) 123-4567"
        }
      },
      {
        title: "Motor Vehicle Accident",
        description: "Two-car collision at intersection. Three patients with visible injuries, one trapped in vehicle. Multiple trauma patients, one with suspected spinal injury.",
        urgencyLevel: "critical" as const,
        caseType: "trauma" as const,
        location: {
          address: "Oak Avenue & 5th Street Intersection"
        },
        patientCondition: "Multiple trauma patients, one with suspected spinal injury.",
        callerInfo: {
          name: "Mike Rodriguez",
          phone: "+1 (555) 234-5678"
        }
      },
      {
        title: "Severe Asthma Attack",
        description: "Female patient, 34 years old, experiencing severe breathing difficulty. Unable to speak full sentences. Acute respiratory distress, patient conscious but struggling to breathe.",
        urgencyLevel: "high" as const,
        caseType: "respiratory" as const,
        location: {
          address: "789 Elm Street, Residential Area"
        },
        patientCondition: "Acute respiratory distress, patient conscious but struggling to breathe.",
        callerInfo: {
          name: "Jennifer Lee",
          phone: "+1 (555) 345-6789"
        }
      }
    ]

    return mockEmergencies[Math.floor(Math.random() * mockEmergencies.length)]
  }
}

export const geminiAPI = new GeminiAPIService()
