export interface Species {
  id: number
  name: string
  scientificName: string
  description: string
  status: string
  imageUrl: string
}

export const speciesData: Species[] = [
  {
    id: 1,
    name: "American Robin",
    scientificName: "Turdus migratorius",
    description:
      "A migratory songbird known for its distinctive orange breast and melodious song. Common in gardens, parks, and woodlands across North America.",
    status: "Least Concern",
    imageUrl: "/placeholder.svg?key=c7fay",
  },
  {
    id: 2,
    name: "Blue Jay",
    scientificName: "Cyanocitta cristata",
    description:
      "Intelligent and adaptable corvid with vibrant blue plumage and distinctive crest. Known for their complex social systems and vocal mimicry abilities.",
    status: "Least Concern",
    imageUrl: "/placeholder.svg?key=57vxj",
  },
  {
    id: 3,
    name: "Northern Cardinal",
    scientificName: "Cardinalis cardinalis",
    description:
      "Stunning red songbird with a prominent crest. Males are bright red while females are pale brown with reddish tinges. Non-migratory species.",
    status: "Least Concern",
    imageUrl: "/placeholder.svg?key=gzd23",
  },
  {
    id: 4,
    name: "Red-tailed Hawk",
    scientificName: "Buteo jamaicensis",
    description:
      "Large bird of prey with distinctive rust-colored tail. Excellent hunters found in diverse habitats from deserts to forests.",
    status: "Least Concern",
    imageUrl: "/placeholder.svg?key=f02mk",
  },
  {
    id: 5,
    name: "Baltimore Oriole",
    scientificName: "Icterus galbula",
    description:
      "Brilliant orange and black songbird. Males are vibrant while females are more subdued. Known for their hanging pouch-like nests.",
    status: "Least Concern",
    imageUrl: "/placeholder.svg?key=oqpx7",
  },
  {
    id: 6,
    name: "House Sparrow",
    scientificName: "Passer domesticus",
    description:
      "Small, adaptable bird closely associated with human habitation. Males have gray crowns and black bibs, females are plain brown.",
    status: "Least Concern",
    imageUrl: "/placeholder.svg?key=hkr8v",
  },
  {
    id: 7,
    name: "Black-capped Chickadee",
    scientificName: "Poecile atricapillus",
    description:
      "Small, acrobatic songbird with distinctive black cap and bib. Known for their complex vocalizations and food-caching behavior.",
    status: "Least Concern",
    imageUrl: "/placeholder.svg?key=9uo67",
  },
  {
    id: 8,
    name: "Mourning Dove",
    scientificName: "Zenaida macroura",
    description:
      "Graceful dove with soft gray-brown plumage. Named for their mournful cooing call. One of North America's most abundant birds.",
    status: "Least Concern",
    imageUrl: "/placeholder.svg?key=1nbe4",
  },
  {
    id: 9,
    name: "Eastern Bluebird",
    scientificName: "Sialia sialis",
    description:
      "Small thrush with bright blue upperparts and rusty red breast. Cavity nesters that have benefited from conservation nest box programs.",
    status: "Least Concern",
    imageUrl: "/placeholder.svg?key=s8wz3",
  },
  {
    id: 10,
    name: "American Goldfinch",
    scientificName: "Spinus tristis",
    description:
      "Small finch with bright yellow breeding plumage in males. Strict vegetarians and one of the latest breeding birds in North America.",
    status: "Least Concern",
    imageUrl: "/placeholder.svg?key=v4mkl",
  },
  {
    id: 11,
    name: "Downy Woodpecker",
    scientificName: "Dryobates pubescens",
    description:
      "Smallest woodpecker in North America with distinctive black and white plumage. Males have a small red patch on the back of the head.",
    status: "Least Concern",
    imageUrl: "/placeholder.svg?key=pwq92",
  },
  {
    id: 12,
    name: "Ruby-throated Hummingbird",
    scientificName: "Archilochus colubris",
    description:
      "Tiny, jewel-like bird capable of hovering and flying backwards. Males have iridescent ruby-red throats. Incredible migratory capabilities.",
    status: "Least Concern",
    imageUrl: "/placeholder.svg?key=zxn4q",
  },
]
