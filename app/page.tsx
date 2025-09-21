import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, BarChart3, Recycle, FileText, Users, Award, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="pt-20">
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-accent/5"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>

          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-foreground text-sm font-medium mb-8 animate-slide-in">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Sustainability Analytics
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight animate-slide-in">
              AI-Powered LCA for{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Sustainable Aluminum
              </span>
            </h1>

            <p
              className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto text-pretty leading-relaxed animate-slide-in"
              style={{ animationDelay: "0.2s" }}
            >
              Accelerating Circularity in the Metallurgy Sector
            </p>

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

        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                Comprehensive Aluminum Lifecycle Analysis
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Advanced AI algorithms analyze every stage of your aluminum products' journey
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Recycle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Circularity Assessment</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    Evaluate recycling rates, material recovery, and circular economy potential with AI-powered insights
                    and predictive modeling.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Environmental Impact</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    Track carbon footprint, water usage, energy consumption, and toxic waste across the entire lifecycle
                    with precision analytics.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm md:col-span-2 lg:col-span-1">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Detailed Reports</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    Generate comprehensive PDF reports with visualizations, benchmarking, and actionable sustainability
                    recommendations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-3 text-center">
              <div className="group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">95%</h3>
                <p className="text-muted-foreground">Accuracy in Impact Prediction</p>
              </div>

              <div className="group">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">500+</h3>
                <p className="text-muted-foreground">Industry Partners</p>
              </div>

              <div className="group">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">40%</h3>
                <p className="text-muted-foreground">Average Carbon Reduction</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-accent/5 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Ready to Optimize Your Aluminum Lifecycle?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
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
