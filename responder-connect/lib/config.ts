// Configuration for the LifeAID application

export const config = {
  // Gemini API Configuration
  // Get your API key from: https://makersuite.google.com/app/apikey
  geminiApiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
  
  // Demo mode - when true, uses mock data instead of real API calls
  demoMode: !process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  
  // Application settings
  app: {
    name: 'LifeAID',
    description: 'Emergency Response Network',
    version: '1.0.0'
  }
}
