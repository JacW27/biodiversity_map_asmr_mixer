import { ImageCarousel } from "@/components/image-carousel"
import { ImpactStats } from "@/components/impact-stats"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, MessageSquare, BirdIcon, Music } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">Welcome to Wildlife Echoes</h1>
            <p className="text-xl text-muted-foreground text-balance leading-relaxed">
              Discover, track, and experience the rich biodiversity of bird species through interactive maps, community
              discussions, and immersive soundscapes.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="/map">
                  Explore Map <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/species">View Species Gallery</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <ImageCarousel />
        </div>
      </section>

      {/* Impact & Results Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Impact & Results</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Our community-driven platform has made significant strides in biodiversity tracking
            </p>
          </div>
          <ImpactStats />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">About Wildlife Echoes</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Wildlife Echoes is an innovative platform dedicated to tracking and celebrating bird biodiversity across
              diverse ecosystems. Our mission is to combine cutting-edge technology with community engagement to create
              a comprehensive database of bird populations and their habitats.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Through advanced audio detection systems and collaborative data collection, we've built a powerful tool
              for researchers, conservationists, and nature enthusiasts alike.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 not-prose">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Interactive Detection Map</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Visualize bird call detections across geographic locations with time-based playback and species
                    filtering.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <BirdIcon className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Species Gallery</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Browse our comprehensive collection of documented bird species with detailed information and
                    imagery.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Community Discussion</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Share observations, photos, and insights with fellow bird enthusiasts and researchers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">ASMR Sound Mixer</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Create custom audio experiences combining bird calls with natural ambient sounds for relaxation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
