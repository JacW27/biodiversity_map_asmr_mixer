import { ASMRMixer } from "@/components/asmr-mixer"

export default function MixerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">ASMR Sound Mixer</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Create your perfect nature soundscape by combining bird calls with ambient sounds and soft music
          </p>
        </div>

        <ASMRMixer />
      </div>
    </div>
  )
}
