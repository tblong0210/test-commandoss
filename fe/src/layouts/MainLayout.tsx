import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { Outlet } from 'react-router-dom'

const MainLayout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeaderComponent />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
