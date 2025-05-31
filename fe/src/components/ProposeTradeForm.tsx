import React from 'react'
import { Listing } from '../types'

interface ProposeTradeFormProps {
  selectedListing: Listing
  tradeDescription: string
  setTradeDescription: (description: string) => void
  proposeTrade: (e: React.FormEvent) => void
  txnInProgress: boolean
  onCancel: () => void
}

const ProposeTradeForm: React.FC<ProposeTradeFormProps> = ({
  selectedListing,
  tradeDescription,
  setTradeDescription,
  proposeTrade,
  txnInProgress,
  onCancel
}) => {
  return (
    <div className='propose-section'>
      <h2>Propose Trade</h2>

      <div className='selected-listing'>
        <h3>Selected Listing: {selectedListing.title}</h3>
        <p>{selectedListing.description}</p>
        <p>Owner: {selectedListing.ownerName}</p>
      </div>

      <form onSubmit={proposeTrade} className='propose-form'>
        <div className='form-group'>
          <label htmlFor='tradeDescription'>Trade Description</label>
          <textarea
            id='tradeDescription'
            value={tradeDescription}
            onChange={(e) => setTradeDescription(e.target.value)}
            placeholder="Describe what you're offering in exchange..."
            required
          />
        </div>

        <div className='form-actions'>
          <button type='button' onClick={onCancel} className='action-button cancel'>
            Cancel
          </button>

          <button type='submit' disabled={txnInProgress} className='action-button'>
            {txnInProgress ? 'Processing...' : 'Propose Trade'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProposeTradeForm
