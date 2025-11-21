"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const carouselImages = [
  {
    src: "/lush-green-forest-canopy-with-sunlight-filtering-t.jpg",
    alt: "Forest canopy",
    caption: "Lush forest habitats",
  },
  {
    src: "/colorful-birds-perched-on-tree-branches-in-nature.jpg",
    alt: "Birds in nature",
    caption: "Diverse bird species",
  },
  {
    src: "/natural-wetland-bird-habitat-with-water-and-reeds.jpg",
    alt: "Wetland habitat",
    caption: "Critical wetland ecosystems",
  },
  {
    src: "/bird-in-flight-against-blue-sky.jpg",
    alt: "Bird in flight",
    caption: "Freedom of flight",
  },
]

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg group">
      <div className="relative aspect-[2/1]">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              index === currentIndex ? "opacity-100" : "opacity-0",
            )}
          >
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-lg font-medium">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous image</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next image</span>
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/75",
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
