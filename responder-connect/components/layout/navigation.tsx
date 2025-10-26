"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Shield, Users, Home } from "lucide-react"
import { auth } from "@/lib/auth"
import { DemoBanner } from "@/components/demo-banner"

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const user = auth.getCurrentUser()

  const handleLogout = () => {
    auth.logout()
    router.push("/")
  }

  const isOperator = pathname?.startsWith("/operator")

  return (
    <>
      <DemoBanner />
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">LifeAID</span>
            </div>

            <div className="flex items-center gap-4">
              {isOperator ? (
                <Button variant="ghost" asChild>
                  <Home className="h-4 w-4" />
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => router.push("/dashboard")}>
                    Dashboard
                  </Button>
                  <Button variant="ghost" onClick={() => router.push("/responder-info")}>
                    Profile
                  </Button>
                </>
              )}

              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted">
                {isOperator ? (
                  <Users className="h-4 w-4 text-purple-600" />
                ) : (
                  <Shield className="h-4 w-4 text-blue-600" />
                )}
                <span className="text-sm font-medium">{user?.fullName}</span>
              </div>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

