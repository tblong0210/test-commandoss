import React from 'react'
import { clsx } from '../utils/helpers'
import { useNavigate } from 'react-router-dom'

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

  return (
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
  )
}

export default TabNavigation
