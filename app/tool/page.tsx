"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { type LCAData, calculateLCAResults } from "@/lib/lca-calculations"
import { LCAResultsDisplay } from "@/components/lca-results"
import { generateLCAPDFReport } from "@/lib/pdf-generator"

const initialData: LCAData = {
  recycledContent: 30,
  originCountry: "",
  carbonIntensity: 500,
  refiningProcess: "",
  electrolysisProcess: "",
  energySource: "",
  energyUse: 14000,
  processType: "",
  scrapGeneration: 15,
  scrapReuse: 85,
  productCategory: "",
  expectedLifespan: 25,
  reuseRepairPotential: 50,
  recyclingMethod: "",
  collectionEfficiency: 75,
  recycledVsLandfilled: 80,
}

export default function ToolPage() {
  const [data, setData] = useState<LCAData>(initialData)
  const [completedSections, setCompletedSections] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(null)

  const updateData = (field: keyof LCAData, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const markSectionComplete = (section: string) => {
    if (!completedSections.includes(section)) {
      setCompletedSections((prev) => [...prev, section])
    }
  }

  const isSectionComplete = (section: string) => completedSections.includes(section)

  const handleGenerateAssessment = () => {
    const lcaResults = calculateLCAResults(data)
    setResults(lcaResults)
    setShowResults(true)
  }

  const handleGeneratePDF = async () => {
    if (!results) return

    try {
      await generateLCAPDFReport({
        inputData: data,
        results: results,
        generatedAt: new Date(),
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF report. Please try again.")
    }
  }

  const InfoTooltip = ({ content }: { content: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  const completionPercentage = (completedSections.length / 5) * 100

  if (showResults && results) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">LCA Assessment Results</h1>
          <p className="text-lg text-gray-600 mb-6">
            Comprehensive environmental impact analysis for your aluminum product
          </p>
          <Button variant="outline" onClick={() => setShowResults(false)} className="mb-4">
            ← Back to Input Form
          </Button>
        </div>

        <LCAResultsDisplay results={results} inputData={data} onGeneratePDF={handleGeneratePDF} />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AluminumLCA - Life Cycle Assessment Tool</h1>
        <p className="text-lg text-gray-600 mb-4">
          Input your aluminum product details to generate comprehensive environmental impact analysis
        </p>
        <p className="text-sm text-gray-500 mb-6">Developed by Team SkyMax, NIT Raipur</p>

        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Assessment Progress</span>
            <span className="text-sm text-gray-500">{Math.round(completionPercentage)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Material Origin Section */}
            <Card className="border rounded-lg shadow-sm">
              <CardHeader className="px-6 py-4 bg-gray-50 rounded-t-lg">
                <div className="flex items-center gap-3">
                  {isSectionComplete("material-origin") && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Complete
                    </Badge>
                  )}
                  <CardTitle className="font-semibold">1. Material Origin</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-6 py-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Recycled Content (%)</Label>
                      <InfoTooltip content="Percentage of recycled aluminum vs primary aluminum from bauxite. Higher recycled content significantly reduces environmental impact." />
                    </div>
                    <div className="px-3">
                      <Slider
                        value={[data.recycledContent]}
                        onValueChange={([value]) => updateData("recycledContent", value)}
                        max={100}
                        step={5}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>0% (Primary)</span>
                        <span className="font-medium">{data.recycledContent}%</span>
                        <span>100% (Recycled)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Origin Country</Label>
                      <InfoTooltip content="Geographic location affects energy grid composition and transportation emissions." />
                    </div>
                    <Select value={data.originCountry} onValueChange={(value) => updateData("originCountry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country of origin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="china">China</SelectItem>
                        <SelectItem value="russia">Russia</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="uae">UAE</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="norway">Norway</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Carbon Intensity (kg CO₂-eq/ton)</Label>
                      <InfoTooltip content="Carbon emissions associated with the energy grid in the origin country." />
                    </div>
                    <Input
                      type="number"
                      value={data.carbonIntensity}
                      onChange={(e) => updateData("carbonIntensity", Number(e.target.value))}
                      placeholder="500"
                    />
                  </div>

                  <Button
                    onClick={() => markSectionComplete("material-origin")}
                    className="w-full"
                    disabled={!data.originCountry}
                  >
                    Complete Material Origin
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Processing Section */}
            <Card className="border rounded-lg shadow-sm">
              <CardHeader className="px-6 py-4 bg-gray-50 rounded-t-lg">
                <div className="flex items-center gap-3">
                  {isSectionComplete("processing") && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Complete
                    </Badge>
                  )}
                  <CardTitle className="font-semibold">2. Production & Processing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-6 py-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Refining Process</Label>
                      <InfoTooltip content="Bayer Process is standard for alumina refining from bauxite ore." />
                    </div>
                    <Select
                      value={data.refiningProcess}
                      onValueChange={(value) => updateData("refiningProcess", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select refining process" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bayer">Bayer Process</SelectItem>
                        <SelectItem value="alternative">Alternative Process</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Electrolysis Process</Label>
                      <InfoTooltip content="Hall-Héroult is the standard process for aluminum production from alumina." />
                    </div>
                    <Select
                      value={data.electrolysisProcess}
                      onValueChange={(value) => updateData("electrolysisProcess", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select electrolysis process" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hall-heroult">Hall-Héroult Process</SelectItem>
                        <SelectItem value="inert-anode">Inert Anode Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Energy Source</Label>
                      <InfoTooltip content="Energy source composition dramatically impacts carbon footprint." />
                    </div>
                    <Select value={data.energySource} onValueChange={(value) => updateData("energySource", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary energy source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid-mix">Grid Mix</SelectItem>
                        <SelectItem value="fossil">Fossil Fuels</SelectItem>
                        <SelectItem value="hydro">Hydroelectric</SelectItem>
                        <SelectItem value="solar">Solar</SelectItem>
                        <SelectItem value="wind">Wind</SelectItem>
                        <SelectItem value="nuclear">Nuclear</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Energy Use (kWh/ton)</Label>
                      <InfoTooltip content="Total energy consumption for aluminum production. Typical range: 13,000-15,000 kWh/ton for primary aluminum." />
                    </div>
                    <Input
                      type="number"
                      value={data.energyUse}
                      onChange={(e) => updateData("energyUse", Number(e.target.value))}
                      placeholder="14000"
                    />
                  </div>

                  <Button
                    onClick={() => markSectionComplete("processing")}
                    className="w-full"
                    disabled={!data.refiningProcess || !data.electrolysisProcess || !data.energySource}
                  >
                    Complete Processing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Manufacturing Section */}
            <Card className="border rounded-lg shadow-sm">
              <CardHeader className="px-6 py-4 bg-gray-50 rounded-t-lg">
                <div className="flex items-center gap-3">
                  {isSectionComplete("manufacturing") && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Complete
                    </Badge>
                  )}
                  <CardTitle className="font-semibold">3. Manufacturing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-6 py-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Process Type</Label>
                      <InfoTooltip content="Different manufacturing processes have varying energy requirements and scrap generation rates." />
                    </div>
                    <Select value={data.processType} onValueChange={(value) => updateData("processType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select manufacturing process" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rolling">Rolling</SelectItem>
                        <SelectItem value="extrusion">Extrusion</SelectItem>
                        <SelectItem value="casting">Casting</SelectItem>
                        <SelectItem value="forging">Forging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Scrap Generation Rate (%)</Label>
                      <InfoTooltip content="Percentage of material that becomes scrap during manufacturing process." />
                    </div>
                    <div className="px-3">
                      <Slider
                        value={[data.scrapGeneration]}
                        onValueChange={([value]) => updateData("scrapGeneration", value)}
                        max={50}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>0%</span>
                        <span className="font-medium">{data.scrapGeneration}%</span>
                        <span>50%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Scrap Reuse Rate (%)</Label>
                      <InfoTooltip content="Percentage of manufacturing scrap that is recycled back into the process." />
                    </div>
                    <div className="px-3">
                      <Slider
                        value={[data.scrapReuse]}
                        onValueChange={([value]) => updateData("scrapReuse", value)}
                        max={100}
                        step={5}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>0%</span>
                        <span className="font-medium">{data.scrapReuse}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => markSectionComplete("manufacturing")}
                    className="w-full"
                    disabled={!data.processType}
                  >
                    Complete Manufacturing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Use Phase Section */}
            <Card className="border rounded-lg shadow-sm">
              <CardHeader className="px-6 py-4 bg-gray-50 rounded-t-lg">
                <div className="flex items-center gap-3">
                  {isSectionComplete("use-phase") && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Complete
                    </Badge>
                  )}
                  <CardTitle className="font-semibold">4. Use Phase</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-6 py-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Product Category</Label>
                      <InfoTooltip content="Product application affects expected lifespan and end-of-life scenarios." />
                    </div>
                    <Select
                      value={data.productCategory}
                      onValueChange={(value) => updateData("productCategory", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="building">Building & Construction</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="packaging">Packaging</SelectItem>
                        <SelectItem value="aerospace">Aerospace</SelectItem>
                        <SelectItem value="electrical">Electrical & Electronics</SelectItem>
                        <SelectItem value="machinery">Machinery & Equipment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Expected Lifespan (years)</Label>
                      <InfoTooltip content="Typical service life of the aluminum product in its intended application." />
                    </div>
                    <div className="px-3">
                      <Slider
                        value={[data.expectedLifespan]}
                        onValueChange={([value]) => updateData("expectedLifespan", value)}
                        min={1}
                        max={100}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>1 year</span>
                        <span className="font-medium">{data.expectedLifespan} years</span>
                        <span>100 years</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Reuse/Repair Potential (%)</Label>
                      <InfoTooltip content="Likelihood that the product can be reused or repaired to extend its lifespan." />
                    </div>
                    <div className="px-3">
                      <Slider
                        value={[data.reuseRepairPotential]}
                        onValueChange={([value]) => updateData("reuseRepairPotential", value)}
                        max={100}
                        step={5}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>0%</span>
                        <span className="font-medium">{data.reuseRepairPotential}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => markSectionComplete("use-phase")}
                    className="w-full"
                    disabled={!data.productCategory}
                  >
                    Complete Use Phase
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* End of Life Section */}
            <Card className="border rounded-lg shadow-sm">
              <CardHeader className="px-6 py-4 bg-gray-50 rounded-t-lg">
                <div className="flex items-center gap-3">
                  {isSectionComplete("end-of-life") && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Complete
                    </Badge>
                  )}
                  <CardTitle className="font-semibold">5. End-of-Life</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-6 py-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Recycling Method</Label>
                      <InfoTooltip content="Closed-loop maintains material quality; downcycling reduces performance for future applications." />
                    </div>
                    <Select
                      value={data.recyclingMethod}
                      onValueChange={(value) => updateData("recyclingMethod", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select recycling method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="closed-loop">Closed-Loop Recycling</SelectItem>
                        <SelectItem value="downcycling">Downcycling</SelectItem>
                        <SelectItem value="mixed">Mixed Methods</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Collection Efficiency (%)</Label>
                      <InfoTooltip content="Percentage of aluminum products successfully collected for recycling at end-of-life." />
                    </div>
                    <div className="px-3">
                      <Slider
                        value={[data.collectionEfficiency]}
                        onValueChange={([value]) => updateData("collectionEfficiency", value)}
                        max={100}
                        step={5}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>0%</span>
                        <span className="font-medium">{data.collectionEfficiency}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="text-base font-medium">Recycled vs Landfilled (%)</Label>
                      <InfoTooltip content="Of collected material, percentage that is successfully recycled vs sent to landfill." />
                    </div>
                    <div className="px-3">
                      <Slider
                        value={[data.recycledVsLandfilled]}
                        onValueChange={([value]) => updateData("recycledVsLandfilled", value)}
                        max={100}
                        step={5}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>0% (Landfilled)</span>
                        <span className="font-medium">{data.recycledVsLandfilled}% Recycled</span>
                        <span>100% (Recycled)</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => markSectionComplete("end-of-life")}
                    className="w-full"
                    disabled={!data.recyclingMethod}
                  >
                    Complete End-of-Life
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 px-8"
              disabled={completedSections.length < 5}
              onClick={handleGenerateAssessment}
            >
              Generate LCA Assessment
            </Button>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Assessment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Current Inputs</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recycled Content:</span>
                    <span className="font-medium">{data.recycledContent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Origin Country:</span>
                    <span className="font-medium">{data.originCountry || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Energy Use:</span>
                    <span className="font-medium">{data.energyUse.toLocaleString()} kWh/ton</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product Category:</span>
                    <span className="font-medium">{data.productCategory || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Lifespan:</span>
                    <span className="font-medium">{data.expectedLifespan} years</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium text-gray-900 mb-2">Completion Status</h4>
                <div className="space-y-2">
                  {[
                    { key: "material-origin", label: "Material Origin" },
                    { key: "processing", label: "Processing" },
                    { key: "manufacturing", label: "Manufacturing" },
                    { key: "use-phase", label: "Use Phase" },
                    { key: "end-of-life", label: "End-of-Life" },
                  ].map((section) => (
                    <div key={section.key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{section.label}</span>
                      {isSectionComplete(section.key) ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                          ✓
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          Pending
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
