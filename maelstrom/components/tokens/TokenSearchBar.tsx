"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useState, useCallback } from "react"
import debounce from "lodash/debounce"

interface TokenSearchBarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filter: "all" | "active" | "new") => void;
  onAutoRefreshToggle?: (enabled: boolean) => void;
}

export function TokenSearchBar({ 
  onSearch, 
  onFilterChange,
  onAutoRefreshToggle 
}: TokenSearchBarProps) {
  const [filter, setFilter] = useState<"all" | "active" | "new">("all")
  const [autoRefresh, setAutoRefresh] = useState(false)

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch?.(value)
    }, 300),
    [onSearch]
  )

  const handleFilterChange = (newFilter: "all" | "active" | "new") => {
    setFilter(newFilter)
    onFilterChange?.(newFilter)
  }

  const handleAutoRefreshToggle = (checked: boolean) => {
    setAutoRefresh(checked)
    onAutoRefreshToggle?.(checked)
  }

  return (
    <div className="flex items-center gap-4">
      {/* Search input with enhanced styling */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70" />
        <Input
          placeholder="Search by token name or symbol..."
          className="pl-10 bg-background/50 border-white/[0.05] focus:border-accent/30 transition-colors 
            placeholder:text-muted-foreground/50 hover:border-white/[0.08]"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      {/* Filter dropdown with enhanced styling */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-background/50 border-white/[0.05] hover:border-accent/30 hover:bg-accent/5 transition-all duration-300
              focus:ring-2 focus:ring-accent/20 text-sm font-medium"
          >
            <span className="text-gradient-accent">Filter:</span>{" "}
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end"
          className="bg-blue-950/90 backdrop-blur-xl border-white/[0.05] shadow-xl shadow-blue-500/5"
        >
          <DropdownMenuItem 
            onClick={() => handleFilterChange("all")}
            className="hover:bg-accent/10 focus:bg-accent/10 transition-colors"
          >
            All Pools
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleFilterChange("active")}
            className="hover:bg-accent/10 focus:bg-accent/10 transition-colors"
          >
            Active (24h)
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleFilterChange("new")}
            className="hover:bg-accent/10 focus:bg-accent/10 transition-colors"
          >
            New Pools
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Auto-refresh toggle with enhanced styling */}
      <div className="flex items-center gap-2 border-l border-white/[0.05] pl-4">
        <Switch
          id="auto-refresh"
          checked={autoRefresh}
          onCheckedChange={handleAutoRefreshToggle}
          className="data-[state=checked]:bg-accent"
        />
        <Label 
          htmlFor="auto-refresh" 
          className="text-sm text-muted-foreground cursor-pointer hover:text-muted-foreground/80 transition-colors"
        >
          Auto-refresh
        </Label>
      </div>
    </div>
  )
}
