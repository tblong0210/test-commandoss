import React, { ReactNode } from 'react'

import { useCurrentAccount } from '@mysten/dapp-kit'

import TradesSection from '../components/TradesSection'
import { useTradeActions, useTrades } from '../stores/store'

const TradePage: React.FC = () => {
  const currentAccount = useCurrentAccount()
  const tradesData = useTrades()
  const { updateTradeStatus } = useTradeActions()

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

  const handleChangeStatus = (tradeId: string, status: number): void => {
    if (!currentAccount) {
      console.error('No current account found')
      return
    }
    updateTradeStatus(tradeId, status)
  }

  return (
    <div>
      <TradesSection
        trades={tradesData}
        loading={false}
        currentAccount={currentAccount}
        txnInProgress={false}
        updateStatusTrade={handleChangeStatus}
        getTradeStatusText={getTradeStatusText}
      />
    </div>
  )
}

export default TradePage
