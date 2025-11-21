import Link from "next/link"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">© {currentYear} Wildlife Echoes. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="/credits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Credits
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
