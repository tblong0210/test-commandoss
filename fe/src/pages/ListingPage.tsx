import { useCurrentAccount } from '@mysten/dapp-kit'

import ListingsSection from '../components/ListingsSection'
import { Listing } from '../types'

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
  },
  {
    id: '3',
    title: 'Advanced JavaScript Techniques',
    description: 'Deep dive into JavaScript for experienced developers.',
    type: 'skill',
    owner: '0x456',
    ownerName: 'Bob',
    status: 'available',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Python for Data Science',
    description: 'Learn how to use Python for data analysis and visualization.',
    type: 'skill',
    owner: '0x789',
    ownerName: 'Charlie',
    status: 'available',
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Blockchain Development',
    description: 'Introduction to blockchain technology and smart contracts.',
    type: 'skill',
    owner: '0xabc',
    ownerName: 'Dave',
    status: 'available',
    createdAt: new Date().toISOString()
  }
]

const ListingPage = () => {
  const currentAccount = useCurrentAccount()

  const handleProposeTrade = (listing: Listing) => {
    console.log('Propose trade for listing:', listing)
    // Implement the logic to handle proposing a trade
  }
  return (
    <div>
      <div className='flex justify-center mt-10'>
        <ListingsSection
          listings={mockListings}
          loading={false}
          currentAccount={currentAccount}
          onProposeTrade={handleProposeTrade}
        />
      </div>

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
  )
}

export default ListingPage
