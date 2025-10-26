import type { ResponderInfo } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Edit } from "lucide-react"

interface ResponderProfileProps {
  responder: ResponderInfo
}

export function ResponderProfile({ responder }: ResponderProfileProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Personal Information</CardTitle>
          <Button variant="outline" size="sm">
            <Edit className="size-4" />
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-4">
          <Avatar className="size-20 border-2 border-border">
            <AvatarImage src={responder.profileImage || "/placeholder.svg"} alt={responder.fullName} />
            <AvatarFallback className="text-lg font-semibold">{getInitials(responder.fullName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <h3 className="text-xl font-semibold">{responder.fullName}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="size-4" />
              <span>Born {formatDate(responder.dateOfBirth)}</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">Verified Responder</Badge>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Active
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <FileText className="size-4 text-muted-foreground" />
            Driver's License
          </h4>
          <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
            <div className="space-y-1">
              <p className="text-sm font-medium">{responder.driversLicense.fileName}</p>
              <p className="text-xs text-muted-foreground">
                Expires: {formatDate(responder.driversLicense.expiryDate)}
              </p>
            </div>
            <Button variant="ghost" size="sm">
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
