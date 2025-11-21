export interface AudioSource {
  id: string
  name: string
  type: "bird" | "ambient" | "music"
  url: string
}

// Mock audio sources - in production, these would point to real .wav files
export const birdSounds: AudioSource[] = [
  { id: "robin", name: "American Robin", type: "bird", url: "/audio/robin.wav" },
  { id: "bluejay", name: "Blue Jay", type: "bird", url: "/audio/bluejay.wav" },
  { id: "cardinal", name: "Northern Cardinal", type: "bird", url: "/audio/cardinal.wav" },
  { id: "hawk", name: "Red-tailed Hawk", type: "bird", url: "/audio/hawk.wav" },
  { id: "oriole", name: "Baltimore Oriole", type: "bird", url: "/audio/oriole.wav" },
  { id: "sparrow", name: "House Sparrow", type: "bird", url: "/audio/sparrow.wav" },
]

export const ambientSounds: AudioSource[] = [
  { id: "wind", name: "Wind", type: "ambient", url: "/audio/wind.wav" },
  { id: "rain", name: "Rain", type: "ambient", url: "/audio/rain.wav" },
]

export const musicSounds: AudioSource[] = [{ id: "piano", name: "Soft Piano", type: "music", url: "/audio/piano.wav" }]
