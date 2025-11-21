import { DiscussionBoard } from "@/components/discussion-board"

export default function DiscussionPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Community Discussion</h1>
          <p className="text-lg text-muted-foreground">
            Share your bird sightings, photos, and observations with the community
          </p>
        </div>

        <DiscussionBoard />
      </div>
    </div>
  )
}
