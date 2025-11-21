"use client"

import { Card } from "@/components/ui/card"
import { Database, Bird } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const populationData = [
  { year: "2019", detections: 45000 },
  { year: "2020", detections: 78000 },
  { year: "2021", detections: 125000 },
  { year: "2022", detections: 198000 },
  { year: "2023", detections: 260000 },
  { year: "2024", detections: 300000 },
]

export function ImpactStats() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stat Card 1 */}
        <Card className="p-6 bg-primary text-primary-foreground">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-foreground/10 rounded-lg">
              <Database className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium opacity-90">Total Recordings</p>
              <p className="text-4xl font-bold mt-1">300,000+</p>
              <p className="text-sm mt-2 opacity-75">Bird calls recorded and analyzed</p>
            </div>
          </div>
        </Card>

        {/* Stat Card 2 */}
        <Card className="p-6 bg-accent text-accent-foreground">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent-foreground/10 rounded-lg">
              <Bird className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium opacity-90">Species Identified</p>
              <p className="text-4xl font-bold mt-1">80+</p>
              <p className="text-sm mt-2 opacity-75">Unique bird species documented</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Historical Detection Trends</h3>
        <ChartContainer
          config={{
            detections: {
              label: "Detections",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={populationData}>
              <defs>
                <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="year" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="detections"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorDetections)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>
    </div>
  )
}
