"use client"

import { useState, useMemo, useEffect } from "react"
import { MapPin, Play, Pause } from "lucide-react"
import Map, { Marker } from "react-map-gl"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { birdDetections, uniqueSpecies, timeRange } from "@/lib/bird-data"

const SPECIES_COLORS: Record<string, string> = {
  "Pacific Wren": "#e41a1c",
  "Pacific-slope Flycatcher": "#377eb8",
  "Golden-crowned Kinglet": "#4daf4a",
  "American Robin": "#984ea3",
  "Swainson's Thrush": "#ff7f00",
  "Wilson's Warbler": "#a65628",
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string

export function BirdDetectionMap() {
  const [selectedSpecies, setSelectedSpecies] = useState<string>("all")
  const [timeValue, setTimeValue] = useState([timeRange.min])
  const [isPlaying, setIsPlaying] = useState(false)

  // Filter detections based on species and time
  const filteredDetections = useMemo(() => {
    return birdDetections.filter((detection) => {
      const speciesMatch = selectedSpecies === "all" || detection.species === selectedSpecies
      const timeMatch = detection.timestamp <= timeValue[0]
      return speciesMatch && timeMatch
    })
  }, [selectedSpecies, timeValue])

  // Auto-play functionality
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Simple effect for playback
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setTimeValue((prev) => {
        const newValue = prev[0] + (timeRange.max - timeRange.min) / 100
        if (newValue >= timeRange.max) {
          setIsPlaying(false)
          return [timeRange.max]
        }
        return [newValue]
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying])

  // Study area bounding box (based on your real data)
  const minLat = 46.35
  const maxLat = 46.43
  const minLon = -123.95
  const maxLon = -123.87

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Species Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Filter by Species</label>
              <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
                <SelectTrigger>
                  <SelectValue placeholder="Select species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  {uniqueSpecies.map((species) => (
                    <SelectItem key={species} value={species}>
                      {species}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Detection Count */}
            <div className="flex items-end">
              <div className="p-4 bg-primary/10 rounded-lg w-full">
                <p className="text-sm text-muted-foreground">Visible Detections</p>
                <p className="text-2xl font-bold text-primary">{filteredDetections.length}</p>
              </div>
            </div>
          </div>

          {/* Timeline Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Timeline Playback</label>
              <span className="text-sm text-muted-foreground">{formatDate(timeValue[0])}</span>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <Slider
                value={timeValue}
                onValueChange={setTimeValue}
                min={timeRange.min}
                max={timeRange.max}
                step={(timeRange.max - timeRange.min) / 100}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </Card>
      
      {/* Map Visualization */}
      <Card className="p-6">
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
          {/* Mapbox Map */}
          <Map
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={{
              latitude: (minLat + maxLat) / 2,
              longitude: (minLon + maxLon) / 2,
              zoom: 11,
            }}
            minZoom={9}
            maxZoom={14}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/outdoors-v12"
          >
            {/* Markers */}
            {filteredDetections.map((detection) => (
              <Marker
                key={detection.id}
                latitude={detection.latitude}
                longitude={detection.longitude}
                anchor="bottom"
              >
                <MapPin
                  className="h-6 w-6 drop-shadow-lg"
                  style={{ color: SPECIES_COLORS[detection.species] ?? "#0f766e" }}
                  fill="currentColor"
                />
              </Marker>
            ))}
          </Map>

          {/* Legend overlay */}
          <div className="absolute bottom-4 left-4 bg-card p-4 rounded-lg shadow-lg border">
            <p className="text-sm font-semibold mb-2">Species Legend</p>
            <div className="space-y-1">
              {uniqueSpecies.map((species) => (
                <div key={species} className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: SPECIES_COLORS[species] ?? "#6b7280" }}
                  />
                  <span className="text-xs text-muted-foreground">{species}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info overlay */}
          <div className="absolute top-4 right-4 bg-card p-4 rounded-lg shadow-lg border max-w-xs">
            <p className="text-xs text-muted-foreground">
              Hover over markers to view detection details. Use the timeline to see how detections change over time.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
