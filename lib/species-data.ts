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
    name: "Pacific Wren",
    scientificName: "Troglodytes pacificus",
    description:
      "Pacific Wrens are tiny brown birds with loud, complex songs. They hide in dark evergreen forests and are more often heard than seen. When singing, they raise their tail and shake their whole body.",
    status: "Low Concern",
    imageUrl: "/Pacific-Wren.png",
  },
  {
    id: 2,
    name: "Western Flycatcher",
    scientificName: "Empidonax difficilis",
    description:
      "The Western Flycatcher is a small olive-yellow bird that lives in shaded mountain forests near streams and catches insects in flight. In 2023, scientists merged its two former species back into one.",
    status: "Not Evaluated",
    imageUrl: "/Western-Flycatcher.png",
  },
  {
    id: 3,
    name: "Golden-crowned Kinglet",
    scientificName: "Regulus satrapa",
    description:
    "A tiny gray-olive songbird with a bright yellow-orange crown stripe. Often found in conifer forests, moving quickly through branches while feeding on insects.",
    status: "Least Concern",
    imageUrl: "/Golden-crowned-Kinglet.png",
  },
  {
    id: 4,
    name: "American Robin",
    scientificName: "Turdus migratorius",
    description:
    "A common North American songbird with an orange breast, often seen in gardens and parks.",
    status: "Least Concern",
    imageUrl: "/American-Robin.png",
  },
  {
    id: 5,
     name: "Swainson's Thrush",
    scientificName: "Catharus ustulatus",
    description:
    "A brown, shy forest thrush known for its spiraling flute-like song, often heard in dense woodland understory.",
    status: "Least Concern",
    imageUrl: "/Swainson's-Thrush.png",
  },
  {
    id: 6,
     name: "Wilson's Warbler",
    scientificName: "Cardellina pusilla",
    description:
    "A small yellow warbler with a black cap, often flitting through shrubs and forest edges in search of insects.",
    status: "Least Concern",
    imageUrl: "/Wilson's-Warbler.png",
  },
  
]
