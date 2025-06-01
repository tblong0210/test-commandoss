import React from 'react'

import { useCurrentAccount } from '@mysten/dapp-kit'

import ListingsSection from '../components/ListingsSection'
import ProposeTradeForm from '../components/ProposeTradeForm'
import { useNotificationStore } from '../stores/notification-store'
import { useListings, useTradeActions } from '../stores/store'
import { Listing } from '../types'
import { clsx } from '../utils/helpers'

const ListingPage = () => {
  const currentAccount = useCurrentAccount()
  const listingsData = useListings()
  const { addNotification } = useNotificationStore()
  const { addTrade } = useTradeActions()

  const [isLoading] = React.useState(false)
  const [selectedListing, setSelectedListing] = React.useState<Listing | null>(null)

  const handleOpenProposeTrade = (lst: Listing) => {
    if (!currentAccount) {
      console.error('No current account found')
      return
    }
    setSelectedListing(lst)
  }

  const handleProposeTrade = (data: { description: string }) => {
    handleCancelProposal()
    addTrade({
      proposer: currentAccount?.address || '',
      recipient: selectedListing?.owner || '',
      description: data.description
    })
    addNotification('Trade proposal sent successfully!', 'success')
  }

  const handleCancelProposal = () => {
    setSelectedListing(null)
  }
  return (
    <div>
      <div className={clsx(listingsData.length > 5 ? 'flex justify-center' : '', 'mt-5')}>
        <ListingsSection
          listings={listingsData}
          loading={false}
          currentAccount={currentAccount}
          onProposeTrade={handleOpenProposeTrade}
        />
      </div>
      {selectedListing && (
        <ProposeTradeForm
          selectedListing={selectedListing}
          proposeTrade={handleProposeTrade}
          loading={isLoading}
          onCancel={handleCancelProposal}
        />
      )}
    </div>
  )
}

export default ListingPage
