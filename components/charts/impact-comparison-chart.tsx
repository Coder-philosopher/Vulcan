"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { EnvironmentalImpact } from "@/lib/lca-calculations"

interface ImpactComparisonChartProps {
  currentScenario: EnvironmentalImpact
  linearScenario: EnvironmentalImpact
}

export function ImpactComparisonChart({ currentScenario, linearScenario }: ImpactComparisonChartProps) {
  const data = [
    {
      category: "Carbon Footprint",
      unit: "kg CO₂-eq/ton",
      linear: Math.round(linearScenario.carbonFootprint / 1000), // Convert to thousands for readability
      current: Math.round(currentScenario.carbonFootprint / 1000),
    },
    {
      category: "Water Usage",
      unit: "L/ton",
      linear: Math.round(linearScenario.waterUsage / 100), // Convert to hundreds for readability
      current: Math.round(currentScenario.waterUsage / 100),
    },
    {
      category: "Energy Use",
      unit: "MWh/ton",
      linear: Math.round(linearScenario.energyConsumption / 1000), // Convert to MWh
      current: Math.round(currentScenario.energyConsumption / 1000),
    },
    {
      category: "Toxic Waste",
      unit: "kg/ton",
      linear: Math.round(linearScenario.toxicWasteOutput / 100), // Convert to hundreds
      current: Math.round(currentScenario.toxicWasteOutput / 100),
    },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-red-600">
            Linear: {payload[1].value} {data.unit}
          </p>
          <p className="text-blue-600">
            Your Scenario: {payload[0].value} {data.unit}
          </p>
          <p className="text-green-600 text-sm">
            Reduction: {Math.round(((payload[1].value - payload[0].value) / payload[1].value) * 100)}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={80} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="current" fill="#2563eb" name="Your Scenario" radius={[2, 2, 0, 0]} />
        <Bar dataKey="linear" fill="#dc2626" name="Linear Economy" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
