import React from 'react'

const ListingPage = () => {
  return (
    <div className='w-screen min-h-screen flex justify-center'>
      <div>
        <HeaderComponent />

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
    </div>
  )
}

export default ListingPage
