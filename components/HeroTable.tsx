"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart3,
  Recycle,
  FileText,
  Users,
  Award,
  TrendingUp,
} from "lucide-react"

function HeroTable() {
  return (
    <>
      {/* Section: Feature Cards */}
      <section className="py-16 sm:py-20 bg-amber-300 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto ">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Comprehensive Aluminum Lifecycle Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced AI algorithms analyze every stage of your aluminum products' journey.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-0 bg-red-400 backdrop-blur-sm">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Recycle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Circularity Assessment
                </h3>
                <p className="text-white font-bold leading-relaxed flex-grow">
                  Evaluate recycling rates, material recovery, and circular economy potential with AI-powered insights and predictive modeling.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-0 bg-green-500 backdrop-blur-sm">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Environmental Impact
                </h3>
                <p className="font-bold text-white leading-relaxed flex-grow">
                  Track carbon footprint, water usage, energy consumption, and toxic waste across the entire lifecycle with precision analytics.
                </p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-0 bg-blue-500 backdrop-blur-sm md:col-span-2 lg:col-span-1">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Detailed Reports
                </h3>
                <p className="text-white font-bold leading-relaxed flex-grow">
                  Generate comprehensive PDF reports with visualizations, benchmarking, and actionable sustainability recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
     
      {/* Section: Stats */}
      <section className="py-16 sm:py-20 px-4 bg-amber-200 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 md:grid-cols-3 text-center">
            {/* Stat 1 */}
            <div className="group bg-red-300 p-4 rounded-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">95%</h3>
              <p className="text-white font-bold">Accuracy in Impact Prediction</p>
            </div>

            {/* Stat 2 */}
            <div className="group  bg-green-300 p-4 rounded-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">70%</h3>
              <p className="text-white font-bold">Labour Savings</p>
            </div>

            {/* Stat 3 */}
            <div className="group bg-blue-300 p-4 rounded-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">40%</h3>
              <p className="text-white font-bold">Average Carbon Reduction</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroTable
