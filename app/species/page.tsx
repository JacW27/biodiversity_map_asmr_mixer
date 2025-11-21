import { SpeciesCard } from "@/components/species-card"
import { speciesData } from "@/lib/species-data"

export default function SpeciesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Species Gallery</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Explore our comprehensive collection of documented bird species with detailed information and beautiful
            imagery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speciesData.map((species) => (
            <SpeciesCard key={species.id} species={species} />
          ))}
        </div>

        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <p className="text-muted-foreground">
            Showing {speciesData.length} species. More species are being added regularly as our detection network
            expands.
          </p>
        </div>
      </div>
    </div>
  )
}
