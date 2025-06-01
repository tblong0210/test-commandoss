import React from 'react'
import { useForm } from 'react-hook-form'

import { Button, Modal, TextField } from '@mui/material'

import { Listing } from '../types'

interface ProposeTradeFormProps {
  selectedListing: Listing
  proposeTrade: (data: { description: string }) => void
  loading: boolean
  onCancel: () => void
}

const ProposeTradeForm: React.FC<ProposeTradeFormProps> = ({ selectedListing, proposeTrade, loading, onCancel }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ description: string }>()

  const onSubmit = (data: { description: string }) => {
    proposeTrade(data)
    reset()
  }

  return (
    <Modal open={!!selectedListing} onClose={onCancel} className='flex items-center justify-center'>
      <div className='bg-white text-gray-800 rounded-[5px] p-5 min-w-2xl'>
        <h2 className='text-center text-2xl font-bold mb-10'>Propose Trade</h2>
        <div className='bg-blue-100 p-5 rounded-[5px]'>
          <h2>Selected Listing:</h2>
          <h1 className='text-xl font-bold mt-2'> {selectedListing.title}</h1>
          <p>{selectedListing.description}</p>
          <p className='text-sm mt-5'>Owner: {selectedListing.ownerName}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
          <div className='form-group'>
            <TextField
              id='tradeDescription'
              label='Trade Description'
              variant='outlined'
              size='small'
              fullWidth
              required
              multiline
              rows={4}
              placeholder='Describe your trade proposal...'
              {...register('description', { required: true })}
              error={!!errors.description}
              helperText={errors.description ? 'Trade description is required' : ''}
            />
          </div>

          <div className='mt-5'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={loading}
              sx={{ marginTop: 1, width: '100%' }}
            >
              {loading ? 'Processing...' : 'CPropose Trade'}
            </Button>
            <Button variant='contained' color='secondary' sx={{ marginTop: 1, width: '100%' }} onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ProposeTradeForm
