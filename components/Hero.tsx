"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, BarChart3, Github } from "lucide-react" // Add GitHub import

function Hero() {
  return (
    <section className="relative h-screen w-full px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Background Overlay with subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/90 to-blue-100/50 z-0"></div>

      {/* Enhanced Decorative Blurs with blue theme */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-float z-0"></div>
      <div className="absolute top-40 right-20 w-60 h-60 bg-blue-300/15 rounded-full blur-2xl animate-float z-0" style={{ animationDelay: "0.5s" }}></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float z-0" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl animate-float z-0" style={{ animationDelay: "1.5s" }}></div>

      {/* Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-center items-center text-center">
        {/* Modern Tagline */}
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200/50 text-blue-700 text-sm font-medium mb-8 animate-slide-in shadow-lg backdrop-blur-sm">
          <Zap className="w-4 h-4 mr-2 text-blue-600" />
          AI-Powered Sustainability Analytics
        </div>

        {/* Main Heading with enhanced gradient */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 text-balance leading-tight animate-slide-in">
          AI-Powered LCA for{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
            Sustainable Materials
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl sm:text-2xl text-blue-600/80 mb-10 max-w-3xl mx-auto text-pretty leading-relaxed animate-slide-in font-medium"
          style={{ animationDelay: "0.2s" }}
        >
          Accelerating Circularity in the Metallurgy Sector
        </p>

        {/* Enhanced Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group animate-pulse-glow border-0"
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
            className="rounded-2xl px-8 py-4 text-lg font-semibold border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-300 transition-all duration-300 group bg-white/80 backdrop-blur-sm shadow-lg"
          >
            <Link href="/about">
              Learn More
              <BarChart3 className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </Link>
          </Button>
        </div>

        {/* New 'See Code' Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 animate-slide-in">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-2xl px-8 py-4 text-lg font-semibold border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-300 transition-all duration-300 group bg-white/80 backdrop-blur-sm shadow-lg"
          >
            <Link href="https://github.com/Coder-Philosopher/Vulcan" target="_blank">
              See Code
              <Github className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
