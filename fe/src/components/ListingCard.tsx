import React from 'react'
import { Listing } from '../types'
import Card from '@mui/material/Card'

interface ListingCardProps {
  listing: Listing
  onProposeTrade: (listing: Listing) => void
  currentAccount: { address: string } | null
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onProposeTrade, currentAccount }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <div className='listing-header'>
        <h3>{listing.title}</h3>
        <span className={`listing-type ${listing.type}`}>{listing.type}</span>
      </div>
      <p className='listing-description'>{listing.description}</p>
      <div className='listing-footer'>
        <span>By: {listing.ownerName}</span>
        {currentAccount && listing.owner !== currentAccount.address && (
          <button onClick={() => onProposeTrade(listing)} className='action-button'>
            Propose Trade
          </button>
        )}
      </div>
    </Card>
  )
}

export default ListingCard
