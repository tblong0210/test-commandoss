import React from 'react'

import HeaderComponent from './components/HeaderComponent'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { Listing } from './types'
import ListingsSection from './components/ListingsSection'
import AppRoutes from './routes/routes'

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Learn React Basics',
    description: 'A comprehensive guide to get started with React.',
    type: 'skill',
    owner: '0x123',
    ownerName: 'Alice',
    status: 'available',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Advanced JavaScript Techniques',
    description: 'Deep dive into JavaScript for experienced developers.',
    type: 'skill',
    owner: '0x456',
    ownerName: 'Bob',
    status: 'available',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Advanced JavaScript Techniques',
    description: 'Deep dive into JavaScript for experienced developers.',
    type: 'skill',
    owner: '0x456',
    ownerName: 'Bob',
    status: 'available',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Python for Data Science',
    description: 'Learn how to use Python for data analysis and visualization.',
    type: 'skill',
    owner: '0x789',
    ownerName: 'Charlie',
    status: 'available',
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Blockchain Development',
    description: 'Introduction to blockchain technology and smart contracts.',
    type: 'skill',
    owner: '0xabc',
    ownerName: 'Dave',
    status: 'available',
    createdAt: new Date().toISOString()
  }
]

const App: React.FC = () => {
  const currentAccount = useCurrentAccount()

  const handleProposeTrade = (listing: Listing) => {
    console.log('Propose trade for listing:', listing)
    // Implement the logic to handle proposing a trade
  }
  return <AppRoutes />
}

export default App
