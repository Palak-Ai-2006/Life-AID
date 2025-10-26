"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"
import { RoleSelector } from "@/components/auth/role-selector"
import { OperatorSignup } from "@/components/auth/operator-signup"
import { SignUpForm } from "@/components/auth/responder-signup"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { DEMO_USERS } from "@/lib/demo-mode"

type AuthView = "landing" | "login" | "selectRole" | "responderSignup" | "operatorSignup"

export default function AuthPage() {
  const [view, setView] = useState<AuthView>("landing")
  const router = useRouter()

  useEffect(() => {
    // Initialize demo users
    if (!localStorage.getItem("demoInitialized")) {
      localStorage.setItem("users", JSON.stringify([
        { ...DEMO_USERS.responder, password: "demo123" },
        { ...DEMO_USERS.operator, password: "demo123" }
      ]))
      localStorage.setItem("demoInitialized", "true")
    }

    // Check if user is already authenticated
    const user = auth.getCurrentUser()
    if (user) {
      router.push(user.role === "responder" ? "/dashboard" : "/operator/dashboard")
    } else {
      // Demo mode: Show landing with demo buttons
      setView("landing")
    }
  }, [router])

  const handleDemoLogin = (role: "responder" | "operator") => {
    // Auto-login demo user
    const demoUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const demoUser = demoUsers.find((u: any) => u.role === role)
    
    if (demoUser) {
      auth.login(demoUser.email, "demo123")
      router.push(role === "responder" ? "/dashboard" : "/operator/dashboard")
    }
  }

  const handleSignUp = (data: any, role: "responder" | "operator") => {
    // For responders, we need to handle file uploads differently
    if (role === "responder") {
      const success = auth.signup({
        ...data,
        email: data.email || "responder@example.com",
        password: "password123", // In real app, this would be from form
        role: "responder",
      })

      if (success) {
        router.push("/dashboard")
      }
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {view === "landing" && (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold text-slate-900">LifeAID</h1>
              <p className="text-xl text-slate-600">Emergency Response Network</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-blue-900 mb-2">🎯 Demo Mode</p>
              <p className="text-xs text-blue-700">Click below to explore the application</p>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <Button 
                  onClick={() => handleDemoLogin("responder")} 
                  size="lg"
                  className="h-auto py-6 flex flex-col gap-2 bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  <span className="text-lg font-semibold">👮 First Responder</span>
                  <span className="text-sm opacity-90">View responder dashboard</span>
                </Button>
                <Button 
                  onClick={() => handleDemoLogin("operator")} 
                  size="lg"
                  className="h-auto py-6 flex flex-col gap-2 bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  <span className="text-lg font-semibold">📞 911 Operator</span>
                  <span className="text-sm opacity-90">View operator dashboard</span>
                </Button>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-3">Or customize the experience:</p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => setView("login")} variant="outline" size="sm">
                    Sign In
                  </Button>
                  <Button onClick={() => setView("selectRole")} variant="outline" size="sm">
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "login" && (
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => setView("landing")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <LoginForm />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => setView("selectRole")}
                >
                  Sign up
                </Button>
              </p>
            </div>
          </div>
        )}

        {view === "selectRole" && (
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => setView("landing")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <RoleSelector onSelectRole={(role) => {
              if (role === "responder") {
                setView("responderSignup")
              } else {
                setView("operatorSignup")
              }
            }} />
          </div>
        )}

        {view === "responderSignup" && (
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => setView("selectRole")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <SignUpForm onSignUp={(data) => handleSignUp(data, "responder")} />
          </div>
        )}

        {view === "operatorSignup" && (
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => setView("selectRole")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <OperatorSignup />
          </div>
        )}
      </div>
    </main>
  )
}
