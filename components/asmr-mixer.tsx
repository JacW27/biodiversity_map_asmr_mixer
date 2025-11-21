"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Square, Bird, Wind, CloudRain, Music2 } from "lucide-react"
import { birdSounds, ambientSounds, musicSounds } from "@/lib/audio-data"
import { cn } from "@/lib/utils"

export function ASMRMixer() {
  const [duration, setDuration] = useState([30]) // Session duration in seconds
  const [selectedBirds, setSelectedBirds] = useState<string[]>([])
  const [windEnabled, setWindEnabled] = useState(false)
  const [rainEnabled, setRainEnabled] = useState(false)
  const [musicEnabled, setMusicEnabled] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)
  const [progress, setProgress] = useState(0)

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  // Create audio elements
  useEffect(() => {
    // Clean up function
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause()
        audio.src = ""
      })
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const handleBirdToggle = (birdId: string) => {
    setSelectedBirds((prev) => (prev.includes(birdId) ? prev.filter((id) => id !== birdId) : [...prev, birdId]))
  }

  const createAndPlayAudio = (url: string, key: string, loop = true) => {
    // For demo purposes, we'll use a simple tone generator
    // In production, this would load actual .wav files
    const audio = new Audio()

    // Since we don't have real audio files, we'll create a visual indicator
    // In production: audio.src = url
    audio.loop = loop
    audio.volume = 0.5

    audioRefs.current[key] = audio

    // Uncomment when real audio files are available:
    // audio.play().catch(err => console.log('[v0] Audio playback prevented:', err))
  }

  const stopAudio = (key: string) => {
    if (audioRefs.current[key]) {
      audioRefs.current[key].pause()
      audioRefs.current[key].currentTime = 0
    }
  }

  const startSession = () => {
    if (isPlaying) return

    setIsPlaying(true)
    setRemainingTime(duration[0])
    setProgress(0)
    startTimeRef.current = Date.now()

    // Start selected bird sounds
    selectedBirds.forEach((birdId) => {
      const bird = birdSounds.find((b) => b.id === birdId)
      if (bird) {
        createAndPlayAudio(bird.url, bird.id, true)
      }
    })

    // Start ambient sounds
    if (windEnabled) {
      const wind = ambientSounds.find((a) => a.id === "wind")
      if (wind) createAndPlayAudio(wind.url, "wind", true)
    }
    if (rainEnabled) {
      const rain = ambientSounds.find((a) => a.id === "rain")
      if (rain) createAndPlayAudio(rain.url, "rain", true)
    }

    // Start music
    if (musicEnabled) {
      const music = musicSounds.find((m) => m.id === "piano")
      if (music) createAndPlayAudio(music.url, "piano", true)
    }

    // Start timer
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      const remaining = Math.max(0, duration[0] - elapsed)
      const progressPercent = (elapsed / duration[0]) * 100

      setRemainingTime(remaining)
      setProgress(Math.min(progressPercent, 100))

      if (remaining <= 0) {
        stopSession()
      }
    }, 100)
  }

  const pauseSession = () => {
    setIsPlaying(false)
    Object.values(audioRefs.current).forEach((audio) => audio.pause())
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const stopSession = () => {
    setIsPlaying(false)
    setRemainingTime(0)
    setProgress(0)

    Object.keys(audioRefs.current).forEach((key) => {
      stopAudio(key)
      delete audioRefs.current[key]
    })

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const hasAnySelection = selectedBirds.length > 0 || windEnabled || rainEnabled || musicEnabled

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Controls Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Duration Selector */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Session Duration</Label>
              <span className="text-2xl font-bold text-primary">{duration[0]}s</span>
            </div>
            <Slider value={duration} onValueChange={setDuration} min={15} max={60} step={15} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>15s</span>
              <span>30s</span>
              <span>45s</span>
              <span>60s</span>
            </div>
          </div>
        </Card>

        {/* Bird Species Selection */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Bird className="h-5 w-5 text-primary" />
              <Label className="text-lg font-semibold">Select Bird Species</Label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {birdSounds.map((bird) => (
                <div
                  key={bird.id}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors cursor-pointer",
                    selectedBirds.includes(bird.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50",
                  )}
                  onClick={() => handleBirdToggle(bird.id)}
                >
                  <Checkbox
                    id={bird.id}
                    checked={selectedBirds.includes(bird.id)}
                    onCheckedChange={() => handleBirdToggle(bird.id)}
                  />
                  <label htmlFor={bird.id} className="text-sm font-medium cursor-pointer flex-1">
                    {bird.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Ambient Sounds */}
        <Card className="p-6">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Abiotic Sounds</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Wind className="h-5 w-5 text-accent" />
                  <span className="font-medium">Wind</span>
                </div>
                <Switch checked={windEnabled} onCheckedChange={setWindEnabled} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <CloudRain className="h-5 w-5 text-accent" />
                  <span className="font-medium">Rain</span>
                </div>
                <Switch checked={rainEnabled} onCheckedChange={setRainEnabled} />
              </div>
            </div>
          </div>
        </Card>

        {/* Music */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <Music2 className="h-5 w-5 text-secondary" />
                <span className="font-medium">Soft Instrumental Music</span>
              </div>
              <Switch checked={musicEnabled} onCheckedChange={setMusicEnabled} />
            </div>
          </div>
        </Card>
      </div>

      {/* Now Playing & Controls Column */}
      <div className="space-y-6">
        <Card className="p-6 sticky top-20">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Session Controls</h3>

              {/* Playback Controls */}
              <div className="flex gap-2 mb-6">
                {!isPlaying ? (
                  <Button onClick={startSession} disabled={!hasAnySelection} className="flex-1" size="lg">
                    <Play className="mr-2 h-5 w-5" />
                    Generate ASMR
                  </Button>
                ) : (
                  <>
                    <Button onClick={pauseSession} variant="outline" className="flex-1 bg-transparent" size="lg">
                      <Pause className="mr-2 h-5 w-5" />
                      Pause
                    </Button>
                    <Button onClick={stopSession} variant="destructive" size="lg">
                      <Square className="h-5 w-5" />
                    </Button>
                  </>
                )}
              </div>

              {/* Progress */}
              {isPlaying && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Remaining Time</span>
                    <span className="font-mono font-semibold">{formatTime(remainingTime)}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </div>

            {/* Now Playing */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3 text-sm text-muted-foreground">Now Playing</h4>
              {!hasAnySelection ? (
                <p className="text-sm text-muted-foreground italic">Select sounds to create your ASMR session</p>
              ) : (
                <div className="space-y-2">
                  {selectedBirds.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Birds:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedBirds.map((birdId) => {
                          const bird = birdSounds.find((b) => b.id === birdId)
                          return (
                            <span key={birdId} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {bird?.name}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {(windEnabled || rainEnabled) && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Ambient:</p>
                      <div className="flex flex-wrap gap-1">
                        {windEnabled && (
                          <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">Wind</span>
                        )}
                        {rainEnabled && (
                          <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">Rain</span>
                        )}
                      </div>
                    </div>
                  )}
                  {musicEnabled && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Music:</p>
                      <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">Soft Piano</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Create a custom ASMR experience by mixing bird calls with natural ambient sounds. Perfect for
                relaxation, meditation, or focus.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
