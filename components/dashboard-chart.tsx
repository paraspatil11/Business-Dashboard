"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function DashboardChart() {
  const [data, setData] = useState<{ date: string; revenue: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Instead of trying to fetch from an external API that might have CORS issues,
        // we'll generate realistic sample data for the demo
        const chartData = generateSampleData()
        setData(chartData)
      } catch (err) {
        console.error("Error generating data:", err)
        setError((err instanceof Error ? err.message : "An error occurred"))
        // Ensure we still have data to display
        setData(generateSampleData())
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Set up polling for real-time updates with simulated data changes
    const intervalId = setInterval(() => {
      // Generate slightly different data each time to simulate real-time changes
      const updatedData = generateSampleData().map((item) => ({
        ...item,
        revenue: item.revenue * (0.95 + Math.random() * 0.1), // Vary by ±5%
      }))
      setData(updatedData)
    }, 60000) // Update every minute

    return () => clearInterval(intervalId)
  }, [])

  // Update the generateSampleData function to create more realistic data
  const generateSampleData = () => {
    const today = new Date()
    const baseValue = 25000 // Base revenue value

    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today)
      date.setDate(date.getDate() - (29 - i))

      // Create a realistic trend with some randomness
      // Weekend days have lower revenue
      const dayOfWeek = date.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

      // Add some seasonality and trend
      const trendFactor = 1 + i / 60 // Slight upward trend
      const seasonality = Math.sin(i / 5) * 0.2 // Cyclical pattern
      const randomness = Math.random() * 0.4 - 0.2 // Random noise between -0.2 and 0.2

      // Combine factors
      const multiplier = trendFactor + seasonality + randomness
      const weekendAdjustment = isWeekend ? 0.7 : 1 // 30% less on weekends

      return {
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        revenue: Math.round(baseValue * multiplier * weekendAdjustment),
      }
    })
  }

  if (loading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <p className="text-destructive">Failed to load chart data. Using sample data instead.</p>
      </div>
    )
  }

  return (
    <ChartContainer
      config={{
        revenue: {
          label: "Revenue",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => value} />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => formatCurrency(value)} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="var(--color-revenue)"
          fill="var(--color-revenue)"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ChartContainer>
  )
}

