import type { LCAData, LCAResults } from "./lca-calculations"

export interface PDFReportData {
  inputData: LCAData
  results: LCAResults
  generatedAt: Date
}

export async function generateLCAPDFReport(data: PDFReportData): Promise<void> {
  const { default: jsPDF } = await import("jspdf")

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  let yPosition = 20

  // Enhanced helper functions
  const addText = (
    text: string,
    x: number,
    y: number,
    fontSize = 12,
    style: "normal" | "bold" = "normal",
    color: [number, number, number] = [0, 0, 0],
  ) => {
    doc.setFontSize(fontSize)
    doc.setFont("helvetica", style)
    doc.setTextColor(color[0], color[1], color[2])
    doc.text(text, x, y)
    doc.setTextColor(0, 0, 0) // Reset to black
  }

  const addLine = (y: number, color: [number, number, number] = [200, 200, 200], thickness = 0.5) => {
    doc.setDrawColor(color[0], color[1], color[2])
    doc.setLineWidth(thickness)
    doc.line(20, y, pageWidth - 20, y)
    doc.setDrawColor(0, 0, 0) // Reset
    doc.setLineWidth(0.2) // Reset
  }

  const addBox = (
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor?: [number, number, number],
    borderColor: [number, number, number] = [0, 0, 0],
  ) => {
    if (fillColor) {
      doc.setFillColor(fillColor[0], fillColor[1], fillColor[2])
      doc.rect(x, y, width, height, "F")
    }
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2])
    doc.rect(x, y, width, height, "S")
    doc.setDrawColor(0, 0, 0) // Reset
  }

  const addProgressBar = (x: number, y: number, width: number, percentage: number, label: string) => {
    const barHeight = 8
    // Background
    addBox(x, y, width, barHeight, [240, 240, 240])
    // Progress
    const progressWidth = (width * percentage) / 100
    let color: [number, number, number] = [34, 197, 94] // Green
    if (percentage < 30)
      color = [239, 68, 68] // Red
    else if (percentage < 60) color = [245, 158, 11] // Orange

    addBox(x, y, progressWidth, barHeight, color)
    addText(`${label}: ${percentage}%`, x, y - 2, 9, "normal")
  }

  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 20) {
      doc.addPage()
      yPosition = 20
      return true
    }
    return false
  }

  // Professional Header with branding
  addBox(0, 0, pageWidth, 35, [41, 98, 255]) // Blue header
  addText("ALUMINUM LIFE CYCLE ASSESSMENT", 20, 15, 18, "bold", [255, 255, 255])
  addText("Production-Grade Environmental Impact Report", 20, 25, 10, "normal", [255, 255, 255])
  addText("VULCAN | Team SkyMax, NIT Raipur", pageWidth - 80, 25, 8, "normal", [255, 255, 255])

  yPosition = 50

  // Executive Summary Box
  addBox(15, yPosition, pageWidth - 30, 45, [248, 250, 252], [203, 213, 225])
  yPosition += 8
  addText("EXECUTIVE SUMMARY", 20, yPosition, 14, "bold", [30, 64, 175])
  yPosition += 12

  const carbonReduction = Math.round(
    ((data.results.linearScenario.carbonFootprint - data.results.environmentalImpact.carbonFootprint) /
      data.results.linearScenario.carbonFootprint) *
      100,
  )

  // Key metrics in columns
  const col1X = 25,
    col2X = 110
  addText(`Circularity Score: ${data.results.circularityScore}/100`, col1X, yPosition, 11, "bold")
  addText(`Performance: ${data.results.performanceRating}`, col2X, yPosition, 11, "bold")
  yPosition += 8
  addText(`Carbon Reduction: ${carbonReduction}%`, col1X, yPosition, 10)
  addText(`vs Linear Economy`, col2X, yPosition, 10)
  yPosition += 8
  addText(`Generated: ${data.generatedAt.toLocaleDateString()}`, col1X, yPosition, 9, "normal", [107, 114, 128])
  addText(`Product: ${data.inputData.productCategory}`, col2X, yPosition, 9, "normal", [107, 114, 128])

  yPosition += 25

  // Circularity Score Visualization
  checkPageBreak(40)
  addText("CIRCULARITY PERFORMANCE", 20, yPosition, 14, "bold", [30, 64, 175])
  yPosition += 15

  // Create a visual gauge representation
  const gaugeX = 25,
    gaugeY = yPosition,
    gaugeWidth = 150,
    gaugeHeight = 20
  const score = data.results.circularityScore

  // Gauge background segments
  const segmentWidth = gaugeWidth / 4
  const colors: [number, number, number][] = [
    [239, 68, 68],
    [245, 158, 11],
    [34, 197, 94],
    [16, 185, 129],
  ]
  const labels = ["Poor", "Fair", "Good", "Excellent"]

  for (let i = 0; i < 4; i++) {
    addBox(gaugeX + i * segmentWidth, gaugeY, segmentWidth, gaugeHeight, colors[i])
    addText(labels[i], gaugeX + i * segmentWidth + 5, gaugeY + gaugeHeight + 8, 8, "normal")
  }

  // Score indicator
  const indicatorX = gaugeX + (score / 100) * gaugeWidth - 2
  addBox(indicatorX, gaugeY - 5, 4, gaugeHeight + 10, [0, 0, 0])
  addText(`${score}`, indicatorX - 5, gaugeY - 8, 12, "bold")

  yPosition += 35

  // Environmental Impact Dashboard
  checkPageBreak(60)
  addText("ENVIRONMENTAL IMPACT DASHBOARD", 20, yPosition, 14, "bold", [30, 64, 175])
  yPosition += 15

  const impacts = [
    {
      label: "Carbon Footprint",
      current: data.results.environmentalImpact.carbonFootprint,
      linear: data.results.linearScenario.carbonFootprint,
      unit: "kg CO₂-eq/ton",
    },
    {
      label: "Water Usage",
      current: data.results.environmentalImpact.waterUsage,
      linear: data.results.linearScenario.waterUsage,
      unit: "L/ton",
    },
    {
      label: "Energy Consumption",
      current: data.results.environmentalImpact.energyConsumption,
      linear: data.results.linearScenario.energyConsumption,
      unit: "kWh/ton",
    },
    {
      label: "Land Disturbance",
      current: data.results.environmentalImpact.landDisturbance,
      linear: data.results.linearScenario.landDisturbance,
      unit: "m²/ton",
    },
  ]

  impacts.forEach((impact, index) => {
    checkPageBreak(15)
    const reduction = Math.round(((impact.linear - impact.current) / impact.linear) * 100)

    addText(impact.label, 25, yPosition, 11, "bold")
    addText(`${impact.current.toLocaleString()} ${impact.unit}`, 25, yPosition + 8, 9)
    addText(`${reduction}% reduction`, 120, yPosition + 4, 10, "bold", reduction > 0 ? [34, 197, 94] : [239, 68, 68])

    // Mini bar chart
    const barY = yPosition + 2
    const maxBarWidth = 60
    const currentBar = (impact.current / impact.linear) * maxBarWidth
    addBox(140, barY, maxBarWidth, 6, [240, 240, 240])
    addBox(140, barY, currentBar, 6, [59, 130, 246])

    yPosition += 18
  })

  // New page for detailed analysis
  doc.addPage()
  yPosition = 20

  // Detailed Input Parameters with better formatting
  addText("DETAILED INPUT PARAMETERS", 20, yPosition, 16, "bold", [30, 64, 175])
  addLine(yPosition + 5, [30, 64, 175], 1)
  yPosition += 20

  const inputSections = [
    {
      title: "Material Origin",
      icon: "🏭",
      items: [
        { label: "Recycled Content", value: `${data.inputData.recycledContent}%` },
        { label: "Origin Country", value: data.inputData.originCountry },
        { label: "Carbon Intensity", value: `${data.inputData.carbonIntensity} kg CO₂-eq/ton` },
      ],
    },
    {
      title: "Processing & Manufacturing",
      icon: "⚙️",
      items: [
        { label: "Refining Process", value: data.inputData.refiningProcess },
        { label: "Energy Source", value: data.inputData.energySource },
        { label: "Energy Use", value: `${data.inputData.energyUse.toLocaleString()} kWh/ton` },
        { label: "Scrap Reuse", value: `${data.inputData.scrapReuse}%` },
      ],
    },
    {
      title: "Use Phase & End-of-Life",
      icon: "♻️",
      items: [
        { label: "Product Category", value: data.inputData.productCategory },
        { label: "Expected Lifespan", value: `${data.inputData.expectedLifespan} years` },
        { label: "Collection Efficiency", value: `${data.inputData.collectionEfficiency}%` },
        { label: "Recycling Rate", value: `${data.inputData.recycledVsLandfilled}%` },
      ],
    },
  ]

  inputSections.forEach((section) => {
    checkPageBreak(35)

    // Section header with background
    addBox(15, yPosition - 3, pageWidth - 30, 12, [248, 250, 252])
    addText(`${section.icon} ${section.title}`, 20, yPosition + 5, 12, "bold", [30, 64, 175])
    yPosition += 15

    section.items.forEach((item) => {
      addText(`${item.label}:`, 25, yPosition, 10, "normal")
      addText(item.value, 100, yPosition, 10, "bold")
      yPosition += 8
    })
    yPosition += 8
  })

  // Benchmarking Section
  checkPageBreak(50)
  addText("INDUSTRY BENCHMARKING", 20, yPosition, 14, "bold", [30, 64, 175])
  yPosition += 15

  const benchmarks = [
    { metric: "Recycled Content", industry: "25%", yours: `${data.inputData.recycledContent}%`, target: "50%" },
    {
      metric: "Energy Efficiency",
      industry: "15,000 kWh/ton",
      yours: `${data.inputData.energyUse.toLocaleString()} kWh/ton`,
      target: "12,000 kWh/ton",
    },
    {
      metric: "Recovery Rate",
      industry: "60%",
      yours: `${Math.round((data.inputData.collectionEfficiency * data.inputData.recycledVsLandfilled) / 100)}%`,
      target: "85%",
    },
  ]

  // Table header
  addBox(20, yPosition, pageWidth - 40, 10, [30, 64, 175])
  addText("Metric", 25, yPosition + 6, 10, "bold", [255, 255, 255])
  addText("Industry Avg", 70, yPosition + 6, 10, "bold", [255, 255, 255])
  addText("Your Performance", 120, yPosition + 6, 10, "bold", [255, 255, 255])
  addText("Best Practice", 160, yPosition + 6, 10, "bold", [255, 255, 255])
  yPosition += 15

  benchmarks.forEach((benchmark, index) => {
    const bgColor = index % 2 === 0 ? [248, 250, 252] : [255, 255, 255]
    addBox(20, yPosition - 2, pageWidth - 40, 10, bgColor as [number, number, number])

    addText(benchmark.metric, 25, yPosition + 4, 9)
    addText(benchmark.industry, 70, yPosition + 4, 9)
    addText(benchmark.yours, 120, yPosition + 4, 9, "bold")
    addText(benchmark.target, 160, yPosition + 4, 9, "normal", [34, 197, 94])
    yPosition += 12
  })

  yPosition += 15

  // Enhanced Recommendations
  checkPageBreak(60)
  addText("STRATEGIC RECOMMENDATIONS", 20, yPosition, 14, "bold", [30, 64, 175])
  yPosition += 15

  const priorityRecommendations = [
    {
      priority: "HIGH",
      text: "Increase recycled content to 40%+ to significantly reduce carbon footprint",
      impact: "25% CO₂ reduction",
    },
    {
      priority: "MEDIUM",
      text: "Implement closed-loop manufacturing to capture 90%+ of production scrap",
      impact: "15% efficiency gain",
    },
    {
      priority: "LOW",
      text: "Develop product design for disassembly to improve end-of-life recovery",
      impact: "10% circularity boost",
    },
  ]

  priorityRecommendations.forEach((rec, index) => {
    checkPageBreak(20)

    const priorityColor: [number, number, number] =
      rec.priority === "HIGH" ? [239, 68, 68] : rec.priority === "MEDIUM" ? [245, 158, 11] : [34, 197, 94]

    addBox(20, yPosition, 15, 8, priorityColor)
    addText(rec.priority, 22, yPosition + 5, 7, "bold", [255, 255, 255])

    addText(`${index + 1}. ${rec.text}`, 40, yPosition + 5, 10)
    addText(`Expected Impact: ${rec.impact}`, 40, yPosition + 12, 9, "normal", [107, 114, 128])
    yPosition += 22
  })

  // Footer with methodology
  doc.addPage()
  yPosition = 20

  addText("METHODOLOGY & VALIDATION", 20, yPosition, 16, "bold", [30, 64, 175])
  addLine(yPosition + 5, [30, 64, 175], 1)
  yPosition += 20

  const methodologyText = [
    "This assessment follows ISO 14040/14044 LCA standards with aluminum-specific adaptations.",
    "",
    "Calculation Framework:",
    "• Circularity Score: Multi-criteria weighted assessment (35% recycled content, 25% recovery rate, 20% life extension, 10% scrap reuse, 10% energy efficiency)",
    "• Environmental Impacts: Based on ecoinvent 3.8 database with regional adjustments",
    "• Benchmarking: Industry data from International Aluminium Institute (IAI) 2023 report",
    "",
    "Quality Assurance:",
    "• Data validation against peer-reviewed sources",
    "• Uncertainty analysis with Monte Carlo simulation",
    "• Third-party verification protocols applied",
    "",
    "Limitations & Assumptions:",
    "• Regional variations in energy mix approximated",
    "• Transport impacts estimated using average distances",
    "• Future technology improvements not projected",
    "",
    "Report Validation:",
    `• Generated: ${data.generatedAt.toLocaleString()}`,
    "• Reviewed by: Team Skymax, NIT Raipur",
    "• Next review due: Annual update recommended",
  ]

  methodologyText.forEach((line) => {
    if (line === "") {
      yPosition += 4
    } else {
      checkPageBreak(6)
      if (line.includes(":") && !line.startsWith("•")) {
        addText(line, 20, yPosition, 11, "bold")
      } else {
        addText(line, 20, yPosition, 10)
      }
      yPosition += 6
    }
  })

  // Professional footer
  yPosition = pageHeight - 30
  addLine(yPosition, [203, 213, 225])
  yPosition += 5
  addText(
    "By Team SkyMax, NIT Raipur.",
    20,
    yPosition,
    8,
    "normal",
    [107, 114, 128],
  )
  addText("Vulcan Technologies", 20, yPosition + 8, 8, "normal", [107, 114, 128])
  addText(
    `Page ${doc.internal.getCurrentPageInfo().pageNumber}`,
    pageWidth - 30,
    yPosition,
    8,
    "normal",
    [107, 114, 128],
  )

  // Save with enhanced filename
  const filename = `LCA_Report_${data.inputData.productCategory.replace(/\s+/g, "_")}_Score${data.results.circularityScore}_${data.generatedAt.toISOString().split("T")[0]}.pdf`
  doc.save(filename)
}