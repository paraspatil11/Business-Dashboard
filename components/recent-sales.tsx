"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Sale = {
  id: number
  name: string
  email: string
  amount: number
}

export function RecentSales() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true)
        // Instead of using an external API that might have CORS issues,
        // we'll use generated sample data
        setSales(generateSampleSales())
      } catch (error) {
        console.error("Error generating sales data:", error)
        setSales(generateSampleSales())
      } finally {
        setLoading(false)
      }
    }

    fetchSales()

    // Set up polling for real-time updates
    const intervalId = setInterval(() => {
      // Generate new sales data to simulate real-time updates
      setSales(generateSampleSales())
    }, 60000) // Update every minute

    return () => clearInterval(intervalId)
  }, [])

  // Update the generateSampleSales function to create more realistic data
  const generateSampleSales = () => {
    const firstNames = ["Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "James", "Isabella", "Logan"]
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
    ]
    const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"]

    return Array.from({ length: 5 }, (_, i) => {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const domain = domains[Math.floor(Math.random() * domains.length)]
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`

      return {
        id: i + 1,
        name: `${firstName} ${lastName}`,
        email: email,
        amount: Math.floor(Math.random() * 900) + 100, // Random amount between 100 and 999
        avatar: null,
      }
    })
  }

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (loading) {
    return (
      <div className="space-y-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="mr-4 h-10 w-10 animate-pulse rounded-full bg-muted"></div>
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
              <div className="h-3 w-24 animate-pulse rounded bg-muted"></div>
            </div>
            <div className="ml-auto h-4 w-16 animate-pulse rounded bg-muted"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            {sale.avatar ? <AvatarImage src={sale.avatar} alt={sale.name} /> : null}
            <AvatarFallback>
              {sale.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{formatCurrency(sale.amount)}</div>
        </div>
      ))}
    </div>
  )
}

