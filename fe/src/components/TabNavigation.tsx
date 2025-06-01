import React from 'react'
import { clsx } from '../utils/helpers'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { mockData } from '../data/data'
import { useNotificationStore } from '../stores/notification-store'

interface CustomBtnHeaderProps {
  text: string
  onClick?: () => void
  className?: string
}

const CustomBtnHeader: React.FC<CustomBtnHeaderProps> = ({ text, onClick, className }) => {
  return (
    <button
      className={clsx(className, 'hover:cursor-pointer hover:text-blue-500 px-4 py-2 uppercase font-semibold')}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

const Tabs = [
  { name: 'Listings', url: '/' },
  { name: 'Trades', url: '/trades' },
  { name: 'Create Listing', url: '/create' }
]

const TabNavigation: React.FC = () => {
  const navigate = useNavigate()
  const currentPath = window.location.pathname
  const { addNotification } = useNotificationStore()

  const handleGetMockData = () => {
    const dt = mockData
    localStorage.setItem('mock-data', JSON.stringify(dt))
    addNotification('Mock data loaded successfully!', 'success')
    window.location.reload()
  }
  return (
    <div className='flex gap-20'>
      <div className='flex gap-3'>
        {Tabs.map((tab) => (
          <CustomBtnHeader
            key={tab.name}
            text={tab.name}
            onClick={() => navigate(tab.url)}
            className={currentPath !== tab.url ? 'text-white' : ' text-blue-500'}
          />
        ))}
      </div>
      <div className=''>
        <Button type='submit' variant='contained' color='primary' onClick={handleGetMockData}>
          Get Demo
        </Button>
      </div>
    </div>
  )
}

export default TabNavigation
