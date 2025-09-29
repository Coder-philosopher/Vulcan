"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, BarChart3 } from "lucide-react"

function Hero() {
  return (
    <section className="relative h-screen w-full px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-[#556B2F] to-[#3C5A40]">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f9fafb] to-transparent opacity-80 z-0"></div>

      {/* Decorative Blurs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float z-0"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float z-0"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-center items-center text-center">
        {/* Tagline */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-foreground text-sm font-medium mb-8 animate-slide-in">
          <Zap className="w-4 h-4 mr-2" />
          AI-Powered Sustainability Analytics
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight animate-slide-in">
          AI-Powered LCA for{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sustainable Aluminum
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto text-pretty leading-relaxed animate-slide-in"
          style={{ animationDelay: "0.2s" }}
        >
          Accelerating Circularity in the Metallurgy Sector
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-primary/25 transition-all duration-300 group animate-pulse-glow"
          >
            <Link href="/tool">
              Start Assessment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl px-8 py-4 text-lg font-semibold border-2 hover:bg-muted/50 transition-all duration-300 group bg-transparent"
          >
            <Link href="/about">
              Learn More
              <BarChart3 className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
