export function TokenRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4">
      {/* Logo & Name */}
      <div className="flex items-center gap-4 min-w-[240px]">
        <div className="h-10 w-10 rounded-full bg-blue-950/50 animate-pulse" />
        <div className="space-y-2">
          <div className="h-5 w-20 bg-blue-950/50 rounded animate-pulse" />
          <div className="h-4 w-32 bg-blue-950/30 rounded animate-pulse" />
        </div>
      </div>

      {/* Price */}
      <div className="min-w-[160px] space-y-2">
        <div className="h-5 w-24 bg-blue-950/50 rounded animate-pulse" />
        <div className="h-4 w-16 bg-blue-950/30 rounded animate-pulse" />
      </div>

      {/* Total Liquidity */}
      <div className="min-w-[160px]">
        <div className="h-5 w-28 bg-blue-950/50 rounded animate-pulse" />
      </div>

      {/* Last Exchange */}
      <div className="min-w-[120px]">
        <div className="h-4 w-20 bg-blue-950/30 rounded animate-pulse" />
      </div>

      {/* Sparkline */}
      <div className="flex-grow">
        <div className="h-10 w-[120px] bg-blue-950/30 rounded animate-pulse ml-auto" />
      </div>

      {/* Chevron */}
      <div className="h-5 w-5 bg-blue-950/30 rounded animate-pulse" />
    </div>
  )
}
