"use client"
import type { LCAData } from "@/lib/lca-calculations"

interface AluminumFlowChartProps {
  data: LCAData
}

export function AluminumFlowChart({ data }: AluminumFlowChartProps) {
  // Calculate flow values based on input data
  const totalInput = 1000 // Base 1000 kg for visualization
  const recycledInput = (data.recycledContent / 100) * totalInput
  const primaryInput = totalInput - recycledInput

  const manufacturingLoss = (data.scrapGeneration / 100) * totalInput
  const manufacturingOutput = totalInput - manufacturingLoss
  const scrapRecovered = (data.scrapReuse / 100) * manufacturingLoss

  const usePhaseOutput = manufacturingOutput
  const collectedEOL = (data.collectionEfficiency / 100) * usePhaseOutput
  const recycledEOL = (data.recycledVsLandfilled / 100) * collectedEOL
  const landfilled = usePhaseOutput - recycledEOL

  const sankeyData = {
    nodes: [
      { name: "Bauxite Mining" },
      { name: "Recycled Aluminum" },
      { name: "Aluminum Production" },
      { name: "Manufacturing" },
      { name: "Products in Use" },
      { name: "End of Life Collection" },
      { name: "Recycling" },
      { name: "Landfill/Loss" },
      { name: "Manufacturing Scrap" },
    ],
    links: [
      { source: 0, target: 2, value: primaryInput },
      { source: 1, target: 2, value: recycledInput },
      { source: 2, target: 3, value: totalInput },
      { source: 3, target: 4, value: manufacturingOutput },
      { source: 3, target: 8, value: manufacturingLoss },
      { source: 8, target: 2, value: scrapRecovered },
      { source: 4, target: 5, value: collectedEOL },
      { source: 5, target: 6, value: recycledEOL },
      { source: 6, target: 1, value: recycledEOL },
      { source: 4, target: 7, value: landfilled },
    ],
  }

  // Simplified flow visualization using boxes and arrows
  const FlowBox = ({ title, value, color = "bg-blue-100" }: { title: string; value: number; color?: string }) => (
    <div className={`${color} p-3 rounded-lg text-center min-w-[120px]`}>
      <div className="font-medium text-sm">{title}</div>
      <div className="text-lg font-bold">{Math.round(value)} kg</div>
    </div>
  )

  const Arrow = ({ direction = "right" }: { direction?: "right" | "down" }) => (
    <div className={`flex items-center justify-center ${direction === "down" ? "rotate-90" : ""}`}>
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Aluminum Material Flow</h3>
        <p className="text-sm text-gray-600">Based on 1,000 kg input material</p>
      </div>

      {/* Primary Flow */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <FlowBox title="Bauxite Mining" value={primaryInput} color="bg-orange-100" />
        <Arrow />
        <FlowBox title="Aluminum Production" value={totalInput} color="bg-blue-100" />
        <Arrow />
        <FlowBox title="Manufacturing" value={manufacturingOutput} color="bg-green-100" />
        <Arrow />
        <FlowBox title="Products in Use" value={usePhaseOutput} color="bg-purple-100" />
      </div>

      {/* Recycling Loop */}
      <div className="flex flex-wrap items-center justify-center gap-4 bg-gray-50 p-4 rounded-lg">
        <FlowBox title="Recycled Input" value={recycledInput} color="bg-green-200" />
        <Arrow />
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Circular Flow</div>
          <div className="w-16 h-16 border-2 border-green-500 border-dashed rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
        </div>
        <Arrow />
        <FlowBox title="EOL Recycling" value={recycledEOL} color="bg-green-200" />
      </div>

      {/* Losses */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <FlowBox title="Manufacturing Scrap" value={manufacturingLoss - scrapRecovered} color="bg-yellow-100" />
        <FlowBox title="Landfilled/Lost" value={landfilled} color="bg-red-100" />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{Math.round((recycledEOL / totalInput) * 100)}%</div>
          <div className="text-sm text-gray-600">Material Recovered</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{Math.round((landfilled / totalInput) * 100)}%</div>
          <div className="text-sm text-gray-600">Material Lost</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(((recycledInput + scrapRecovered) / totalInput) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Circular Input</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{Math.round((usePhaseOutput / totalInput) * 100)}%</div>
          <div className="text-sm text-gray-600">Useful Output</div>
        </div>
      </div>
    </div>
  )
}
