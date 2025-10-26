import type { EmergencyRequest } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface EmergencyDetailHeaderProps {
  emergency: EmergencyRequest
}

export function EmergencyDetailHeader({ emergency }: EmergencyDetailHeaderProps) {
  const urgencyColors = {
    critical: "bg-emergency text-white border-emergency",
    high: "bg-warning text-warning-foreground border-warning",
    moderate: "bg-info text-info-foreground border-info",
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-start gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-xl font-semibold leading-tight">{emergency.title}</h1>
              <Badge className={cn("shrink-0", urgencyColors[emergency.urgencyLevel])}>{emergency.urgencyLevel}</Badge>
            </div>
            {emergency.urgencyLevel === "critical" && emergency.expiresIn > 0 && (
              <div className="flex items-center gap-2 text-sm text-emergency">
                <Clock className="size-4" />
                <span className="font-medium">Expires in {emergency.expiresIn} seconds</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
