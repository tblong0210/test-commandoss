// stores/notificationStore.ts
import { create } from 'zustand'
import { AlertColor } from '@mui/material'

interface Notification {
  id: string
  message: string
  type: AlertColor
}

interface NotificationState {
  notifications: Notification[]
  addNotification: (message: string, type?: AlertColor) => void
  removeNotification: (id: string) => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (message, type = 'info') => {
    const id = Date.now().toString()
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }]
    }))
    // Auto-remove after 6 seconds
    setTimeout(() => {
      useNotificationStore.getState().removeNotification(id)
    }, 6000)
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    }))
  }
}))
