import { BirdDetectionMap } from "@/components/bird-detection-map"

export default function MapPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Bird Detection Map</h1>
          <p className="text-lg text-muted-foreground">
            Explore bird call detections across different locations and time periods
          </p>
        </div>

        <BirdDetectionMap />
      </div>
    </div>
  )
}
