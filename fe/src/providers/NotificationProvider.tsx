// components/NotificationProvider.tsx
import { Snackbar, Alert } from '@mui/material'
import { useNotificationStore } from '../stores/notification-store'

export const NotificationProvider = () => {
  const { notifications, removeNotification } = useNotificationStore()

  const handleClose = (id: string) => {
    removeNotification(id)
  }

  return (
    <>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open
          autoHideDuration={6000}
          onClose={() => handleClose(notification.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => handleClose(notification.id)}
            severity={notification.type}
            variant='filled'
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  )
}
