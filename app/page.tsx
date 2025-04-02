import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CreditCard, Download, LineChart, Settings } from "lucide-react"
import Link from "next/link"
import { DashboardChart } from "@/components/dashboard-chart"
import { RecentSales } from "@/components/recent-sales"
import { StatsCards } from "@/components/stats-cards"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <LineChart className="h-6 w-6" />
            <span className="text-xl font-bold">Dashboard</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Analytics
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Reports
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Avatar"
                className="rounded-full"
                height={32}
                width={32}
              />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button size="sm">
              <CreditCard className="mr-2 h-4 w-4" />
              Upgrade
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <StatsCards />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Daily revenue for the past 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <DashboardChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>You made 265 sales this month.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="h-[400px] flex items-center justify-center text-muted-foreground">
            Analytics content will appear here
          </TabsContent>
          <TabsContent value="reports" className="h-[400px] flex items-center justify-center text-muted-foreground">
            Reports content will appear here
          </TabsContent>
          <TabsContent
            value="notifications"
            className="h-[400px] flex items-center justify-center text-muted-foreground"
          >
            Notifications content will appear here
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t py-4">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

