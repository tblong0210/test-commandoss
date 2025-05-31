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
    <div className='px-5'>
      {loading ? (
        <p>Loading listings...</p>
      ) : listings.length === 0 ? (
        <p>No listings available.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
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
