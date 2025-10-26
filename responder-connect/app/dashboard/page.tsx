"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { EmergencyCard } from "@/components/emergency-card"
import { DashboardFilters } from "@/components/dashboard-filters"
import { DashboardHeader } from "@/components/dashboard-header"
import { Navigation } from "@/components/layout/navigation"
import { mockEmergencyRequests } from "@/lib/mock-data"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { AlertCircle } from "lucide-react"
import { auth } from "@/lib/auth"

export default function DashboardPage() {
  const router = useRouter()
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all")
  const [caseTypeFilter, setCaseTypeFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("distance")

  useEffect(() => {
    // Check authentication
    if (!auth.isAuthenticated()) {
      router.push("/")
      return
    }
  }, [router])

  // Filter emergency requests
  const filteredRequests = mockEmergencyRequests.filter((request) => {
    const matchesUrgency = urgencyFilter === "all" || request.urgencyLevel === urgencyFilter
    const matchesCaseType = caseTypeFilter === "all" || request.caseType === caseTypeFilter
    return matchesUrgency && matchesCaseType
  })

  // Sort emergency requests
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortBy === "distance") {
      return a.distance - b.distance
    } else if (sortBy === "urgency") {
      const urgencyOrder = { critical: 0, high: 1, moderate: 2 }
      return urgencyOrder[a.urgencyLevel] - urgencyOrder[b.urgencyLevel]
    } else if (sortBy === "time") {
      return b.timestamp.getTime() - a.timestamp.getTime()
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <DashboardHeader activeCount={mockEmergencyRequests.length} />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <DashboardFilters
          urgencyFilter={urgencyFilter}
          caseTypeFilter={caseTypeFilter}
          sortBy={sortBy}
          onUrgencyChange={setUrgencyFilter}
          onCaseTypeChange={setCaseTypeFilter}
          onSortChange={setSortBy}
        />

        {sortedRequests.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedRequests.map((request) => (
              <EmergencyCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <Empty className="min-h-[400px]">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <AlertCircle />
              </EmptyMedia>
              <EmptyTitle>No Emergency Requests</EmptyTitle>
              <EmptyDescription>
                There are no emergency requests matching your current filters. Try adjusting your filter settings.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </main>
    </div>
  )
}
