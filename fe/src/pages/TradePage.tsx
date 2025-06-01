import React, { JSX, ReactNode } from 'react'

import { useCurrentAccount } from '@mysten/dapp-kit'

import TradesSection from '../components/TradesSection'
import { Trade } from '../types'

const mockTrades: Trade[] = [
  {
    id: '0x123...789',
    proposer: '0x123...456',
    recipient: '0x789...012',
    description: 'I want to trade my Vietnamese lessons for laptop repair',
    status: 0, // 0: proposed, 1: accepted, 2: completed, 3: cancelled
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const TradePage: React.FC = () => {
  const currentAccount = useCurrentAccount()

  // Helper function to get trade status text
  const getTradeStatusText = (status: number): ReactNode => {
    switch (status) {
      case 0:
        return <span style={{ color: '#007bff' }}>Proposed</span>
      case 1:
        return <span style={{ color: '#28a745' }}>Accepted</span>
      case 2:
        return <span style={{ color: '#6c757d' }}>Completed</span>
      case 3:
        return <span style={{ color: '#dc3545' }}>Cancelled</span>
      default:
        return <span style={{ color: '#343a40' }}>Unknown Status</span>
    }
  }

  return (
    <div>
      <TradesSection
        trades={mockTrades}
        loading={true}
        currentAccount={currentAccount}
        txnInProgress={false}
        acceptTrade={function (tradeId: string): void {}}
        completeTrade={function (tradeId: string): void {
          throw new Error('Function not implemented.')
        }}
        cancelTrade={function (tradeId: string): void {
          throw new Error('Function not implemented.')
        }}
        getTradeStatusText={getTradeStatusText}
      />
    </div>
  )
}

export default TradePage
