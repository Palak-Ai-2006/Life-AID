import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface DashboardHeaderProps {
  activeCount: number
}

export function DashboardHeader({ activeCount }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-emergency text-white font-bold text-lg">
            RC
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-none">ResponderConnect</h1>
            <p className="text-xs text-muted-foreground">Emergency Response Network</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-5" />
            {activeCount > 0 && (
              <Badge className="absolute -top-1 -right-1 size-5 p-0 flex items-center justify-center text-[10px]">
                {activeCount}
              </Badge>
            )}
          </Button>
          <Link href="/responder-info">
            <Button variant="ghost" size="icon">
              <User className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
