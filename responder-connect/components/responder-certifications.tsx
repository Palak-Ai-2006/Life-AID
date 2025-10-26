import type { Certification } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Calendar, FileCheck, Plus } from "lucide-react"

interface ResponderCertificationsProps {
  certifications: Certification[]
}

export function ResponderCertifications({ certifications }: ResponderCertificationsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0
  }

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Certifications</CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="size-4" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="flex items-start gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/30"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-success/10 text-success">
              <Award className="size-5" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-semibold leading-tight">{cert.type}</h4>
                {isExpired(cert.expiryDate) ? (
                  <Badge variant="destructive" className="shrink-0">
                    Expired
                  </Badge>
                ) : isExpiringSoon(cert.expiryDate) ? (
                  <Badge className="shrink-0 bg-warning text-warning-foreground border-warning">Expiring Soon</Badge>
                ) : (
                  <Badge variant="outline" className="shrink-0 bg-success/10 text-success border-success/20">
                    Valid
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FileCheck className="size-3" />
                  <span>Issued: {formatDate(cert.issueDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  <span>Expires: {formatDate(cert.expiryDate)}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                View Certificate
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
