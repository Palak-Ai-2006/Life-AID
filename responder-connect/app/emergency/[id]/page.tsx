"use client"

import { notFound, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { mockEmergencyRequests } from "@/lib/mock-data"

console.log('Mock emergency requests:', mockEmergencyRequests)
import { EmergencyDetailHeader } from "@/components/emergency-detail-header"
import { EmergencyDetailInfo } from "@/components/emergency-detail-info"
import { EmergencyMap } from "@/components/emergency-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, CheckCircle } from "lucide-react"
import type { EmergencyRequest } from "@/lib/types"

function AcceptCallButton({ emergency, preAccepted }: { emergency: EmergencyRequest, preAccepted?: boolean }) {
  const [accepted, setAccepted] = useState(preAccepted || false)

  const handleAccept = () => {
    setAccepted(true)
    // In a real app, this would send a notification to dispatch
    alert(`You've accepted the call to: ${emergency.location.address}. Navigation is now active!`)
  }

  if (accepted) {
    return (
      <Button className="w-full bg-green-600 hover:bg-green-700 text-white" disabled>
        <CheckCircle className="size-4 mr-2" />
        Call Accepted
      </Button>
    )
  }

  return (
    <Button 
      className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
      onClick={handleAccept}
    >
      <CheckCircle className="size-4 mr-2" />
      Accept Call
    </Button>
  )
}

interface EmergencyDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EmergencyDetailPage({ params }: EmergencyDetailPageProps) {
  const searchParams = useSearchParams()
  const [acceptedFromCard, setAcceptedFromCard] = useState(false)
  const [emergency, setEmergency] = useState<EmergencyRequest | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user came from accepting the call
    const isAccepted = searchParams.get("accepted") === "true"
    if (isAccepted) {
      setAcceptedFromCard(true)
    }
  }, [searchParams])

  useEffect(() => {
    const loadEmergency = async () => {
      try {
        const resolvedParams = await params
        const foundEmergency = mockEmergencyRequests.find((req) => req.id === resolvedParams.id)
        setEmergency(foundEmergency || null)
        setLoading(false)
      } catch (error) {
        console.error('Error loading emergency:', error)
        setEmergency(null)
        setLoading(false)
      }
    }
    
    loadEmergency()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading emergency details...</p>
        </div>
      </div>
    )
  }

  if (!emergency) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Emergency Not Found</h1>
          <p className="text-muted-foreground mb-4">The emergency could not be found.</p>
          <p className="text-sm text-muted-foreground mb-6">Available emergency IDs: {mockEmergencyRequests.map(e => e.id).join(', ')}</p>
          <a href="/dashboard" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
            Return to Dashboard
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <EmergencyDetailHeader emergency={emergency} />

      <main className="container mx-auto px-4 py-6 max-w-6xl space-y-6">
        {/* Accepted Call Banner */}
        {acceptedFromCard && (
          <Card className="bg-green-50 border-green-200 border-2">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="size-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-semibold text-green-900">Call Accepted!</p>
                  <p className="text-sm text-green-700">
                    You're now en route to the emergency. See the map below for your route.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Map Section */}
        <EmergencyMap emergency={emergency} />

        {/* Emergency Details */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <EmergencyDetailInfo emergency={emergency} />
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <AcceptCallButton emergency={emergency} preAccepted={acceptedFromCard} />
                <Button className="w-full bg-emergency hover:bg-emergency/90 text-white">
                  <Phone className="size-4" />
                  Call 911
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageSquare className="size-4" />
                  Contact Dispatch
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Response Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-sm font-medium">Awaiting Response</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Responders Nearby</p>
                  <p className="text-sm font-medium">3 available</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <p className="text-sm font-medium capitalize">{emergency.urgencyLevel}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
