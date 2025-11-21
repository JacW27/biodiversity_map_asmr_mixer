"use client"

import { useState, useMemo } from "react"
import { MapPin, Play, Pause } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { birdDetections, uniqueSpecies, timeRange } from "@/lib/bird-data"

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
  useMemo(() => {
    if (isPlaying) {
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
    }
  }, [isPlaying])

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
        <div className="relative w-full h-[600px] bg-muted/30 rounded-lg overflow-hidden">
          {/* Map Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Detection Markers */}
          {filteredDetections.map((detection) => {
            // Normalize coordinates to fit within container (simple projection)
            const x = ((detection.longitude + 74.006) / 0.05) * 100 // Rough normalization
            const y = ((40.8 - detection.latitude) / 0.1) * 100

            return (
              <div
                key={detection.id}
                className="absolute group"
                style={{
                  left: `${Math.min(Math.max(x, 5), 95)}%`,
                  top: `${Math.min(Math.max(y, 5), 95)}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative">
                  <MapPin
                    className="h-6 w-6 text-primary drop-shadow-lg animate-in fade-in zoom-in duration-300"
                    fill="currentColor"
                  />

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border">
                    <p className="font-semibold text-sm">{detection.species}</p>
                    <p className="text-xs text-muted-foreground">{detection.datetime}</p>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card p-4 rounded-lg shadow-lg border">
            <p className="text-sm font-semibold mb-2">Map Legend</p>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" fill="currentColor" />
              <span className="text-xs text-muted-foreground">Bird Detection</span>
            </div>
          </div>

          {/* Info */}
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
