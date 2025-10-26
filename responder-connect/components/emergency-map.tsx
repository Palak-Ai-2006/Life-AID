"use client"

import { useEffect, useRef, useState } from "react"
import type { EmergencyRequest } from "@/lib/types"
import { MapPin, Navigation } from "lucide-react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

interface EmergencyMapProps {
  emergency: EmergencyRequest
  responderLocation?: {
    lat: number
    lng: number
  }
}

export function EmergencyMap({ emergency, responderLocation }: EmergencyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapError, setMapError] = useState(false)
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  useEffect(() => {
    // Set Mapbox access token
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (mapboxToken) {
      mapboxgl.accessToken = mapboxToken
    }

    if (!mapContainer.current || map.current) return

    const defaultResponderLocation = responderLocation || {
      lat: 37.7749,
      lng: -122.4294,
    }

    // If no token, show placeholder
    if (!mapboxToken) {
      setShowPlaceholder(true)
      return
    }

    try {
      // Initialize map
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [
          (emergency.location.coordinates.lng + defaultResponderLocation.lng) / 2,
          (emergency.location.coordinates.lat + defaultResponderLocation.lat) / 2,
        ],
        zoom: 12,
      })

      map.current = mapInstance

      mapInstance.on("load", () => {
        setShowPlaceholder(false)
        
        // Add responder location marker
        new mapboxgl.Marker({
          color: "#3b82f6",
          scale: 1.2,
        })
          .setLngLat([defaultResponderLocation.lng, defaultResponderLocation.lat])
          .setPopup(new mapboxgl.Popup().setHTML("<div class='font-semibold'>Your Location</div>"))
          .addTo(mapInstance)

        // Add emergency location marker
        new mapboxgl.Marker({
          color: "#ef4444",
          scale: 1.2,
        })
          .setLngLat([emergency.location.coordinates.lng, emergency.location.coordinates.lat])
          .setPopup(new mapboxgl.Popup().setHTML("<div class='font-semibold text-emergency'>Emergency Location</div>"))
          .addTo(mapInstance)

        // Fit bounds to show both locations
        const bounds = new mapboxgl.LngLatBounds()
        bounds.extend([defaultResponderLocation.lng, defaultResponderLocation.lat])
        bounds.extend([emergency.location.coordinates.lng, emergency.location.coordinates.lat])
        mapInstance.fitBounds(bounds, { padding: 50 })
      })

      mapInstance.on("error", () => {
        setMapError(true)
        setShowPlaceholder(true)
      })

      // Cleanup
      return () => {
        mapInstance.remove()
      }
    } catch (error) {
      console.error("Map initialization error:", error)
      setMapError(true)
      setShowPlaceholder(true)
    }
  }, [emergency, responderLocation])

  const defaultResponderLocation = responderLocation || {
    lat: 37.7749,
    lng: -122.4294,
  }

  // Show placeholder if no token or error
  if (showPlaceholder) {
    return (
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden border bg-muted">
        {/* Map placeholder with visual representation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20">
          {/* Grid pattern to simulate map */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Route line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line
              x1="30%"
              y1="70%"
              x2="70%"
              y2="30%"
              stroke="oklch(var(--emergency))"
              strokeWidth="3"
              strokeDasharray="8,4"
              className="animate-pulse"
            />
          </svg>

          {/* Responder location marker */}
          <div
            className="absolute flex items-center justify-center"
            style={{ left: "30%", top: "70%", transform: "translate(-50%, -50%)" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-info rounded-full animate-ping opacity-75" />
              <div className="relative flex size-10 items-center justify-center rounded-full bg-info text-white shadow-lg border-2 border-white">
                <Navigation className="size-5" />
              </div>
            </div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/95 backdrop-blur px-2 py-1 rounded text-xs font-medium shadow-md border">
              Your Location
            </div>
          </div>

          {/* Emergency location marker */}
          <div
            className="absolute flex items-center justify-center"
            style={{ left: "70%", top: "30%", transform: "translate(-50%, -50%)" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-emergency rounded-full animate-pulse opacity-50" />
              <div className="relative flex size-12 items-center justify-center rounded-full bg-emergency text-white shadow-lg border-2 border-white">
                <MapPin className="size-6" />
              </div>
            </div>
            <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/95 backdrop-blur px-2 py-1 rounded text-xs font-medium shadow-md border max-w-[200px] text-center">
              Emergency Location
            </div>
          </div>

          {/* Message if no API key */}
          {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/95 backdrop-blur rounded-lg shadow-lg border p-4 max-w-sm text-center">
              <p className="text-sm font-medium mb-1">Map Preview Unavailable</p>
              <p className="text-xs text-muted-foreground">
                Add NEXT_PUBLIC_MAPBOX_TOKEN to your .env file to view interactive maps
              </p>
            </div>
          )}

          {/* Distance and time overlay */}
          <div className="absolute top-4 left-4 bg-background/95 backdrop-blur rounded-lg shadow-lg border p-3 space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <div className="size-2 rounded-full bg-info" />
              <span className="font-medium">{emergency.distance} miles away</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="size-2 rounded-full bg-muted-foreground" />
              <span>~{emergency.estimatedArrival} min arrival</span>
            </div>
          </div>
        </div>

        {/* Address overlay */}
        <div className="absolute bottom-4 left-4 right-20 bg-background/95 backdrop-blur rounded-lg shadow-lg border p-3">
          <div className="flex items-start gap-2">
            <MapPin className="size-4 text-emergency shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium line-clamp-2">{emergency.location.address}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {emergency.location.coordinates.lat.toFixed(4)}, {emergency.location.coordinates.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render actual map
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Distance and time overlay */}
      <div className="absolute top-4 left-4 bg-background/95 backdrop-blur rounded-lg shadow-lg border p-3 space-y-1 z-10">
        <div className="flex items-center gap-2 text-sm">
          <div className="size-2 rounded-full bg-info" />
          <span className="font-medium">{emergency.distance} miles away</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="size-2 rounded-full bg-muted-foreground" />
          <span>~{emergency.estimatedArrival} min arrival</span>
        </div>
      </div>

      {/* Address overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur rounded-lg shadow-lg border p-3 z-10">
        <div className="flex items-start gap-2">
          <MapPin className="size-4 text-emergency shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium line-clamp-2">{emergency.location.address}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {emergency.location.coordinates.lat.toFixed(4)}, {emergency.location.coordinates.lng.toFixed(4)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
