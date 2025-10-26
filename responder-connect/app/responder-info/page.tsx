import { ResponderProfile } from "@/components/responder-profile"
import { ResponderVehicle } from "@/components/responder-vehicle"
import { ResponderCertifications } from "@/components/responder-certifications"
import { mockResponderInfo } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ResponderInfoPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4 max-w-4xl">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold leading-none">Responder Profile</h1>
            <p className="text-xs text-muted-foreground">Your information and credentials</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        <ResponderProfile responder={mockResponderInfo} />
        <ResponderVehicle vehicle={mockResponderInfo.vehicle} />
        <ResponderCertifications certifications={mockResponderInfo.certifications} />
      </main>
    </div>
  )
}
