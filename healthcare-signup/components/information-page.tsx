"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Car, Award, LogOut, Calendar, FileText } from "lucide-react"
import type { UserData } from "@/app/page"

type InformationPageProps = {
  userData: UserData
  onLogOut: () => void
}

export function InformationPage({ userData, onLogOut }: InformationPageProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 text-balance">
            Welcome, {userData.fullName}!
          </h1>
          <p className="text-lg text-slate-600">Your profile information</p>
        </div>
        <Button
          onClick={onLogOut}
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 bg-transparent"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-slate-900">Personal Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Full Name</p>
                <p className="text-lg font-semibold text-slate-900">{userData.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Date of Birth</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <p className="text-lg font-semibold text-slate-900">{formatDate(userData.dateOfBirth)}</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-slate-500 mb-3">Driver's License</p>
                {userData.driverLicensePreview && (
                  <div className="relative w-full max-w-md rounded-lg overflow-hidden border-2 border-slate-200 shadow-sm">
                    <img
                      src={userData.driverLicensePreview || "/placeholder.svg"}
                      alt="Driver's License"
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Car Details */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Car className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-slate-900">Car Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Color</p>
                <p className="text-lg font-semibold text-slate-900">{userData.carColor}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Model</p>
                <p className="text-lg font-semibold text-slate-900">{userData.carModel}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">License Plate</p>
                <Badge variant="secondary" className="text-base font-mono px-3 py-1">
                  {userData.licensePlate}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Award className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-slate-900">Certifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {userData.certifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className="p-4 border border-slate-200 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50/30"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Award className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-lg">{cert.type}</h4>
                        <p className="text-sm text-slate-500">Certification {index + 1}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Certificate File</p>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <p className="text-sm font-medium text-slate-700 truncate">{cert.fileName}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Issue Date</p>
                      <p className="text-sm font-semibold text-slate-900">{formatDate(cert.issueDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Expiry Date</p>
                      <p className="text-sm font-semibold text-slate-900">{formatDate(cert.expiryDate)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
