"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { EmergencyRequest } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Activity, AlertCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface EmergencyCardProps {
  request: EmergencyRequest
}

export function EmergencyCard({ request }: EmergencyCardProps) {
  const router = useRouter()
  const [accepted, setAccepted] = useState(false)

  const handleAccept = () => {
    setAccepted(true)
    // Navigate to emergency detail page with accepted state
    router.push(`/emergency/${request.id}?accepted=true`)
  }
  const urgencyColors = {
    critical: "bg-emergency text-white border-emergency",
    high: "bg-warning text-warning-foreground border-warning",
    moderate: "bg-info text-info-foreground border-info",
  }

  const caseTypeLabels = {
    cardiac: "Cardiac",
    trauma: "Trauma",
    respiratory: "Respiratory",
    other: "Other",
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-tight line-clamp-2">{request.title}</CardTitle>
          <Badge className={cn("shrink-0", urgencyColors[request.urgencyLevel])}>{request.urgencyLevel}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{request.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="size-4 text-muted-foreground shrink-0" />
            <span className="line-clamp-1">{request.location.address}</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Activity className="size-4 text-muted-foreground" />
              <span className="font-medium">{request.distance} mi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-4 text-muted-foreground" />
              <span className="font-medium">{request.estimatedArrival} min</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {caseTypeLabels[request.caseType]}
            </Badge>
            {request.urgencyLevel === "critical" && (
              <div className="flex items-center gap-1 text-xs text-emergency">
                <AlertCircle className="size-3" />
                <span className="font-medium">Expires in {request.expiresIn}s</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 flex gap-2">
        {accepted ? (
          <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" disabled>
            <CheckCircle className="size-4 mr-2" />
            Accepted
          </Button>
        ) : (
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleAccept}
          >
            <CheckCircle className="size-4 mr-2" />
            Accept
          </Button>
        )}
        <Link href={`/emergency/${request.id}`} className="flex-1">
          <Button variant="outline" className="w-full bg-transparent">
            Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
