import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircle />
          </EmptyMedia>
          <EmptyTitle>Page Not Found</EmptyTitle>
          <EmptyDescription>The page you're looking for doesn't exist or has been moved.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </EmptyContent>
      </Empty>
    </div>
  )
}
