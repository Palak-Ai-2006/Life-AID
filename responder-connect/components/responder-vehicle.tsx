import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Edit } from "lucide-react"

interface ResponderVehicleProps {
  vehicle: {
    color: string
    model: string
    licensePlate: string
  }
}

export function ResponderVehicle({ vehicle }: ResponderVehicleProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Vehicle Information</CardTitle>
          <Button variant="outline" size="sm">
            <Edit className="size-4" />
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="flex size-12 items-center justify-center rounded-lg bg-muted">
            <Car className="size-6 text-muted-foreground" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Model</p>
                <p className="text-sm font-medium">{vehicle.model}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Color</p>
                <p className="text-sm font-medium">{vehicle.color}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">License Plate</p>
                <p className="text-sm font-medium font-mono">{vehicle.licensePlate}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
