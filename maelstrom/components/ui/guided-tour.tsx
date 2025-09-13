"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { X, ArrowRight, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface TourStep {
  id: string
  title: string
  content: string
  target: string // CSS selector
  position: "top" | "bottom" | "left" | "right"
  action?: {
    label: string
    onClick: () => void
  }
}

interface TourContextType {
  isActive: boolean
  currentStep: number
  steps: TourStep[]
  startTour: (steps: TourStep[]) => void
  nextStep: () => void
  prevStep: () => void
  endTour: () => void
}

const TourContext = createContext<TourContextType | undefined>(undefined)

export function TourProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<TourStep[]>([])

  const startTour = (tourSteps: TourStep[]) => {
    setSteps(tourSteps)
    setCurrentStep(0)
    setIsActive(true)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      endTour()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const endTour = () => {
    setIsActive(false)
    setCurrentStep(0)
    setSteps([])
  }

  return (
    <TourContext.Provider
      value={{
        isActive,
        currentStep,
        steps,
        startTour,
        nextStep,
        prevStep,
        endTour,
      }}
    >
      {children}
      {isActive && <TourOverlay />}
    </TourContext.Provider>
  )
}

export function useTour() {
  const context = useContext(TourContext)
  if (!context) {
    throw new Error("useTour must be used within TourProvider")
  }
  return context
}

function TourOverlay() {
  const { steps, currentStep, nextStep, prevStep, endTour } = useTour()
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  const step = steps[currentStep]

  useEffect(() => {
    if (step?.target) {
      const element = document.querySelector(step.target) as HTMLElement
      setTargetElement(element)

      if (element) {
        const rect = element.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        // Calculate tooltip position based on step position
        let top = rect.top + scrollTop
        let left = rect.left

        switch (step.position) {
          case "top":
            top = rect.top + scrollTop - 10
            left = rect.left + rect.width / 2
            break
          case "bottom":
            top = rect.bottom + scrollTop + 10
            left = rect.left + rect.width / 2
            break
          case "left":
            top = rect.top + scrollTop + rect.height / 2
            left = rect.left - 10
            break
          case "right":
            top = rect.top + scrollTop + rect.height / 2
            left = rect.right + 10
            break
        }

        setTooltipPosition({ top, left })

        // Scroll element into view
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [step])

  if (!step) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={endTour} />

      {/* Highlight */}
      {targetElement && (
        <div
          className="fixed border-2 border-cyan-400 rounded-lg z-50 pointer-events-none animate-pulse"
          style={{
            top: targetElement.getBoundingClientRect().top + window.pageYOffset - 4,
            left: targetElement.getBoundingClientRect().left - 4,
            width: targetElement.offsetWidth + 8,
            height: targetElement.offsetHeight + 8,
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className={cn(
          "fixed z-50 bg-gray-900 border border-gray-700 rounded-lg p-4 max-w-sm shadow-xl",
          step.position === "top" && "transform -translate-x-1/2 -translate-y-full",
          step.position === "bottom" && "transform -translate-x-1/2",
          step.position === "left" && "transform -translate-x-full -translate-y-1/2",
          step.position === "right" && "transform -translate-y-1/2",
        )}
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white">{step.title}</h3>
          <button onClick={endTour} className="text-gray-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-gray-300 text-sm mb-4">{step.content}</p>

        {step.action && (
          <Button onClick={step.action.onClick} variant="outline" size="sm" className="mb-3 w-full bg-transparent">
            {step.action.label}
          </Button>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {currentStep + 1} of {steps.length}
          </span>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button onClick={prevStep} variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <Button onClick={nextStep} size="sm">
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
              {currentStep < steps.length - 1 && <ArrowRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
