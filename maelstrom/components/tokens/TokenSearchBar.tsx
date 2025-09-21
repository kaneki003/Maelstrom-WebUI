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
      {/* Search input */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by token name or symbol..."
          className="pl-10 bg-background/50"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      {/* Filter dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-background/50">
            Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleFilterChange("all")}>
            All Pools
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange("active")}>
            Active (24h)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange("new")}>
            New Pools
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Auto-refresh toggle */}
      <div className="flex items-center gap-2">
        <Switch
          id="auto-refresh"
          checked={autoRefresh}
          onCheckedChange={handleAutoRefreshToggle}
        />
        <Label htmlFor="auto-refresh" className="text-sm">
          Auto-refresh
        </Label>
      </div>
    </div>
  )
}
