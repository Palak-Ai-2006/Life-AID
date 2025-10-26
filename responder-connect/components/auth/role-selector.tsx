"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Shield, ArrowRight } from "lucide-react"

interface RoleSelectorProps {
  onSelectRole: (role: "responder" | "operator") => void
}

export function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Get Started</h1>
        <p className="text-lg text-muted-foreground">Choose your role to continue</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card 
          className="cursor-pointer hover:border-primary transition-colors"
          onClick={() => onSelectRole("responder")}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">First Responder</CardTitle>
                <CardDescription>Join the emergency response network</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-1" />
                <span>Register your certifications</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-1" />
                <span>View nearby emergencies</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-1" />
                <span>Accept and respond to calls</span>
              </li>
            </ul>
            <Button className="w-full" onClick={() => onSelectRole("responder")}>
              Sign Up as Responder
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:border-primary transition-colors"
          onClick={() => onSelectRole("operator")}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">911 Operator</CardTitle>
                <CardDescription>Dispatch and manage emergencies</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-1" />
                <span>Create emergency requests</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-1" />
                <span>Monitor active calls</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-1" />
                <span>Coordinate responses</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full" onClick={() => onSelectRole("operator")}>
              Sign Up as Operator
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

