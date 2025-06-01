import React, { ReactNode } from 'react'
import { Trade } from '../types'
import { Card } from '@mui/material'

interface TradeCardProps {
  trade: Trade
  isProposer: boolean
  isRecipient: boolean
  onAccept: (tradeId: string) => void
  onComplete: (tradeId: string) => void
  onCancel: (tradeId: string) => void
  txnInProgress: boolean
  getTradeStatusText: (status: number) => ReactNode
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
  console.log(`Rendering TradeCard for trade ID:`, trade)

  return (
    <Card
      sx={{
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 2
      }}
    >
      <div className='flex justify-between'>
        <h3 className='text-xl font-bold'>
          Trade #{trade.id.substring(0, 6)}...{trade.id.substring(trade.id.length - 4)}
        </h3>
        <span>{getTradeStatusText(trade.status)}</span>
      </div>
      <p className='py-5 text-sm'>{trade.description}</p>
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
    </Card>
  )
}

export default TradeCard
