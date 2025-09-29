import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Hero from "@/components/Hero"
import HeroTable from "@/components/HeroTable"

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div>
        <Hero/>
        <HeroTable/>
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600/10 via-blue-400/5 to-slate-50 relative overflow-hidden">
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-4 text-balance">
              Ready to Optimize Your Aluminum Lifecycle?
            </h2>
            <p className="text-lg text-blue-700/80 font-medium mb-8 leading-relaxed max-w-2xl mx-auto">
              Join industry leaders in advancing sustainable metallurgy practices and accelerating the circular economy.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group border-0"
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
