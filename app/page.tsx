import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight,} from "lucide-react"
import Hero from "@/components/Hero"
import HeroTable from "@/components/HeroTable"
export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <div >
       <Hero/>
       <HeroTable/>
        <section className="py-16 sm:py-20 px-4 bg-amber-300 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-accent/5 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Ready to Optimize Your Aluminum Lifecycle?
            </h2>
            <p className="text-lg text-muted-foreground font-bold mb-8 leading-relaxed max-w-2xl mx-auto">
              Join industry leaders in advancing sustainable metallurgy practices and accelerating the circular economy.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-xl px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
            >
              <Link href="/tool">
                Join Industry Leaders
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
