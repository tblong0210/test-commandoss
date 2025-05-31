import React from 'react'
import ListingCard from './ListingCard'
import { Listing } from '../types'

interface ListingsSectionProps {
  listings: Listing[]
  loading: boolean
  currentAccount: { address: string } | null
  onProposeTrade: (listing: Listing) => void
}

const ListingsSection: React.FC<ListingsSectionProps> = ({ listings, loading, currentAccount, onProposeTrade }) => {
  return (
    <div className=''>
      {loading ? (
        <p>Loading listings...</p>
      ) : listings.length === 0 ? (
        <p>No listings available.</p>
      ) : (
        <div className='flex'>
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              currentAccount={currentAccount}
              onProposeTrade={onProposeTrade}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ListingsSection
