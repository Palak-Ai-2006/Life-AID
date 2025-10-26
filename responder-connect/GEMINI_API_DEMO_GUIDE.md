# Gemini API Integration Demo Guide

## Overview
The LifeAID operator dashboard now includes an integrated Gemini API system for emergency call transcription and processing. This demo shows how AI can automatically transcribe incoming emergency calls and extract structured information for operators.

## Features Implemented

### 1. Emergency Call Recording Interface
- **Record Call Button**: Prominent button in the operator dashboard header
- **Visual States**: Recording, Transcribing, Processing, Completed, Error
- **Demo Mode**: Simulates real audio recording for demonstration purposes

### 2. Gemini API Integration
- **Audio Transcription**: Converts emergency call audio to text
- **Intelligent Processing**: Extracts structured emergency information
- **Mock Data Fallback**: Works without API key for demo purposes

### 3. Real-time Status Updates
- **Recording State**: Shows when call is being recorded
- **Transcribing State**: Displays "Transcribing..." with loading spinner
- **Processing State**: Shows "Processing..." while AI analyzes the call
- **Completed State**: Displays processed emergency information

## Demo Flow

### Step 1: Access Operator Dashboard
1. Navigate to `http://localhost:3002/operator/dashboard`
2. You'll see the operator dashboard with emergency calls
3. Notice the "Record Call" button in the header

### Step 2: Start Emergency Call Recording
1. Click the "Record Call" button
2. The interface will show:
   - Button changes to "Recording..." with red color
   - Status badge shows "Recording"
   - Red pulsing dot indicates active recording

### Step 3: Automatic Transcription
1. After 3 seconds, the system automatically moves to "Transcribing..." state
   - Button shows loading spinner
   - Status badge shows "Transcribing..."
   - Mock transcription appears in the interface

### Step 4: AI Processing
1. The system then moves to "Processing..." state
   - Button shows loading spinner
   - Status badge shows "Processing..."
   - AI analyzes the transcribed text

### Step 5: Emergency Information Display
1. After processing, the system shows:
   - **Transcribed Call**: The raw transcription text
   - **Processed Emergency Information**: Structured data including:
     - Emergency title
     - Detailed description
     - Urgency level (Critical/High/Moderate)
     - Case type (Cardiac/Trauma/Respiratory/Other)
     - Location information
     - Patient condition details

### Step 6: Automatic Emergency Creation
1. The processed emergency is automatically added to the dashboard
2. The new emergency appears in the "Active Emergency Calls" section
3. The recording interface resets for the next call

## Technical Implementation

### Files Created/Modified

#### 1. `lib/gemini-api.ts`
- Gemini API service for transcription and processing
- Handles audio-to-text conversion
- Extracts structured emergency information
- Includes mock data for demo mode

#### 2. `components/emergency-call-recorder.tsx`
- React component for call recording interface
- Manages recording states and UI updates
- Handles the complete transcription workflow

#### 3. `app/operator/dashboard/page.tsx`
- Updated operator dashboard
- Added "Record Call" button
- Integrated emergency call recorder
- Handles new emergency creation

#### 4. `lib/config.ts`
- Configuration management
- Demo mode settings
- API key handling

### API Integration Details

#### Transcription Process
```typescript
// Audio is converted to base64 and sent to Gemini API
const response = await fetch(`${baseUrl}/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
  method: 'POST',
  body: JSON.stringify({
    contents: [{
      parts: [{
        text: "Please transcribe this audio recording of an emergency call."
      }, {
        inlineData: {
          mimeType: 'audio/wav',
          data: base64Audio
        }
      }]
    }]
  })
})
```

#### Information Extraction
```typescript
// AI processes transcribed text to extract structured data
const prompt = `
  Analyze this emergency call transcription and extract structured information.
  Return JSON with: title, description, urgencyLevel, caseType, location, 
  patientCondition, callerInfo
`
```

## Demo Scenarios

### Scenario 1: Cardiac Emergency
- **Call**: "Hello, this is an emergency! I'm calling about a man who collapsed on the street. He's not breathing and someone is doing CPR. We're at 1234 Main Street downtown. Please send help immediately!"
- **AI Output**: 
  - Title: "Cardiac Arrest - Downtown"
  - Urgency: Critical
  - Type: Cardiac
  - Location: 1234 Main Street, Downtown District

### Scenario 2: Motor Vehicle Accident
- **Call**: "There's been a terrible car accident at the intersection. Multiple people are injured, one is trapped in their car. We need help right away!"
- **AI Output**:
  - Title: "Motor Vehicle Accident"
  - Urgency: Critical
  - Type: Trauma
  - Location: Intersection (if mentioned)

### Scenario 3: Medical Emergency
- **Call**: "My neighbor is having trouble breathing. She's an elderly woman and can't speak properly. She's pointing to her chest and seems very distressed."
- **AI Output**:
  - Title: "Respiratory Emergency"
  - Urgency: High
  - Type: Respiratory
  - Patient Condition: Breathing difficulty

## Configuration

### Environment Variables
```bash
# Optional: Set your Gemini API key for real transcription
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### Demo Mode
- When no API key is provided, the system uses mock data
- All transcription and processing is simulated
- Perfect for demonstrations and testing

## Benefits for Hackathon Demo

1. **Visual Impact**: Clear progression through recording states
2. **AI Integration**: Shows real AI capabilities for emergency response
3. **Real-time Processing**: Demonstrates fast transcription and analysis
4. **Structured Data**: Shows how AI can extract actionable information
5. **Seamless Integration**: Fits naturally into existing operator workflow

## Future Enhancements

1. **Real Audio Recording**: Integrate with browser MediaRecorder API
2. **Multiple Languages**: Support for non-English emergency calls
3. **Voice Recognition**: Identify caller demographics and emotional state
4. **Priority Scoring**: AI-based emergency priority assessment
5. **Location Extraction**: Automatic address parsing and geocoding

## Troubleshooting

### Common Issues
1. **Recording Not Starting**: Check browser permissions for microphone access
2. **Transcription Failing**: Verify Gemini API key is valid
3. **Processing Errors**: Check network connection and API limits

### Demo Tips
1. **Timing**: The demo takes about 8-10 seconds total
2. **Visual Cues**: Point out the status changes and loading states
3. **Data Quality**: Show how AI extracts structured information from natural speech
4. **Integration**: Demonstrate how it fits into the operator workflow

This integration showcases how AI can revolutionize emergency response by automatically processing and structuring incoming emergency calls, making it easier for operators to quickly understand and respond to emergencies.
