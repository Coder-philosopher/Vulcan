"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { LCAResults, LCAData } from "@/lib/lca-calculations"
import { TrendingUp, TrendingDown, Leaf, Zap, Droplets, Mountain, Trash2, BarChart3, Activity } from "lucide-react"
import { CircularityGauge } from "./charts/circularity-gauge"
import { ImpactComparisonChart } from "./charts/impact-comparison-chart"
import { AluminumFlowChart } from "./charts/aluminum-flow-chart"

interface LCAResultsProps {
  results: LCAResults
  inputData: LCAData
  onGeneratePDF: () => void
}

export function LCAResultsDisplay({ results, inputData, onGeneratePDF }: LCAResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50"
    if (score >= 65) return "text-blue-600 bg-blue-50"
    if (score >= 45) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getImpactColor = (current: number, linear: number) => {
    const improvement = ((linear - current) / linear) * 100
    if (improvement >= 50) return "text-green-600"
    if (improvement >= 25) return "text-blue-600"
    if (improvement >= 0) return "text-yellow-600"
    return "text-red-600"
  }

  const formatNumber = (num: number) => num.toLocaleString()

  const impactReduction = (current: number, linear: number) => {
    return Math.round(((linear - current) / linear) * 100)
  }

  return (
    <div className="space-y-8">
      {/* Circularity Score with Gauge */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            Circularity Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className={`text-4xl font-bold px-4 py-2 rounded-lg ${getScoreColor(results.circularityScore)}`}>
                  {results.circularityScore}
                </div>
                <div>
                  <Badge variant="secondary" className={getScoreColor(results.circularityScore)}>
                    {results.performanceRating.charAt(0).toUpperCase() + results.performanceRating.slice(1)}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">
                    {results.circularityScore >= 80 && "Excellent circular economy implementation"}
                    {results.circularityScore >= 65 &&
                      results.circularityScore < 80 &&
                      "Good circularity with room for improvement"}
                    {results.circularityScore >= 45 &&
                      results.circularityScore < 65 &&
                      "Moderate circularity - significant opportunities exist"}
                    {results.circularityScore < 45 && "Poor circularity - major improvements needed"}
                  </p>
                </div>
              </div>
              <Progress value={results.circularityScore} className="h-3" />
            </div>
            <div className="flex justify-center">
              <CircularityGauge score={results.circularityScore} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visualizations Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Impact Visualizations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="comparison" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comparison">Impact Comparison</TabsTrigger>
              <TabsTrigger value="flow">Material Flow</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Linear vs Circular Economy Impact</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Comparison of environmental impacts between traditional linear approach and your circular scenario
                </p>
                <ImpactComparisonChart
                  currentScenario={results.environmentalImpact}
                  linearScenario={results.linearScenario}
                />
              </div>
            </TabsContent>

            <TabsContent value="flow" className="space-y-4">
              <AluminumFlowChart data={inputData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Environmental Impact Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Environmental Impact Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Carbon Footprint</span>
              </div>
              <div className="text-2xl font-bold">
                {formatNumber(results.environmentalImpact.carbonFootprint)}
                <span className="text-sm font-normal text-gray-500 ml-1">kg CO₂-eq/ton</span>
              </div>
              <div
                className={`text-sm flex items-center gap-1 ${getImpactColor(results.environmentalImpact.carbonFootprint, results.linearScenario.carbonFootprint)}`}
              >
                <TrendingDown className="h-3 w-3" />
                {impactReduction(results.environmentalImpact.carbonFootprint, results.linearScenario.carbonFootprint)}%
                vs linear
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Water Usage</span>
              </div>
              <div className="text-2xl font-bold">
                {formatNumber(results.environmentalImpact.waterUsage)}
                <span className="text-sm font-normal text-gray-500 ml-1">L/ton</span>
              </div>
              <div
                className={`text-sm flex items-center gap-1 ${getImpactColor(results.environmentalImpact.waterUsage, results.linearScenario.waterUsage)}`}
              >
                <TrendingDown className="h-3 w-3" />
                {impactReduction(results.environmentalImpact.waterUsage, results.linearScenario.waterUsage)}% vs linear
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mountain className="h-4 w-4 text-green-500" />
                <span className="font-medium">Land Disturbance</span>
              </div>
              <div className="text-2xl font-bold">
                {results.environmentalImpact.landDisturbance}
                <span className="text-sm font-normal text-gray-500 ml-1">m²/ton</span>
              </div>
              <div
                className={`text-sm flex items-center gap-1 ${getImpactColor(results.environmentalImpact.landDisturbance, results.linearScenario.landDisturbance)}`}
              >
                <TrendingDown className="h-3 w-3" />
                {impactReduction(results.environmentalImpact.landDisturbance, results.linearScenario.landDisturbance)}%
                vs linear
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Energy Consumption</span>
              </div>
              <div className="text-2xl font-bold">
                {formatNumber(results.environmentalImpact.energyConsumption)}
                <span className="text-sm font-normal text-gray-500 ml-1">kWh/ton</span>
              </div>
              <div
                className={`text-sm flex items-center gap-1 ${getImpactColor(results.environmentalImpact.energyConsumption, results.linearScenario.energyConsumption)}`}
              >
                <TrendingDown className="h-3 w-3" />
                {impactReduction(
                  results.environmentalImpact.energyConsumption,
                  results.linearScenario.energyConsumption,
                )}
                % vs linear
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-red-500" />
                <span className="font-medium">Toxic Waste Output</span>
              </div>
              <div className="text-2xl font-bold">
                {formatNumber(results.environmentalImpact.toxicWasteOutput)}
                <span className="text-sm font-normal text-gray-500 ml-1">kg/ton</span>
              </div>
              <div
                className={`text-sm flex items-center gap-1 ${getImpactColor(results.environmentalImpact.toxicWasteOutput, results.linearScenario.toxicWasteOutput)}`}
              >
                <TrendingDown className="h-3 w-3" />
                {impactReduction(results.environmentalImpact.toxicWasteOutput, results.linearScenario.toxicWasteOutput)}
                % vs linear
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Improvement Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Improvement Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.improvements.map((improvement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700">{improvement}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Linear vs Circular Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Linear vs Circular Economy Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Impact Category</th>
                  <th className="text-left p-3">Linear Economy</th>
                  <th className="text-left p-3">Circular Economy</th>
                  <th className="text-left p-3">Improvement</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">Carbon Footprint</td>
                  <td className="p-3 text-gray-600">
                    {formatNumber(results.linearScenario.carbonFootprint)} kg CO₂-eq/ton
                  </td>
                  <td className="p-3 font-medium">
                    {formatNumber(results.environmentalImpact.carbonFootprint)} kg CO₂-eq/ton
                  </td>
                  <td className="p-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      -
                      {impactReduction(
                        results.environmentalImpact.carbonFootprint,
                        results.linearScenario.carbonFootprint,
                      )}
                      %
                    </Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Water Usage</td>
                  <td className="p-3 text-gray-600">{formatNumber(results.linearScenario.waterUsage)} L/ton</td>
                  <td className="p-3 font-medium">{formatNumber(results.environmentalImpact.waterUsage)} L/ton</td>
                  <td className="p-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      -{impactReduction(results.environmentalImpact.waterUsage, results.linearScenario.waterUsage)}%
                    </Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Energy Consumption</td>
                  <td className="p-3 text-gray-600">
                    {formatNumber(results.linearScenario.energyConsumption)} kWh/ton
                  </td>
                  <td className="p-3 font-medium">
                    {formatNumber(results.environmentalImpact.energyConsumption)} kWh/ton
                  </td>
                  <td className="p-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      -
                      {impactReduction(
                        results.environmentalImpact.energyConsumption,
                        results.linearScenario.energyConsumption,
                      )}
                      %
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Generate Report Button */}
      <div className="text-center">
        <Button onClick={onGeneratePDF} size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
          Generate PDF Report
        </Button>
      </div>
    </div>
  )
}
