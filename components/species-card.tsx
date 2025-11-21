import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Species } from "@/lib/species-data"

interface SpeciesCardProps {
  species: Species
}

export function SpeciesCard({ species }: SpeciesCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={species.imageUrl || "/placeholder.svg"}
          alt={species.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-lg mb-1">{species.name}</h3>
          <p className="text-sm text-muted-foreground italic">{species.scientificName}</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{species.description}</p>
        <div className="pt-2">
          <Badge variant="secondary" className="text-xs">
            Status: {species.status}
          </Badge>
        </div>
      </div>
    </Card>
  )
}
