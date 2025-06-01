import React from 'react'

import AppRoutes from './routes/routes'
import { NotificationProvider } from './providers/NotificationProvider'

const App: React.FC = () => {
  return (
    <>
      <AppRoutes />
      <NotificationProvider />
    </>
  )
}

export default App
