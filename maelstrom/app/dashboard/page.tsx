import { Header } from "@/components/header"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { PoolsTable } from "@/components/dashboard/pools-table"
import { PortfolioChart } from "@/components/dashboard/portfolio-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">Dashboard Overview</h1>
              <p className="text-muted-foreground mt-2">
                Monitor your positions, track performance, and manage your DeFi portfolio.
              </p>
            </div>
          </div>

          {/* Overview Cards */}
          <DashboardOverview />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Portfolio & Pools */}
            <div className="lg:col-span-2 space-y-8">
              <PortfolioChart />
              <PoolsTable />
            </div>

            {/* Right Column - Activity */}
            <div>
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
