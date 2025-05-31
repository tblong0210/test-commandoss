import React from 'react'
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
  getTradeStatusText: (status: number) => string
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
      <h2>Your Trades</h2>

      {!currentAccount ? (
        <p>Please connect your wallet to view trades.</p>
      ) : loading ? (
        <p>Loading trades...</p>
      ) : trades.length === 0 ? (
        <p>No trades found.</p>
      ) : (
        <div className='trades-list'>
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
