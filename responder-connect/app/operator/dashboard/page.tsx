"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/auth"
import { Navigation } from "@/components/layout/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Phone, AlertCircle, Users, Clock, CheckCircle, Mic } from "lucide-react"
import { mockEmergencyRequests } from "@/lib/mock-data"
import { EmergencyCallRecorder } from "@/components/emergency-call-recorder"
import type { ProcessedEmergency } from "@/lib/gemini-api"

export default function OperatorDashboard() {
  const router = useRouter()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showCallRecorder, setShowCallRecorder] = useState(false)
  const [emergencies, setEmergencies] = useState(mockEmergencyRequests)

  useEffect(() => {
    // Check authentication
    if (!auth.isAuthenticated()) {
      router.push("/")
      return
    }

    const user = auth.getCurrentUser()
    if (user?.role !== "operator") {
      router.push("/dashboard")
      return
    }
  }, [router])

  const handleEmergencyCreated = (emergency: ProcessedEmergency) => {
    // Convert ProcessedEmergency to EmergencyRequest format
    const newEmergency = {
      id: Date.now().toString(),
      title: emergency.title,
      description: emergency.description,
      patientCondition: emergency.patientCondition || emergency.description,
      location: emergency.location || {
        address: "Location not specified",
        coordinates: { lat: 0, lng: 0 }
      },
      distance: Math.random() * 5 + 0.5, // Random distance for demo
      estimatedArrival: Math.floor(Math.random() * 10) + 3, // Random ETA
      urgencyLevel: emergency.urgencyLevel,
      caseType: emergency.caseType,
      timestamp: new Date(),
      expiresIn: emergency.urgencyLevel === 'critical' ? 60 : 0
    }
    
    setEmergencies(prev => [newEmergency, ...prev])
    setShowCallRecorder(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Operator Dashboard</h1>
              <p className="text-sm text-muted-foreground">Dispatch and manage emergency calls</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowCallRecorder(!showCallRecorder)}>
                <Mic className="h-4 w-4 mr-2" />
                Record Call
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(!showCreateForm)}>
                <Plus className="h-4 w-4 mr-2" />
                Manual Entry
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Calls</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{emergencies.length}</div>
              <p className="text-xs text-muted-foreground">Current emergencies</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {emergencies.filter((e) => e.urgencyLevel === "critical").length}
              </div>
              <p className="text-xs text-muted-foreground">Urgent cases</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Responders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6.5m</div>
              <p className="text-xs text-muted-foreground">Response time</p>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Call Recorder */}
        {showCallRecorder && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Incoming Emergency Call</CardTitle>
            </CardHeader>
            <CardContent>
              <EmergencyCallRecorder onEmergencyCreated={handleEmergencyCreated} />
            </CardContent>
          </Card>
        )}

        {/* Create Emergency Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Emergency Call</CardTitle>
              <CardDescription>Add a new emergency request to dispatch responders</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="callerName">Caller Name</Label>
                    <Input id="callerName" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="callerPhone">Phone Number</Label>
                    <Input id="callerPhone" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St, City, State" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caseType">Case Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select case type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiac">Cardiac</SelectItem>
                        <SelectItem value="trauma">Trauma</SelectItem>
                        <SelectItem value="respiratory">Respiratory</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the emergency situation..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Create Emergency Call
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Active Emergencies */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Emergency Calls</h2>
          </div>

          <div className="grid gap-4">
            {emergencies.map((emergency) => (
              <Card key={emergency.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        {emergency.title}
                      </CardTitle>
                      <CardDescription>
                        {emergency.location.address}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-sm font-semibold ${
                          emergency.urgencyLevel === "critical"
                            ? "text-red-500"
                            : emergency.urgencyLevel === "high"
                              ? "text-orange-500"
                              : "text-yellow-500"
                        }`}
                      >
                        {emergency.urgencyLevel.toUpperCase()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {emergency.distance} mi away
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm">{emergency.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {emergency.estimatedArrival} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {emergency.caseType}
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => router.push(`/emergency/${emergency.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

