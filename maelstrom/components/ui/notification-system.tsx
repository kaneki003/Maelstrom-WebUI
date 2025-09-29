"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "success" | "error" | "info" | "warning"
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id">) => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }

    setNotifications((prev) => [...prev, newNotification])

    // Auto remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider")
  }
  return context
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

function NotificationCard({
  notification,
  onClose,
}: {
  notification: Notification
  onClose: () => void
}) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  }

  const Icon = icons[notification.type]

  const colorClasses = {
    success: "border-green-500/20 bg-green-500/10 text-green-400",
    error: "border-red-500/20 bg-red-500/10 text-red-400",
    info: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    warning: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
  }

  return (
    <div
      className={cn(
        "border rounded-lg p-4 backdrop-blur-sm animate-in slide-in-from-right-full duration-300",
        colorClasses[notification.type],
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm">{notification.title}</h4>
          <p className="text-sm opacity-90 mt-1">{notification.message}</p>
          {notification.action && (
            <button
              onClick={notification.action.onClick}
              className="text-sm font-medium underline mt-2 hover:no-underline"
            >
              {notification.action.label}
            </button>
          )}
        </div>
        <button onClick={onClose} className="text-current/60 hover:text-current transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
