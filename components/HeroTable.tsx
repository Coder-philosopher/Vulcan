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
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 to-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-4 text-balance">
              Comprehensive Aluminum Lifecycle Analysis
            </h2>
            <p className="text-lg text-blue-700/70 max-w-2xl mx-auto font-medium">
              Advanced AI algorithms analyze every stage of your aluminum products' journey.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 - Circularity Assessment */}
            <Card className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border-0 bg-gradient-to-br from-blue-100 to-blue-50 backdrop-blur-sm hover:-translate-y-2">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Recycle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800 mb-3">
                  Circularity Assessment
                </h3>
                <p className="text-blue-700/80 font-medium leading-relaxed flex-grow">
                  Evaluate recycling rates, material recovery, and circular economy potential with AI-powered insights and predictive modeling.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 - Environmental Impact */}
            <Card className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border-0 bg-gradient-to-br from-blue-200 to-blue-100 backdrop-blur-sm hover:-translate-y-2">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                  Environmental Impact
                </h3>
                <p className="font-medium text-blue-800/80 leading-relaxed flex-grow">
                  Track carbon footprint, water usage, energy consumption, and toxic waste across the entire lifecycle with precision analytics.
                </p>
              </CardContent>
            </Card>

            {/* Card 3 - Detailed Reports */}
            <Card className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border-0 bg-gradient-to-br from-blue-300 to-blue-200 backdrop-blur-sm md:col-span-2 lg:col-span-1 hover:-translate-y-2">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                  Detailed Reports
                </h3>
                <p className="text-blue-900/80 font-medium leading-relaxed flex-grow">
                  Generate comprehensive PDF reports with visualizations, benchmarking, and actionable sustainability recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
     
      {/* Section: Stats */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-white to-blue-50 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 md:grid-cols-3 text-center">
            {/* Stat 1 */}
            <div className="group bg-gradient-to-br from-blue-100 to-blue-50 p-8 rounded-3xl border border-blue-200/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-blue-800 mb-2">95%</h3>
              <p className="text-blue-700/80 font-semibold text-lg">Accuracy in Impact Prediction</p>
            </div>

            {/* Stat 2 */}
            <div className="group bg-gradient-to-br from-blue-200 to-blue-100 p-8 rounded-3xl border border-blue-300/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-blue-900 mb-2">70%</h3>
              <p className="text-blue-800/80 font-semibold text-lg">Labour Savings</p>
            </div>

            {/* Stat 3 */}
            <div className="group bg-gradient-to-br from-blue-300 to-blue-200 p-8 rounded-3xl border border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-blue-900 mb-2">40%</h3>
              <p className="text-blue-900/80 font-semibold text-lg">Average Carbon Reduction</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroTable
