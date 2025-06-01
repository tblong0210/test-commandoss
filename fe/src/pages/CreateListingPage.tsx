import { useState } from 'react'

import { useCurrentAccount } from '@mysten/dapp-kit'

import CreateListingForm from '../components/CreateListingForm'
import { useNotificationStore } from '../stores/notification-store'
import { useListingActions } from '../stores/store'
import { NewListing } from '../types'

const CreateListingPage = () => {
  const currentAccount = useCurrentAccount()
  const [loading, setLoading] = useState(false)
  const { addListing } = useListingActions()
  const { addNotification } = useNotificationStore()

  const handleCreateListing = (data: NewListing) => {
    if (!currentAccount) {
      console.error('No current account found')
      return
    }

    setLoading(true)
    try {
      addListing({
        title: data.title,
        description: data.description,
        type: data.type,
        owner: currentAccount.address,
        ownerName: data.name,
        status: 'available'
      })
      addNotification('Listing created successfully!', 'success')
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error creating listing:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center'>
      <CreateListingForm createListing={handleCreateListing} loading={loading} currentAccount={currentAccount} />
    </div>
  )
}

export default CreateListingPage
