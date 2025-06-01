import React, { ReactNode } from 'react'

import { Button, Card } from '@mui/material'

import { Trade } from '../types'

interface TradeCardProps {
  trade: Trade
  isProposer: boolean
  isRecipient: boolean
  onUpdateStatusTrade: (tradeId: string, status: number) => void
  txnInProgress: boolean
  getTradeStatusText: (status: number) => ReactNode
}

const TradeCard: React.FC<TradeCardProps> = ({
  trade,
  isProposer,
  isRecipient,
  onUpdateStatusTrade,
  txnInProgress,
  getTradeStatusText
}) => {
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
          <strong>Proposer:</strong>
          {isProposer
            ? 'You'
            : `${trade.proposer.substring(0, 6)}...${trade.proposer.substring(trade.proposer.length - 4)}`}
        </div>
        <div>
          <strong>Recipient:</strong>
          {isRecipient
            ? 'You'
            : `${trade.recipient.substring(0, 6)}...${trade.recipient.substring(trade.recipient.length - 4)}`}
        </div>
      </div>
      <div className='trade-actions'>
        {trade.status === 0 && isRecipient && (
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={txnInProgress}
            sx={{ marginTop: 2, width: '100%' }}
            onClick={() => onUpdateStatusTrade(trade.id, 1)}
          >
            {txnInProgress ? 'Processing...' : 'Accept Trade'}
          </Button>
        )}
        {trade.status === 1 && (isProposer || isRecipient) && (
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={txnInProgress}
            sx={{ marginTop: 3, width: '100%' }}
            onClick={() => onUpdateStatusTrade(trade.id, 2)}
          >
            {txnInProgress ? 'Processing...' : 'Complete Trade'}
          </Button>
        )}
        {(trade.status === 0 || trade.status === 1) && (isProposer || isRecipient) && (
          <Button
            type='submit'
            variant='contained'
            color='inherit'
            disabled={txnInProgress}
            sx={{ marginTop: 1, width: '100%' }}
            onClick={() => onUpdateStatusTrade(trade.id, 3)}
          >
            {txnInProgress ? 'Processing...' : 'Cancel Trade'}
          </Button>
        )}
      </div>
    </Card>
  )
}

export default TradeCard
