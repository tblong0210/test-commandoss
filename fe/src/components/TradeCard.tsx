import React from 'react'
import { Trade } from '../types'

interface TradeCardProps {
  trade: Trade
  isProposer: boolean
  isRecipient: boolean
  onAccept: (tradeId: string) => void
  onComplete: (tradeId: string) => void
  onCancel: (tradeId: string) => void
  txnInProgress: boolean
  getTradeStatusText: (status: number) => string
}

const TradeCard: React.FC<TradeCardProps> = ({
  trade,
  isProposer,
  isRecipient,
  onAccept,
  onComplete,
  onCancel,
  txnInProgress,
  getTradeStatusText
}) => {
  return (
    <div className='trade-card'>
      <div className='trade-header'>
        <h3>
          Trade #{trade.id.substring(0, 6)}...{trade.id.substring(trade.id.length - 4)}
        </h3>
        <span className={`trade-status status-${trade.status}`}>{getTradeStatusText(trade.status)}</span>
      </div>
      <p className='trade-description'>{trade.description}</p>
      <div className='trade-details'>
        <div>
          <strong>Proposer:</strong>{' '}
          {isProposer
            ? 'You'
            : `${trade.proposer.substring(0, 6)}...${trade.proposer.substring(trade.proposer.length - 4)}`}
        </div>
        <div>
          <strong>Recipient:</strong>{' '}
          {isRecipient
            ? 'You'
            : `${trade.recipient.substring(0, 6)}...${trade.recipient.substring(trade.recipient.length - 4)}`}
        </div>
      </div>
      <div className='trade-actions'>
        {trade.status === 0 && isRecipient && (
          <button onClick={() => onAccept(trade.id)} disabled={txnInProgress} className='action-button accept'>
            {txnInProgress ? 'Processing...' : 'Accept Trade'}
          </button>
        )}
        {trade.status === 1 && (isProposer || isRecipient) && (
          <button onClick={() => onComplete(trade.id)} disabled={txnInProgress} className='action-button complete'>
            {txnInProgress ? 'Processing...' : 'Complete Trade'}
          </button>
        )}
        {(trade.status === 0 || trade.status === 1) && (isProposer || isRecipient) && (
          <button onClick={() => onCancel(trade.id)} disabled={txnInProgress} className='action-button cancel'>
            {txnInProgress ? 'Processing...' : 'Cancel Trade'}
          </button>
        )}
      </div>
    </div>
  )
}

export default TradeCard
