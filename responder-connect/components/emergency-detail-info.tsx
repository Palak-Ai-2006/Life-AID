import type { EmergencyRequest } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertCircle, User } from "lucide-react"

interface EmergencyDetailInfoProps {
  emergency: EmergencyRequest
}

export function EmergencyDetailInfo({ emergency }: EmergencyDetailInfoProps) {
  const caseTypeLabels = {
    cardiac: "Cardiac Emergency",
    trauma: "Trauma",
    respiratory: "Respiratory Emergency",
    other: "Other Emergency",
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="size-5 text-emergency" />
            Emergency Description
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Situation</h3>
            <p className="text-sm leading-relaxed">{emergency.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{caseTypeLabels[emergency.caseType]}</Badge>
            <Badge variant="secondary">Reported at {formatTime(emergency.timestamp)}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5" />
            Patient Condition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{emergency.patientCondition}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="size-5" />
            Response Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="text-sm font-medium">{emergency.distance} miles</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Estimated Arrival</p>
              <p className="text-sm font-medium">{emergency.estimatedArrival} minutes</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Case Type</p>
              <p className="text-sm font-medium">{caseTypeLabels[emergency.caseType]}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Urgency Level</p>
              <p className="text-sm font-medium capitalize">{emergency.urgencyLevel}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
