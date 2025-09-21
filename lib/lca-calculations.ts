export interface LCAData {
  // Material Origin
  recycledContent: number
  originCountry: string
  carbonIntensity: number

  // Processing
  refiningProcess: string
  electrolysisProcess: string
  energySource: string
  energyUse: number

  // Manufacturing
  processType: string
  scrapGeneration: number
  scrapReuse: number

  // Use Phase
  productCategory: string
  expectedLifespan: number
  reuseRepairPotential: number

  // End of Life
  recyclingMethod: string
  collectionEfficiency: number
  recycledVsLandfilled: number
}

export interface EnvironmentalImpact {
  carbonFootprint: number // kg CO₂-eq/ton
  waterUsage: number // Liters/ton
  landDisturbance: number // m²/ton
  energyConsumption: number // kWh/ton
  toxicWasteOutput: number // kg/ton
}

export interface LCAResults {
  circularityScore: number
  environmentalImpact: EnvironmentalImpact
  linearScenario: EnvironmentalImpact
  improvements: string[]
  performanceRating: "excellent" | "good" | "moderate" | "poor"
}

// Energy source carbon intensity factors (kg CO₂/kWh)
const energySourceFactors = {
  "grid-mix": 0.5,
  fossil: 0.8,
  hydro: 0.02,
  solar: 0.05,
  wind: 0.01,
  nuclear: 0.06,
}

// Country-specific grid factors
const countryGridFactors = {
  china: 0.65,
  russia: 0.45,
  india: 0.7,
  canada: 0.15,
  uae: 0.6,
  australia: 0.75,
  norway: 0.02,
  usa: 0.4,
}

export function calculateCircularityScore(data: LCAData): number {
  // Recycled Content (35% weight)
  const recycledContentScore = (data.recycledContent / 100) * 35

  // Recovery Rate at EOL (25% weight)
  const recoveryRate = (data.collectionEfficiency / 100) * (data.recycledVsLandfilled / 100)
  const recoveryScore = recoveryRate * 25

  // Product Life Extension (20% weight)
  const baseLifespan = getBaseLifespan(data.productCategory)
  const lifeExtension = Math.min(data.expectedLifespan / baseLifespan, 2) // Cap at 2x base
  const lifeExtensionScore = (lifeExtension - 1) * 20 + (data.reuseRepairPotential / 100) * 10

  // Scrap Reuse in Manufacturing (10% weight)
  const scrapReuseScore = (data.scrapReuse / 100) * 10

  // Energy Efficiency Score (10% weight)
  const baseEnergyUse = 14000 // kWh/ton for primary aluminum
  const energyEfficiency = Math.max(0, (baseEnergyUse - data.energyUse) / baseEnergyUse)
  const energyEfficiencyScore = energyEfficiency * 10

  const totalScore = Math.min(
    100,
    Math.max(0, recycledContentScore + recoveryScore + lifeExtensionScore + scrapReuseScore + energyEfficiencyScore),
  )

  return Math.round(totalScore)
}

function getBaseLifespan(category: string): number {
  const lifespans = {
    building: 50,
    automotive: 15,
    packaging: 1,
    aerospace: 30,
    electrical: 10,
    machinery: 20,
  }
  return lifespans[category as keyof typeof lifespans] || 20
}

export function calculateEnvironmentalImpact(data: LCAData): EnvironmentalImpact {
  const energyFactor = energySourceFactors[data.energySource as keyof typeof energySourceFactors] || 0.5
  const countryFactor = countryGridFactors[data.originCountry as keyof typeof countryGridFactors] || 0.5

  // Adjust for recycled content
  const recycledFactor = 1 - (data.recycledContent / 100) * 0.95 // 95% reduction for recycled content

  // Carbon Footprint calculation
  const baseCarbonFootprint = 15000 // kg CO₂-eq/ton for primary aluminum
  const energyCarbonFootprint = data.energyUse * Math.max(energyFactor, countryFactor)
  const carbonFootprint = baseCarbonFootprint * recycledFactor + energyCarbonFootprint

  // Water Usage calculation
  const baseWaterUsage = 2500 // Liters/ton for primary aluminum
  const waterUsage = baseWaterUsage * recycledFactor

  // Land Disturbance calculation
  const baseLandDisturbance = 15 // m²/ton for bauxite mining
  const landDisturbance = baseLandDisturbance * recycledFactor

  // Energy Consumption (already provided)
  const energyConsumption = data.energyUse

  // Toxic Waste Output calculation
  const baseToxicWaste = 1500 // kg/ton (red mud and other waste)
  const toxicWasteOutput = baseToxicWaste * recycledFactor

  return {
    carbonFootprint: Math.round(carbonFootprint),
    waterUsage: Math.round(waterUsage),
    landDisturbance: Math.round(landDisturbance * 10) / 10,
    energyConsumption: Math.round(energyConsumption),
    toxicWasteOutput: Math.round(toxicWasteOutput),
  }
}

export function calculateLinearScenario(data: LCAData): EnvironmentalImpact {
  // Linear scenario assumes 0% recycled content and poor end-of-life management
  const linearData = {
    ...data,
    recycledContent: 0,
    collectionEfficiency: 30,
    recycledVsLandfilled: 20,
    scrapReuse: 50,
  }

  return calculateEnvironmentalImpact(linearData)
}

export function generateImprovements(data: LCAData, results: LCAResults): string[] {
  const improvements: string[] = []

  if (data.recycledContent < 50) {
    improvements.push("Increase recycled aluminum content to reduce primary production impacts")
  }

  if (data.collectionEfficiency < 80) {
    improvements.push("Improve end-of-life collection systems to capture more aluminum for recycling")
  }

  if (data.energySource === "fossil" || data.energySource === "grid-mix") {
    improvements.push("Transition to renewable energy sources for aluminum processing")
  }

  if (data.scrapReuse < 90) {
    improvements.push("Optimize manufacturing processes to increase scrap reuse rates")
  }

  if (data.expectedLifespan < getBaseLifespan(data.productCategory)) {
    improvements.push("Design for durability to extend product lifespan beyond industry average")
  }

  if (data.reuseRepairPotential < 70) {
    improvements.push("Implement design for disassembly and repairability strategies")
  }

  if (results.circularityScore < 60) {
    improvements.push("Develop comprehensive circular economy strategy across all lifecycle stages")
  }

  return improvements.slice(0, 5) // Return top 5 improvements
}

export function getPerformanceRating(score: number): "excellent" | "good" | "moderate" | "poor" {
  if (score >= 80) return "excellent"
  if (score >= 65) return "good"
  if (score >= 45) return "moderate"
  return "poor"
}

export function calculateLCAResults(data: LCAData): LCAResults {
  const circularityScore = calculateCircularityScore(data)
  const environmentalImpact = calculateEnvironmentalImpact(data)
  const linearScenario = calculateLinearScenario(data)
  const performanceRating = getPerformanceRating(circularityScore)
  const improvements = generateImprovements(data, {
    circularityScore,
    environmentalImpact,
    linearScenario,
    performanceRating,
    improvements: [],
  })

  return {
    circularityScore,
    environmentalImpact,
    linearScenario,
    improvements,
    performanceRating,
  }
}
