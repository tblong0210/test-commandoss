import React, { useState } from 'react'
import { useCurrentAccount } from '@mysten/dapp-kit'
import CreateListingForm from '../components/CreateListingForm'
import { NewListing } from '../types'

const CreateListingPage: React.FC = () => {
  const currentAccount = useCurrentAccount()
  const [loading, setLoading] = useState(false)

  const handleCreateListing = async (data: NewListing) => {}

  return (
    <div className='flex justify-center'>
      <CreateListingForm createListing={handleCreateListing} loading={loading} currentAccount={currentAccount} />
    </div>
  )
}

export default CreateListingPage
