"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, DollarSign, Users } from "lucide-react"

export function StatsCards() {
  const [stats, setStats] = useState({
    revenue: { value: 0, change: 0 },
    subscriptions: { value: 0, change: 0 },
    sales: { value: 0, change: 0 },
    activeUsers: { value: 0, change: 0 },
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)

        // Generate consistent but realistic data
        // In a real app, this would come from your API
        const baseRevenue = 45231
        const baseSubscriptions = 2350
        const baseSales = 12234
        const baseActiveUsers = 573

        // Add some randomness to simulate real-time changes
        const randomFactor = () => Math.random() * 0.1 - 0.05 // ±5%

        setStats({
          revenue: {
            value: Math.round(baseRevenue * (1 + randomFactor())),
            change: 20.1 + Math.random() * 2 - 1, // 20.1% ±1%
          },
          subscriptions: {
            value: Math.round(baseSubscriptions * (1 + randomFactor())),
            change: 180.1 + Math.random() * 4 - 2, // 180.1% ±2%
          },
          sales: {
            value: Math.round(baseSales * (1 + randomFactor())),
            change: 19 + Math.random() * 2 - 1, // 19% ±1%
          },
          activeUsers: {
            value: Math.round(baseActiveUsers * (1 + randomFactor())),
            change: Math.random() * 10 + 15, // 15-25%
          },
        })
      } catch (error) {
        console.error("Error generating stats:", error)
        // Provide fallback data even in case of error
        setStats({
          revenue: { value: 45231, change: 20.1 },
          subscriptions: { value: 2350, change: 180.1 },
          sales: { value: 12234, change: 19 },
          activeUsers: { value: 573, change: 20 },
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    // Set up polling for real-time updates
    const intervalId = setInterval(() => {
      fetchStats()
    }, 30000) // Update every 30 seconds

    return () => clearInterval(intervalId)
  }, [])

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">{formatCurrency(stats.revenue.value)}</div>
              <p className={`text-xs ${stats.revenue.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {stats.revenue.change >= 0 ? "+" : ""}
                {stats.revenue.change.toFixed(1)}% from last month
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">+{stats.subscriptions.value.toLocaleString()}</div>
              <p className={`text-xs ${stats.subscriptions.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {stats.subscriptions.change >= 0 ? "+" : ""}
                {stats.subscriptions.change.toFixed(1)}% from last month
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">+{stats.sales.value.toLocaleString()}</div>
              <p className={`text-xs ${stats.sales.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {stats.sales.change >= 0 ? "+" : ""}
                {stats.sales.change.toFixed(1)}% from last month
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">+{stats.activeUsers.value}</div>
              <p className={`text-xs ${stats.activeUsers.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {stats.activeUsers.change >= 0 ? "+" : ""}
                {stats.activeUsers.change.toFixed(1)}% since last hour
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

