export interface BirdDetection {
  id: number
  species: string
  latitude: number
  longitude: number
  datetime: string
  timestamp: number
}

// Mock bird detection data
export const birdDetections: BirdDetection[] = [
  // American Robin detections
  {
    id: 1,
    species: "American Robin",
    latitude: 40.7128,
    longitude: -74.006,
    datetime: "2024-01-15 08:30",
    timestamp: new Date("2024-01-15").getTime(),
  },
  {
    id: 2,
    species: "American Robin",
    latitude: 40.758,
    longitude: -73.9855,
    datetime: "2024-02-10 09:15",
    timestamp: new Date("2024-02-10").getTime(),
  },
  {
    id: 3,
    species: "American Robin",
    latitude: 40.7489,
    longitude: -73.968,
    datetime: "2024-03-05 07:45",
    timestamp: new Date("2024-03-05").getTime(),
  },

  // Blue Jay detections
  {
    id: 4,
    species: "Blue Jay",
    latitude: 40.7614,
    longitude: -73.9776,
    datetime: "2024-01-20 10:00",
    timestamp: new Date("2024-01-20").getTime(),
  },
  {
    id: 5,
    species: "Blue Jay",
    latitude: 40.7829,
    longitude: -73.9654,
    datetime: "2024-02-15 11:30",
    timestamp: new Date("2024-02-15").getTime(),
  },
  {
    id: 6,
    species: "Blue Jay",
    latitude: 40.7282,
    longitude: -73.9942,
    datetime: "2024-03-10 08:00",
    timestamp: new Date("2024-03-10").getTime(),
  },

  // Northern Cardinal detections
  {
    id: 7,
    species: "Northern Cardinal",
    latitude: 40.748,
    longitude: -73.9862,
    datetime: "2024-01-25 06:30",
    timestamp: new Date("2024-01-25").getTime(),
  },
  {
    id: 8,
    species: "Northern Cardinal",
    latitude: 40.7359,
    longitude: -73.9911,
    datetime: "2024-02-20 07:00",
    timestamp: new Date("2024-02-20").getTime(),
  },
  {
    id: 9,
    species: "Northern Cardinal",
    latitude: 40.7589,
    longitude: -73.9851,
    datetime: "2024-03-15 06:45",
    timestamp: new Date("2024-03-15").getTime(),
  },

  // House Sparrow detections
  {
    id: 10,
    species: "House Sparrow",
    latitude: 40.7527,
    longitude: -73.9772,
    datetime: "2024-02-01 09:00",
    timestamp: new Date("2024-02-01").getTime(),
  },
  {
    id: 11,
    species: "House Sparrow",
    latitude: 40.7678,
    longitude: -73.9812,
    datetime: "2024-02-25 10:30",
    timestamp: new Date("2024-02-25").getTime(),
  },
  {
    id: 12,
    species: "House Sparrow",
    latitude: 40.7413,
    longitude: -73.991,
    datetime: "2024-03-20 09:15",
    timestamp: new Date("2024-03-20").getTime(),
  },

  // Red-tailed Hawk detections
  {
    id: 13,
    species: "Red-tailed Hawk",
    latitude: 40.7694,
    longitude: -73.9794,
    datetime: "2024-02-05 12:00",
    timestamp: new Date("2024-02-05").getTime(),
  },
  {
    id: 14,
    species: "Red-tailed Hawk",
    latitude: 40.7731,
    longitude: -73.9712,
    datetime: "2024-03-01 13:30",
    timestamp: new Date("2024-03-01").getTime(),
  },
  {
    id: 15,
    species: "Red-tailed Hawk",
    latitude: 40.7851,
    longitude: -73.9683,
    datetime: "2024-03-25 14:00",
    timestamp: new Date("2024-03-25").getTime(),
  },

  // Baltimore Oriole detections
  {
    id: 16,
    species: "Baltimore Oriole",
    latitude: 40.754,
    longitude: -73.982,
    datetime: "2024-03-05 08:30",
    timestamp: new Date("2024-03-05").getTime(),
  },
  {
    id: 17,
    species: "Baltimore Oriole",
    latitude: 40.762,
    longitude: -73.9734,
    datetime: "2024-03-18 09:00",
    timestamp: new Date("2024-03-18").getTime(),
  },
]

export const uniqueSpecies = Array.from(new Set(birdDetections.map((d) => d.species))).sort()

export const timeRange = {
  min: Math.min(...birdDetections.map((d) => d.timestamp)),
  max: Math.max(...birdDetections.map((d) => d.timestamp)),
}
