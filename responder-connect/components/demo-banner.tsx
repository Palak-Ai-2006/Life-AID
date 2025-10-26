"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeftRight, User } from "lucide-react"
import { auth } from "@/lib/auth"
import { useState, useEffect } from "react"

export function DemoBanner() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    setUser(auth.getCurrentUser())
  }, [])

  const switchRole = () => {
    const targetRole = user?.role === "responder" ? "operator" : "responder"
    const demoUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const demoUser = demoUsers.find((u: any) => u.role === targetRole)
    
    if (demoUser) {
      auth.login(demoUser.email, "demo123")
      router.push(targetRole === "responder" ? "/dashboard" : "/operator/dashboard")
    }
  }

  if (!mounted) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">🎯 LifeAID Demo Mode Active</span>
            <span className="opacity-80">|</span>
            <span className="opacity-90">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold">🎯 LifeAID Demo Mode Active</span>
          <span className="opacity-80">|</span>
          <span className="opacity-90">Logged in as: {user?.fullName}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={switchRole}
            className="text-white hover:bg-white/20 h-8"
          >
            <ArrowLeftRight className="h-3 w-3 mr-1" />
            Switch to {user?.role === "responder" ? "Operator" : "Responder"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              auth.logout()
              router.push("/")
            }}
            className="text-white hover:bg-white/20 h-8"
          >
            <Home className="h-3 w-3 mr-1" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

