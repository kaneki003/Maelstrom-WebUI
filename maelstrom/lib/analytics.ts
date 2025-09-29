// Analytics and performance monitoring utilities

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: number
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private isEnabled = typeof window !== "undefined"

  track(name: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return

    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now(),
    }

    this.events.push(event)

    // In production, send to analytics service
    console.log("[Analytics]", event)
  }

  // Track user interactions
  trackClick(element: string, properties?: Record<string, any>) {
    this.track("click", { element, ...properties })
  }

  trackPageView(page: string) {
    this.track("page_view", { page })
  }

  trackTrade(type: "buy" | "sell" | "swap", token: string, amount: string) {
    this.track("trade", { type, token, amount })
  }

  trackError(error: Error, context?: string) {
    this.track("error", {
      message: error.message,
      stack: error.stack,
      context,
    })
  }

  // Performance monitoring
  trackPerformance(metric: string, value: number, unit = "ms") {
    this.track("performance", { metric, value, unit })
  }

  measurePageLoad() {
    if (!this.isEnabled) return

    window.addEventListener("load", () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

      this.trackPerformance("page_load", navigation.loadEventEnd - navigation.fetchStart)
      this.trackPerformance("dom_content_loaded", navigation.domContentLoadedEventEnd - navigation.fetchStart)
      this.trackPerformance("first_paint", performance.getEntriesByName("first-paint")[0]?.startTime || 0)
    })
  }
}

export const analytics = new Analytics()

// Performance utilities
export function measureFunction<T extends (...args: any[]) => any>(fn: T, name: string): T {
  return ((...args: Parameters<T>) => {
    const start = performance.now()
    const result = fn(...args)
    const end = performance.now()

    analytics.trackPerformance(`function_${name}`, end - start)

    return result
  }) as T
}

export function measureAsync<T extends (...args: any[]) => Promise<any>>(fn: T, name: string): T {
  return (async (...args: Parameters<T>) => {
    const start = performance.now()
    const result = await fn(...args)
    const end = performance.now()

    analytics.trackPerformance(`async_${name}`, end - start)

    return result
  }) as T
}
