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

  // Color palette
  // Color palette - Remove 'as const' to make arrays mutable
const colors = {
  primary: [26, 115, 232] as [number, number, number],        // Blue
  secondary: [52, 168, 83] as [number, number, number],       // Green
  accent: [255, 193, 7] as [number, number, number],          // Amber
  danger: [234, 67, 53] as [number, number, number],          // Red
  dark: [32, 33, 36] as [number, number, number],             // Dark gray
  light: [248, 249, 250] as [number, number, number],         // Light gray
  white: [255, 255, 255] as [number, number, number],         // White
  text: [60, 64, 67] as [number, number, number],             // Text gray
  border: [218, 220, 224] as [number, number, number]         // Border gray
}


  // Enhanced helper functions
  const addText = (
    text: string,
    x: number,
    y: number,
    fontSize = 12,
    style: "normal" | "bold" = "normal",
    color: [number, number, number] = colors.text,
    maxWidth?: number
  ) => {
    doc.setFontSize(fontSize)
    doc.setFont("helvetica", style)
    doc.setTextColor(color[0], color[1], color[2])
    
    if (maxWidth) {
      const splitText = doc.splitTextToSize(text, maxWidth)
      doc.text(splitText, x, y)
      return splitText.length * (fontSize * 0.35) // Return height used
    } else {
      doc.text(text, x, y)
      return fontSize * 0.35 // Return single line height
    }
  }

  const addLine = (y: number, color: [number, number, number] = colors.border, thickness = 0.5, startX = 20, endX = pageWidth - 20) => {
    doc.setDrawColor(color[0], color[1], color[2])
    doc.setLineWidth(thickness)
    doc.line(startX, y, endX, y)
    doc.setDrawColor(0, 0, 0) // Reset
    doc.setLineWidth(0.2) // Reset
  }

  const addRoundedBox = (
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor?: [number, number, number],
    borderColor: [number, number, number] = colors.border,
    radius = 2
  ) => {
    if (fillColor) {
      doc.setFillColor(fillColor[0], fillColor[1], fillColor[2])
    }
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2])
    
    // Simple rounded rectangle approximation
    doc.roundedRect(x, y, width, height, radius, radius, fillColor ? 'FD' : 'D')
    
    doc.setDrawColor(0, 0, 0) // Reset
    doc.setFillColor(255, 255, 255) // Reset
  }

  const addProgressBar = (x: number, y: number, width: number, percentage: number, label: string, showPercentage = true) => {
    const barHeight = 12
    const cornerRadius = 6
    
    // Background
    addRoundedBox(x, y, width, barHeight, colors.light, colors.border, cornerRadius)
    
    // Progress
    const progressWidth = Math.max(10, (width * percentage) / 100) // Minimum 10px
    let color: [number, number, number] = colors.secondary
    if (percentage < 30) color = colors.danger
    else if (percentage < 60) color = colors.accent

    if (progressWidth > 0) {
      addRoundedBox(x + 1, y + 1, progressWidth - 2, barHeight - 2, color, color, cornerRadius - 1)
    }
    
    // Label
    addText(label, x, y - 4, 10, "bold")
    if (showPercentage) {
      addText(`${percentage}%`, x + width - 25, y + 8, 9, "bold", colors.white)
    }
  }

  const addMetricCard = (x: number, y: number, width: number, title: string, value: string, subtitle?: string, bgColor = colors.white) => {
    const cardHeight = subtitle ? 45 : 35
    
    // Card background with shadow effect
    addRoundedBox(x + 1, y + 1, width, cardHeight, [0, 0, 0, 0.1] as any, [0, 0, 0, 0.1] as any, 4) // Shadow
    addRoundedBox(x, y, width, cardHeight, bgColor, colors.border, 4)
    
    // Content
    addText(title, x + 12, y + 12, 10, "normal", colors.text)
    addText(value, x + 12, y + 25, 14, "bold", colors.dark)
    if (subtitle) {
      addText(subtitle, x + 12, y + 37, 8, "normal", [128, 128, 128])
    }
    
    return cardHeight + 5 // Return height with margin
  }

  const addSectionHeader = (title: string, y: number, color = colors.primary, addDivider = true) => {
    if (addDivider && y > 30) {
      addLine(y - 5, colors.border, 0.5)
      y += 5
    }
    
    addText(title, 20, y, 16, "bold", color)
    if (addDivider) {
      addLine(y + 3, color, 2, 20, 120)
    }
    return y + 20
  }

  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 30) {
      addPageFooter()
      doc.addPage()
      yPosition = 20
      return true
    }
    return false
  }

  const addPageFooter = () => {
    const footerY = pageHeight - 20
    addLine(footerY - 5, colors.border)
    addText("VULCAN LCA Report", 20, footerY, 8, "normal", [128, 128, 128])
    addText("Team SkyMax, NIT Raipur", 20, footerY + 8, 8, "normal", [128, 128, 128])
    addText(`Page ${doc.internal.getCurrentPageInfo().pageNumber}`, pageWidth - 30, footerY, 8, "normal", [128, 128, 128])
  }

  // HEADER SECTION
  // Gradient-like header with multiple rectangles
for (let i = 0; i < 5; i++) {
  const alpha = 1 - (i * 0.1)
  const adjustedColor: [number, number, number] = [
    Math.floor(colors.primary[0] * alpha),
    Math.floor(colors.primary[1] * alpha),
    Math.floor(colors.primary[2] * alpha)
  ]
  addRoundedBox(0, i, pageWidth, 40 - i, adjustedColor, adjustedColor, 0)
}

  // Header content
  addText("ALUMINUM LIFE CYCLE ASSESSMENT", 20, 18, 18, "bold", colors.white)
  addText("Production-Grade Environmental Impact Report", 20, 28, 11, "normal", colors.white)
  
  // Company branding
addRoundedBox(pageWidth - 85, 8, 75, 20, [255, 255, 255, 100] as any, [255, 255, 255, 150] as any, 4)
  addText("VULCAN", pageWidth - 80, 15, 10, "bold", colors.white)
  addText("Team SkyMax, NIT Raipur", pageWidth - 80, 23, 7, "normal", colors.white)

  yPosition = 55

  // EXECUTIVE SUMMARY SECTION
  addRoundedBox(15, yPosition, pageWidth - 30, 75, colors.light, colors.border, 8)
  
  yPosition += 12
  addText("EXECUTIVE SUMMARY", 25, yPosition, 14, "bold", colors.primary)
  yPosition += 18

  // Key metrics in enhanced card layout
  const cardWidth = (pageWidth - 60) / 3
  let cardY = yPosition

  const carbonReduction = Math.round(
    ((data.results.linearScenario.carbonFootprint - data.results.environmentalImpact.carbonFootprint) /
      data.results.linearScenario.carbonFootprint) * 100
  )

  // Metric cards
  addMetricCard(25, cardY, cardWidth - 5, "Circularity Score", `${data.results.circularityScore}/100`, data.results.performanceRating.toUpperCase())
  addMetricCard(25 + cardWidth, cardY, cardWidth - 5, "Carbon Reduction", `${carbonReduction}%`, "vs Linear Economy")
  addMetricCard(25 + cardWidth * 2, cardY, cardWidth - 5, "Generated", data.generatedAt.toLocaleDateString(), data.inputData.productCategory.toUpperCase())

  yPosition += 80

  // CIRCULARITY PERFORMANCE SECTION
  checkPageBreak(70)
  yPosition = addSectionHeader("CIRCULARITY PERFORMANCE", yPosition)

  // Enhanced gauge visualization
  const gaugeX = 30
  const gaugeWidth = pageWidth - 80
  const score = data.results.circularityScore

  // Gauge background
  addRoundedBox(gaugeX - 5, yPosition, gaugeWidth + 10, 50, colors.white, colors.border, 8)
  
  // Score segments with better spacing
  const segmentWidth = (gaugeWidth - 30) / 4
  const segmentY = yPosition + 15
  const segmentColors: [number, number, number][] = [colors.danger, colors.accent, colors.secondary, [16, 185, 129]]
  const labels = ["Poor (0-25)", "Fair (26-50)", "Good (51-75)", "Excellent (76-100)"]

  labels.forEach((label, i) => {
    addRoundedBox(gaugeX + 15 + i * segmentWidth, segmentY, segmentWidth - 5, 15, segmentColors[i], segmentColors[i], 4)
    addText(labels[i], gaugeX + 15 + i * segmentWidth + 5, segmentY + 20, 8, "normal", colors.text, segmentWidth - 10)
  })

  // Score indicator with better positioning
  const indicatorX = gaugeX + 15 + (score / 100) * (gaugeWidth - 30) - 3
  addRoundedBox(indicatorX, segmentY - 8, 6, 31, colors.dark, colors.dark, 3)
  addText(`${score}`, indicatorX - 8, segmentY - 12, 12, "bold", colors.dark)

  yPosition += 70

  // ENVIRONMENTAL IMPACT DASHBOARD
  checkPageBreak(120)
  yPosition = addSectionHeader("ENVIRONMENTAL IMPACT DASHBOARD", yPosition, colors.secondary)

  const impacts = [
    {
      label: "Carbon Footprint",
      current: data.results.environmentalImpact.carbonFootprint,
      linear: data.results.linearScenario.carbonFootprint,
      unit: "kg CO₂-eq/ton",
      icon: "🌍"
    },
    {
      label: "Water Usage",
      current: data.results.environmentalImpact.waterUsage,
      linear: data.results.linearScenario.waterUsage,
      unit: "L/ton",
      icon: "💧"
    },
    {
      label: "Energy Consumption",
      current: data.results.environmentalImpact.energyConsumption,
      linear: data.results.linearScenario.energyConsumption,
      unit: "kWh/ton",
      icon: "⚡"
    },
    {
      label: "Land Disturbance",
      current: data.results.environmentalImpact.landDisturbance,
      linear: data.results.linearScenario.landDisturbance,
      unit: "m²/ton",
      icon: "🏞️"
    }
  ]

  impacts.forEach((impact, index) => {
    checkPageBreak(25)
    const reduction = Math.round(((impact.linear - impact.current) / impact.linear) * 100)
const cardColor = reduction > 0 ? [234, 255, 234] as [number, number, number] : [255, 234, 234] as [number, number, number]
    // Impact card
    addRoundedBox(20, yPosition, pageWidth - 40, 20, cardColor, colors.border, 6)
    
    // Icon and label
    addText(impact.icon, 30, yPosition + 8, 14)
    addText(impact.label, 50, yPosition + 8, 12, "bold", colors.dark)
    
    // Values
    addText(`${impact.current.toLocaleString()} ${impact.unit}`, 50, yPosition + 16, 10, "normal", colors.text)
    
    // Reduction badge
    const reductionColor = reduction > 0 ? colors.secondary : colors.danger
    const reductionText = reduction > 0 ? `↓ ${reduction}%` : `↑ ${Math.abs(reduction)}%`
    addRoundedBox(pageWidth - 80, yPosition + 4, 50, 12, reductionColor, reductionColor, 6)
    addText(reductionText, pageWidth - 75, yPosition + 12, 9, "bold", colors.white)

    yPosition += 25
  })

  // NEW PAGE FOR DETAILED ANALYSIS
  checkPageBreak(300)
  doc.addPage()
  yPosition = 20

  // DETAILED INPUT PARAMETERS
  yPosition = addSectionHeader("DETAILED INPUT PARAMETERS", yPosition, colors.primary)

  const inputSections = [
    {
      title: "1. Material Origin",
      color: colors.primary,
      items: [
        { label: "Recycled Content", value: `${data.inputData.recycledContent}%` },
        { label: "Origin Country", value: data.inputData.originCountry.toUpperCase() },
        { label: "Carbon Intensity", value: `${data.inputData.carbonIntensity} kg CO₂-eq/ton` },
      ],
    },
    {
      title: "2. Processing & Manufacturing",
      color: colors.secondary,
      items: [
        { label: "Refining Process", value: data.inputData.refiningProcess.toUpperCase() },
        { label: "Energy Source", value: data.inputData.energySource.toUpperCase() },
        { label: "Energy Use", value: `${data.inputData.energyUse.toLocaleString()} kWh/ton` },
        { label: "Scrap Reuse", value: `${data.inputData.scrapReuse}%` },
      ],
    },
    {
      title: "3. Use Phase & End-of-Life",
      color: colors.accent,
      items: [
        { label: "Product Category", value: data.inputData.productCategory.toUpperCase() },
        { label: "Expected Lifespan", value: `${data.inputData.expectedLifespan} years` },
        { label: "Collection Efficiency", value: `${data.inputData.collectionEfficiency}%` },
        { label: "Recycling Rate", value: `${data.inputData.recycledVsLandfilled}%` },
      ],
    },
  ]

  inputSections.forEach((section, sectionIndex) => {
    checkPageBreak(80)

    // Section card
    addRoundedBox(15, yPosition, pageWidth - 30, 65, colors.white, colors.border, 8)
    
    // Section header with colored accent
    addRoundedBox(20, yPosition + 5, pageWidth - 40, 18, section.color, section.color, 6)
    addText(section.title, 30, yPosition + 15, 12, "bold", colors.white)
    
    let itemY = yPosition + 30
    const itemsPerRow = 2
    const columnWidth = (pageWidth - 80) / itemsPerRow

    section.items.forEach((item, index) => {
      const column = index % itemsPerRow
      const row = Math.floor(index / itemsPerRow)
      const itemX = 30 + column * columnWidth
      const currentItemY = itemY + row * 15

      addText(`${item.label}:`, itemX, currentItemY, 10, "normal", colors.text)
      addText(item.value, itemX + 90, currentItemY, 10, "bold", colors.dark)
    })

    yPosition += 80
  })

  // INDUSTRY BENCHMARKING
  checkPageBreak(100)
  yPosition = addSectionHeader("INDUSTRY BENCHMARKING", yPosition, colors.accent)

const benchmarks = [
  { 
    metric: "Recycled Content", 
    industry: "25%", 
    yours: `${data.inputData.recycledContent}%`, 
    target: "50%" 
  },
  { 
    metric: "Energy Efficiency", 
    industry: "15,000 kWh/ton", 
    yours: `${data.inputData.energyUse.toLocaleString()} kWh/ton`, 
    target: "12,000 kWh/ton" 
  },
  { 
    metric: "Recovery Rate", 
    industry: "60%", 
    yours: `${Math.round((data.inputData.collectionEfficiency * data.inputData.recycledVsLandfilled) / 100)}%`, 
    target: "85%" 
  }
]

  // Enhanced table with better styling
// Enhanced table with better styling
addRoundedBox(20, yPosition, pageWidth - 40, 15, colors.dark, colors.dark, 6)
const colWidths = [(pageWidth - 40) * 0.3, (pageWidth - 40) * 0.23, (pageWidth - 40) * 0.24, (pageWidth - 40) * 0.23]
let colX = 25

["Metric", "Industry Avg", "Your Performance", "Best Practice"].forEach((header, i) => {
  addText(header, colX, yPosition + 10, 10, "bold", colors.white)
  colX += colWidths[i]
})

yPosition += 20

benchmarks.forEach((benchmark, index) => {
  const rowColor = index % 2 === 0 ? colors.light : colors.white
  addRoundedBox(20, yPosition, pageWidth - 40, 18, rowColor, colors.border, 4)

  colX = 25
  const values = [benchmark.metric, benchmark.industry, benchmark.yours, benchmark.target]
  const styles: ("normal" | "bold")[] = ["bold", "normal", "bold", "normal"]
  const textColors = [colors.dark, colors.text, colors.primary, colors.secondary]

  values.forEach((value, i) => {
    addText(value, colX, yPosition + 12, 9, styles[i], textColors[i])
    colX += colWidths[i]
  })
  
  yPosition += 22
})

  
  yPosition += 20

  benchmarks.forEach((benchmark, index) => {
    const rowColor = index % 2 === 0 ? colors.light : colors.white
    addRoundedBox(20, yPosition, pageWidth - 40, 18, rowColor, colors.border, 4)

    colX = 25
    const values = [benchmark.metric, benchmark.industry, benchmark.yours, benchmark.target]
    const styles: ("normal" | "bold")[] = ["bold", "normal", "bold", "normal"]
    const textColors = [colors.dark, colors.text, colors.primary, colors.secondary]

    values.forEach((value, i) => {
      addText(value, colX, yPosition + 12, 9, styles[i], textColors[i])
      colX += colWidths[i]
    })
    
    yPosition += 22
  })

  yPosition += 20

  // STRATEGIC RECOMMENDATIONS
  checkPageBreak(100)
  yPosition = addSectionHeader("STRATEGIC RECOMMENDATIONS", yPosition, colors.danger)

  const priorityRecommendations = [
    {
      priority: "HIGH",
      color: colors.danger,
      text: "Increase recycled content to 40%+ to significantly reduce carbon footprint",
      impact: "25% CO₂ reduction",
    },
    {
      priority: "MEDIUM",
      color: colors.accent,
      text: "Implement closed-loop manufacturing to capture 90%+ of production scrap",
      impact: "15% efficiency gain",
    },
    {
      priority: "LOW",
      color: colors.secondary,
      text: "Develop product design for disassembly to improve end-of-life recovery",
      impact: "10% circularity boost",
    },
  ]

  priorityRecommendations.forEach((rec, index) => {
    checkPageBreak(30)

    // Recommendation card
    addRoundedBox(20, yPosition, pageWidth - 40, 25, colors.white, colors.border, 6)
    
    // Priority badge
    addRoundedBox(25, yPosition + 5, 45, 15, rec.color, rec.color, 8)
    addText(rec.priority, 30, yPosition + 14, 8, "bold", colors.white)

    // Recommendation text
    addText(`${index + 1}.`, 80, yPosition + 10, 12, "bold", colors.dark)
    addText(rec.text, 90, yPosition + 10, 11, "normal", colors.text, pageWidth - 130)
    addText(`Expected Impact: ${rec.impact}`, 90, yPosition + 20, 9, "bold", rec.color)
    
    yPosition += 35
  })

  // METHODOLOGY & VALIDATION (New Page)
  doc.addPage()
  yPosition = 20

  yPosition = addSectionHeader("METHODOLOGY & VALIDATION", yPosition, colors.primary)

  const methodologyContent = [
    {
      title: "Standards Compliance",
      content: "This assessment follows ISO 14040/14044 LCA standards with aluminum-specific adaptations for enhanced accuracy and industry relevance."
    },
    {
      title: "Calculation Framework",
      items: [
        "Circularity Score: Multi-criteria weighted assessment (35% recycled content, 25% recovery rate, 20% life extension, 10% scrap reuse, 10% energy efficiency)",
        "Environmental Impacts: Based on ecoinvent 3.8 database with regional adjustments",
        "Benchmarking: Industry data from International Aluminium Institute (IAI) 2023 report"
      ]
    },
    {
      title: "Quality Assurance",
      items: [
        "Data validation against peer-reviewed sources",
        "Uncertainty analysis with Monte Carlo simulation",
        "Third-party verification protocols applied"
      ]
    }
  ]

  methodologyContent.forEach((section) => {
    checkPageBreak(60)
    
    addText(section.title, 20, yPosition, 12, "bold", colors.primary)
    yPosition += 15
    
    if (section.content) {
      const textHeight = addText(section.content, 20, yPosition, 10, "normal", colors.text, pageWidth - 40)
      yPosition += textHeight + 10
    }
    
    if (section.items) {
      section.items.forEach((item) => {
        checkPageBreak(15)
        addText("•", 25, yPosition, 10, "bold", colors.primary)
        const itemHeight = addText(item, 35, yPosition, 10, "normal", colors.text, pageWidth - 55)
        yPosition += itemHeight + 5
      })
    }
    
    yPosition += 15
  })

  // Report validation info
  checkPageBreak(50)
  addRoundedBox(15, yPosition, pageWidth - 30, 40, colors.light, colors.border, 8)
  yPosition += 10
  
  addText("Report Validation", 25, yPosition, 12, "bold", colors.dark)
  yPosition += 15
  
  const validationItems = [
    `Generated: ${data.generatedAt.toLocaleString()}`,
    "Reviewed by: Team SkyMax, NIT Raipur",
    "Next review due: Annual update recommended"
  ]
  
  validationItems.forEach((item) => {
    addText(`• ${item}`, 25, yPosition, 10, "normal", colors.text)
    yPosition += 12
  })

  // Enhanced footer
  addPageFooter()

  // Save with enhanced filename
  const filename = `LCA_Report_${data.inputData.productCategory.replace(/\s+/g, "_")}_Score${data.results.circularityScore}_${data.generatedAt.toISOString().split("T")[0]}.pdf`
  doc.save(filename)
}
