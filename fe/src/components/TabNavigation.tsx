import React from 'react'
import { clsx } from '../utils/helpers'

interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

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
  { name: 'Listings', value: 'listings' },
  { name: 'Trades', value: 'trades' },
  { name: 'Create Listing', value: 'create' }
]

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className='flex gap-3'>
      {Tabs.map((tab) => (
        <CustomBtnHeader
          key={tab.value}
          text={tab.name}
          onClick={() => setActiveTab(tab.value)}
          className={activeTab !== tab.value ? 'text-white' : ' text-blue-500'}
        />
      ))}
    </div>
  )
}

export default TabNavigation
