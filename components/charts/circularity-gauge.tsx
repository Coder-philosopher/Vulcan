"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface CircularityGaugeProps {
  score: number
  size?: number
}

export function CircularityGauge({ score, size = 200 }: CircularityGaugeProps) {
  const data = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score },
  ]

  const getColor = (score: number) => {
    if (score >= 80) return "#16a34a" // green-600
    if (score >= 65) return "#2563eb" // blue-600
    if (score >= 45) return "#ca8a04" // yellow-600
    return "#dc2626" // red-600
  }

  const getLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 65) return "Good"
    if (score >= 45) return "Moderate"
    return "Poor"
  }

  return (
    <div className="relative flex flex-col items-center">
      <ResponsiveContainer width={size} height={size}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
          >
            <Cell fill={getColor(score)} />
            <Cell fill="#f3f4f6" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
        <div className="text-3xl font-bold" style={{ color: getColor(score) }}>
          {score}
        </div>
        <div className="text-sm text-gray-600 font-medium">{getLabel(score)}</div>
      </div>
    </div>
  )
}
