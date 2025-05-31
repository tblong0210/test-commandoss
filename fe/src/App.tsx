import React from 'react'

import HeaderComponent from './components/HeaderComponent'
import TabNavigation from './components/TabNavigation'
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit'
import { Listing } from './types'
import ListingsSection from './components/ListingsSection'

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Learn React Basics',
    description: 'A comprehensive guide to get started with React.',
    type: 'skill',
    owner: '0x123',
    ownerName: 'Alice',
    status: 'available',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Advanced JavaScript Techniques',
    description: 'Deep dive into JavaScript for experienced developers.',
    type: 'skill',
    owner: '0x456',
    ownerName: 'Bob',
    status: 'available',
    createdAt: new Date().toISOString()
  }
]

const App: React.FC = () => {
  const currentAccount = useCurrentAccount()

  const handleProposeTrade = (listing: Listing) => {
    console.log('Propose trade for listing:', listing)
    // Implement the logic to handle proposing a trade
  }
  return (
    <div className='w-screen min-h-screen flex justify-center'>
      <div>
        <HeaderComponent />

        <ListingsSection
          listings={mockListings}
          loading={false}
          currentAccount={currentAccount}
          onProposeTrade={handleProposeTrade}
        />

        {/* {activeTab === 'trades' && (
          <TradesSection
            trades={trades}
            loading={loading}
            currentAccount={currentAccount}
            txnInProgress={txnInProgress}
            acceptTrade={acceptTrade}
            completeTrade={completeTrade}
            cancelTrade={cancelTrade}
            getTradeStatusText={getTradeStatusText}
          />
        )}

        {activeTab === 'create' && (
          <CreateListingForm createListing={createListing} loading={loading} currentAccount={currentAccount} />
        )}

        {activeTab === 'propose' && selectedListing && (
          <ProposeTradeForm
            selectedListing={selectedListing}
            tradeDescription={tradeDescription}
            setTradeDescription={setTradeDescription}
            proposeTrade={proposeTrade}
            txnInProgress={txnInProgress}
            onCancel={handleCancelProposal}
          />
        )}
      </div> */}
      </div>
    </div>
  )
}

export default App
