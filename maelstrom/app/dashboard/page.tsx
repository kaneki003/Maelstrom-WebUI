"use client"

import { Header } from "@/components/header"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { PoolsTable } from "@/components/dashboard/pools-table"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <div className="min-h-screen relative bg-gradient-pattern overflow-hidden">
      {/* Enhanced background effects */}
      <Header />
      
      <main className="container relative mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page Header with glass effect */}
          <div className="relative rounded-xl p-8 overflow-hidden backdrop-blur-xl border border-white/[0.05]">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
            <div className="absolute inset-0 border border-white/[0.05] rounded-xl" />
            <div className="relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold font-clash-display text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                    Dashboard Overview
                  </h1>
                  <p className="text-muted-foreground/70 mt-2 max-w-[600px] font-plus-jakarta">
                    Monitor your positions, track performance, and manage your DeFi portfolio.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          <DashboardOverview />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Portfolio & Pools */}
            <div className="lg:col-span-2 space-y-8">
              <div className="relative rounded-xl overflow-hidden backdrop-blur-xl border border-white/[0.05]">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
                <div className="absolute inset-0 border border-white/[0.05] rounded-xl" />
                <div className="relative">
                  <PoolsTable />
                </div>
              </div>
            </div>

            {/* Right Column - Activity with glass effect */}
            <div className="relative rounded-xl overflow-hidden backdrop-blur-xl border border-white/[0.05]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
              <div className="absolute inset-0 border border-white/[0.05] rounded-xl" />
              <div className="relative">
                <RecentActivity />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Dynamic glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--accent-cyan)/10%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--primary-500)/5%,transparent_50%)]" />
      </div>
    </div>
  )
}
