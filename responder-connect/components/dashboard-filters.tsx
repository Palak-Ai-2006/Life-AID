"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

interface DashboardFiltersProps {
  urgencyFilter: string
  caseTypeFilter: string
  sortBy: string
  onUrgencyChange: (value: string) => void
  onCaseTypeChange: (value: string) => void
  onSortChange: (value: string) => void
}

export function DashboardFilters({
  urgencyFilter,
  caseTypeFilter,
  sortBy,
  onUrgencyChange,
  onCaseTypeChange,
  onSortChange,
}: DashboardFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Filter className="size-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Active Emergencies</h2>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={urgencyFilter} onValueChange={onUrgencyChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Urgency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Urgency</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
          </SelectContent>
        </Select>

        <Select value={caseTypeFilter} onValueChange={onCaseTypeChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Case Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="cardiac">Cardiac</SelectItem>
            <SelectItem value="trauma">Trauma</SelectItem>
            <SelectItem value="respiratory">Respiratory</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Distance</SelectItem>
            <SelectItem value="urgency">Urgency</SelectItem>
            <SelectItem value="time">Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
