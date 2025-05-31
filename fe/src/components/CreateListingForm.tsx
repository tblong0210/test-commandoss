import React, { useState } from 'react'
import { NewListing } from '../types'

interface CreateListingFormProps {
  createListing: (e: React.FormEvent) => void
  loading: boolean
  currentAccount: { address: string } | null
}

const CreateListingForm: React.FC<CreateListingFormProps> = ({ createListing, loading, currentAccount }) => {
  const [newListing, setNewListing] = useState<NewListing>({
    title: '',
    description: '',
    type: 'skill' // skill or item
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createListing(e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setNewListing({
      ...newListing,
      [id]: value // Type assertion needed for the 'type' field
    })
  }

  return (
    <div className='create-section'>
      <h2>Create New Listing</h2>

      {!currentAccount ? (
        <p>Please connect your wallet to create listings.</p>
      ) : (
        <form onSubmit={handleSubmit} className='create-form'>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' value={newListing.title} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea id='description' value={newListing.description} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label htmlFor='type'>Type</label>
            <select id='type' value={newListing.type} onChange={handleChange}>
              <option value='skill'>Skill</option>
              <option value='item'>Item</option>
            </select>
          </div>

          <button type='submit' disabled={loading} className='action-button'>
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
        </form>
      )}
    </div>
  )
}

export default CreateListingForm
