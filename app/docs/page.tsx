import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function DocsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
        <p className="text-xl text-gray-600">Comprehensive guide to using the Aluminum LCA Tool effectively</p>
        <div className="mt-4">
          <Badge variant="outline" className="text-sm">
            Developed by Team SkyMax - NIT Raipur
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="inputs" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inputs">Input Fields</TabsTrigger>
          <TabsTrigger value="glossary">Glossary</TabsTrigger>
          <TabsTrigger value="calculations">Calculations</TabsTrigger>
          <TabsTrigger value="methodology">Methodology</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Input Fields Guide</h2>
            <p className="text-lg text-gray-600">Detailed explanation of all assessment parameters</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  Material Origin
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Recycled Content (%)</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Percentage split between primary aluminum from bauxite mining and recycled aluminum content.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    High Impact Factor
                  </Badge>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Origin Country</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Geographic location affects energy grid composition and transportation emissions.
                  </p>
                  <Badge variant="outline" className="text-xs">
                    Medium Impact
                  </Badge>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Carbon Intensity</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Regional energy grid carbon emissions per unit of energy consumed.
                  </p>
                  <Badge variant="outline" className="text-xs">
                    Medium Impact
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 hover:border-green-200 transition-colors">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  Processing Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Refining Process</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Bayer Process is standard for alumina refining. Alternative processes may have different profiles.
                  </p>
                  <Badge variant="outline" className="text-xs">
                    Process Selection
                  </Badge>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Energy Source Mix</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Electricity source composition dramatically impacts carbon footprint.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    Critical Factor
                  </Badge>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Energy Consumption</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Total energy required for aluminum production (typical: 13-15 kWh/kg).
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    High Impact Factor
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
              <CardHeader className="bg-orange-50">
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  Manufacturing Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Process Type</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Rolling, extrusion, and casting have different energy requirements and scrap rates.
                  </p>
                  <Badge variant="outline" className="text-xs">
                    Process Efficiency
                  </Badge>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Scrap Generation & Reuse</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Manufacturing scrap that can be immediately recycled back into the process.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    Circularity Factor
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 hover:border-purple-200 transition-colors">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  Use Phase & End-of-Life
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Product Lifespan</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Expected service life varies by application (packaging: 1 year, construction: 50+ years).
                  </p>
                  <Badge variant="outline" className="text-xs">
                    Longevity Impact
                  </Badge>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Collection & Recycling</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Efficiency of collection systems and quality of recycling processes.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    Circularity Key
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-center">Quick Reference: Impact Hierarchy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-bold text-red-600 mb-2">Highest Impact</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Recycled Content %</li>
                    <li>• Energy Source Mix</li>
                    <li>• Energy Consumption</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-bold text-orange-600 mb-2">Medium Impact</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Origin Country</li>
                    <li>• Manufacturing Process</li>
                    <li>• Product Lifespan</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-bold text-green-600 mb-2">Optimization Factors</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Scrap Reuse Rate</li>
                    <li>• Collection Efficiency</li>
                    <li>• Recycling Quality</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="glossary" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Metallurgical & Sustainability Glossary</h2>
            <p className="text-lg text-gray-600">Essential terms for aluminum lifecycle assessment</p>
          </div>

          <div className="grid gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                  P
                </span>
                Production Processes
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    term: "Bayer Process",
                    definition:
                      "Industrial process for refining bauxite to produce alumina (aluminum oxide), involving digestion with sodium hydroxide at high temperature and pressure.",
                    category: "Primary Production",
                  },
                  {
                    term: "Hall-Héroult Process",
                    definition:
                      "Electrolytic process for producing aluminum from alumina, requiring significant electrical energy input (typically 13-15 kWh per kg aluminum).",
                    category: "Primary Production",
                  },
                  {
                    term: "Red Mud",
                    definition:
                      "Alkaline waste product from the Bayer process, containing iron oxides and other residues. Approximately 1.5-2 tons generated per ton of alumina.",
                    category: "Waste Product",
                  },
                ].map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{item.term}</h4>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{item.definition}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
                  C
                </span>
                Circular Economy
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    term: "Closed-Loop Recycling",
                    definition:
                      "Recycling process where aluminum maintains its original quality and properties, allowing infinite recycling without degradation.",
                    category: "Recycling",
                  },
                  {
                    term: "Downcycling",
                    definition:
                      "Recycling process where material quality is reduced, limiting future applications and recycling potential.",
                    category: "Recycling",
                  },
                  {
                    term: "Circularity Score",
                    definition:
                      "Composite metric (0-100) measuring how well a material or product follows circular economy principles, considering recycling, reuse, and resource efficiency.",
                    category: "Assessment",
                  },
                ].map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{item.term}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{item.definition}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs">
                  E
                </span>
                Environmental Metrics
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    term: "Carbon Intensity",
                    definition:
                      "Amount of CO₂ equivalent emissions per unit of energy or material produced, measured in kg CO₂-eq/kWh or kg CO₂-eq/kg.",
                    category: "Emissions",
                  },
                  {
                    term: "Embodied Energy",
                    definition:
                      "Total energy consumed during the entire lifecycle of aluminum production, from mining to final product manufacturing.",
                    category: "Energy",
                  },
                ].map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{item.term}</h4>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{item.definition}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calculations" className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI Simulation Methods</h2>

          <Card>
            <CardHeader>
              <CardTitle>Circularity Score Calculation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                The circularity score is calculated using a weighted formula combining multiple factors:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                <div>Circularity Score = (</div>
                <div className="ml-4">Recycled Content × 0.35 +</div>
                <div className="ml-4">Recovery Rate × 0.25 +</div>
                <div className="ml-4">Life Extension × 0.20 +</div>
                <div className="ml-4">Scrap Reuse × 0.10 +</div>
                <div className="ml-4">Energy Efficiency × 0.10</div>
                <div>) × 100</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Impact Category</th>
                      <th className="text-left p-2">Unit</th>
                      <th className="text-left p-2">Primary Al</th>
                      <th className="text-left p-2">Recycled Al</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b">
                      <td className="p-2">Carbon Footprint</td>
                      <td className="p-2">kg CO₂-eq/ton</td>
                      <td className="p-2">11,000-17,000</td>
                      <td className="p-2">500-1,500</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Energy Consumption</td>
                      <td className="p-2">kWh/ton</td>
                      <td className="p-2">13,000-15,000</td>
                      <td className="p-2">500-750</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Water Usage</td>
                      <td className="p-2">Liters/ton</td>
                      <td className="p-2">1,500-3,000</td>
                      <td className="p-2">50-150</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methodology" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Assessment Methodology</h2>
            <p className="text-lg text-gray-600">Scientific framework and AI simulation approach</p>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-blue-100">
              <CardHeader className="bg-blue-50">
                <CardTitle>LCA Framework - ISO 14040/14044 Compliance</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6">
                  Our assessment follows ISO 14040/14044 standards for Life Cycle Assessment, adapted specifically for
                  aluminum products by Team SkyMax:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Goal and Scope Definition",
                      description: "Define system boundaries and functional unit for aluminum products",
                      color: "blue",
                    },
                    {
                      step: "2",
                      title: "Inventory Analysis",
                      description: "Quantify inputs and outputs for each lifecycle stage",
                      color: "green",
                    },
                    {
                      step: "3",
                      title: "Impact Assessment",
                      description: "Calculate environmental impacts using characterization factors",
                      color: "orange",
                    },
                    {
                      step: "4",
                      title: "Interpretation",
                      description: "Analyze results and identify improvement opportunities",
                      color: "purple",
                    },
                  ].map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`w-8 h-8 bg-${item.color}-600 text-white rounded-full flex items-center justify-center text-sm font-bold`}
                        >
                          {item.step}
                        </span>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 ml-11">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                Important Disclaimer
              </h3>
              <p className="text-yellow-700 mb-4">
                This frontend-only version uses simulated AI calculations based on industry averages and established LCA
                databases. Production deployment will integrate with actual AI models trained on comprehensive datasets
                for enhanced accuracy and real-time optimization recommendations.
              </p>
              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Developed by Team SkyMax, NIT Raipur:</strong> This tool represents our commitment to
                  advancing sustainable aluminum production through innovative assessment methodologies.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
