"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Play, Pause, Square, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { geminiAPI, type ProcessedEmergency } from "@/lib/gemini-api"

interface EmergencyCallRecorderProps {
  onEmergencyCreated: (emergency: ProcessedEmergency) => void
}

type RecordingState = 'idle' | 'recording' | 'transcribing' | 'processing' | 'completed' | 'error'

export function EmergencyCallRecorder({ onEmergencyCreated }: EmergencyCallRecorderProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle')
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [transcribedText, setTranscribedText] = useState<string>('')
  const [processedEmergency, setProcessedEmergency] = useState<ProcessedEmergency | null>(null)
  const [error, setError] = useState<string>('')

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const recognitionRef = useRef<any>(null)
  const fullTranscriptRef = useRef<string>('')

  // Real audio recording with Web Speech API for live transcription
  const startRecording = async () => {
    try {
      setRecordingState('recording')
      setError('')
      setTranscribedText('')
      
      // Check if browser supports Web Speech API
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        setError('Speech recognition not supported in this browser. Please use Chrome or Edge.')
        setRecordingState('error')
        return
      }

      // Initialize Web Speech API
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      // Reset transcript
      fullTranscriptRef.current = ''
      setTranscribedText('')

      recognition.onresult = (event: any) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' '
          } else {
            interimTranscript += transcript + ' '
          }
        }

        // Update full transcript
        fullTranscriptRef.current += finalTranscript
        setTranscribedText(fullTranscriptRef.current + interimTranscript)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        if (event.error === 'no-speech') {
          setError('No speech detected. Please try again.')
        } else if (event.error === 'audio-capture') {
          setError('No microphone found. Please check your microphone.')
        } else {
          setError('Speech recognition error occurred.')
        }
        setRecordingState('error')
      }

      recognition.onend = async () => {
        const finalText = fullTranscriptRef.current.trim()
        console.log('Final transcript:', finalText)
        
        if (finalText) {
          setRecordingState('processing')
          await processTranscription(finalText)
        } else {
          setError('No speech detected. Please try again.')
          setRecordingState('error')
        }
      }

      // Store reference to stop it later
      recognitionRef.current = recognition
      recognition.start()
      
    } catch (err) {
      console.error('Recording error:', err)
      setError('Failed to start recording. Please try again.')
      setRecordingState('error')
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const processTranscription = async (text: string) => {
    try {
      console.log('Processing transcription with Gemini:', text)
      
      // Check if we have text to process
      if (!text || text.trim().length === 0) {
        setError('No transcript text to process')
        setRecordingState('error')
        return
      }
      
      // Process the transcribed text to extract emergency information
      setRecordingState('processing')
      
      try {
        const processed = await geminiAPI.processEmergencyCall(text)
        console.log('Gemini processing result:', processed)
        
        setProcessedEmergency(processed)
        setRecordingState('completed')
        
        // Auto-create the emergency after a short delay
        setTimeout(() => {
          onEmergencyCreated(processed)
          resetRecorder()
        }, 2000)
        
      } catch (geminiError: any) {
        console.error('Gemini API error:', geminiError)
        
        // If Gemini fails, create a basic emergency from the transcript
        const fallbackEmergency = {
          title: `Emergency Call - ${new Date().toLocaleTimeString()}`,
          description: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
          urgencyLevel: 'moderate' as const,
          caseType: 'other' as const,
          location: {
            address: 'Location not specified'
          },
          patientCondition: 'Details not available',
          callerInfo: {
            name: 'Not provided',
            phone: 'Not provided'
          }
        }
        
        console.log('Using fallback emergency:', fallbackEmergency)
        setProcessedEmergency(fallbackEmergency)
        setRecordingState('completed')
        
        // Auto-create the emergency after a short delay
        setTimeout(() => {
          onEmergencyCreated(fallbackEmergency)
          resetRecorder()
        }, 2000)
      }
      
    } catch (err: any) {
      console.error('Processing error:', err)
      setError(`Failed to process: ${err?.message || err}`)
      setRecordingState('error')
    }
  }

  const resetRecorder = () => {
    setRecordingState('idle')
    setAudioBlob(null)
    setTranscribedText('')
    setProcessedEmergency(null)
    setError('')
    fullTranscriptRef.current = ''
  }

  const getStateIcon = () => {
    switch (recordingState) {
      case 'idle':
        return <Mic className="h-4 w-4" />
      case 'recording':
        return <Square className="h-4 w-4" />
      case 'transcribing':
        return <Loader2 className="h-4 w-4 animate-spin" />
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStateText = () => {
    switch (recordingState) {
      case 'idle':
        return 'Start Recording'
      case 'recording':
        return 'Recording...'
      case 'transcribing':
        return 'Transcribing...'
      case 'processing':
        return 'Processing...'
      case 'completed':
        return 'Emergency Created'
      case 'error':
        return 'Error Occurred'
    }
  }

  const getStateColor = () => {
    switch (recordingState) {
      case 'idle':
        return 'bg-blue-600 hover:bg-blue-700'
      case 'recording':
        return 'bg-red-600 hover:bg-red-700'
      case 'transcribing':
        return 'bg-yellow-600 hover:bg-yellow-700'
      case 'processing':
        return 'bg-orange-600 hover:bg-orange-700'
      case 'completed':
        return 'bg-green-600 hover:bg-green-700'
      case 'error':
        return 'bg-red-600 hover:bg-red-700'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Emergency Call Recording
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recording Controls */}
        <div className="flex items-center gap-4">
          <Button
            onClick={recordingState === 'idle' ? startRecording : stopRecording}
            disabled={recordingState === 'transcribing' || recordingState === 'processing'}
            className={`${getStateColor()} text-white`}
          >
            {getStateIcon()}
            <span className="ml-2">{getStateText()}</span>
          </Button>
          
          {recordingState === 'completed' && (
            <Button variant="outline" onClick={resetRecorder}>
              Record Another Call
            </Button>
          )}
          
          {recordingState === 'error' && (
            <Button variant="outline" onClick={resetRecorder}>
              Try Again
            </Button>
          )}
        </div>

        {/* Status Badge */}
        {recordingState !== 'idle' && (
          <div className="flex items-center gap-2">
            <Badge variant={recordingState === 'error' ? 'destructive' : 'secondary'}>
              {getStateText()}
            </Badge>
            {recordingState === 'recording' && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Recording in progress...
              </div>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Transcribed Text */}
        {transcribedText && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Transcribed Call:</h4>
            <div className="p-3 bg-gray-50 border rounded-md">
              <p className="text-sm text-gray-700">{transcribedText}</p>
            </div>
          </div>
        )}

        {/* Processed Emergency Information */}
        {processedEmergency && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Processed Emergency Information:</h4>
            <div className="p-4 bg-green-50 border border-green-200 rounded-md space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium text-green-800">{processedEmergency.title}</span>
              </div>
              <p className="text-sm text-green-700">{processedEmergency.description}</p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  {processedEmergency.urgencyLevel.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {processedEmergency.caseType}
                </Badge>
              </div>
              {processedEmergency.location && (
                <p className="text-xs text-green-600">
                  📍 {processedEmergency.location.address}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Demo Instructions */}
        {recordingState === 'idle' && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-700">
              <strong>Demo Mode:</strong> Click "Start Recording" to simulate an emergency call. 
              The system will automatically transcribe and process the call into structured emergency data.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
