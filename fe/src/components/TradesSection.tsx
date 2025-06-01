import React, { ReactNode } from 'react'
import TradeCard from './TradeCard'
import { Trade } from '../types'

interface TradesSectionProps {
  trades: Trade[]
  loading: boolean
  currentAccount: { address: string } | null
  txnInProgress: boolean
  acceptTrade: (tradeId: string) => void
  completeTrade: (tradeId: string) => void
  cancelTrade: (tradeId: string) => void
  getTradeStatusText: (status: number) => ReactNode
}

const TradesSection: React.FC<TradesSectionProps> = ({
  trades,
  loading,
  currentAccount,
  txnInProgress,
  acceptTrade,
  completeTrade,
  cancelTrade,
  getTradeStatusText
}) => {
  // Helper function to check if user is the proposer of a trade
  const isProposer = (trade: Trade): boolean => {
    return Boolean(currentAccount && trade.proposer === currentAccount.address)
  }

  // Helper function to check if user is the recipient of a trade
  const isRecipient = (trade: Trade): boolean => {
    return Boolean(currentAccount && trade.recipient === currentAccount.address)
  }

  return (
    <div className='trades-section'>
      {!currentAccount ? (
        <p>Please connect your wallet to view trades.</p>
      ) : loading ? (
        <p>Loading trades...</p>
      ) : trades.length === 0 ? (
        <p>No trades found.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {trades.map((trade) => (
            <TradeCard
              key={trade.id}
              trade={trade}
              isProposer={isProposer(trade)}
              isRecipient={isRecipient(trade)}
              onAccept={acceptTrade}
              onComplete={completeTrade}
              onCancel={cancelTrade}
              txnInProgress={txnInProgress}
              getTradeStatusText={getTradeStatusText}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TradesSection
