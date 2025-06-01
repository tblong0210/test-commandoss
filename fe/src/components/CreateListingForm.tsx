import React from 'react'
import { NewListing } from '../types'
import { Button, Card, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'

interface CreateListingFormProps {
  createListing: (data: NewListing) => void
  loading: boolean
  currentAccount: { address: string } | null
}

const CreateListingForm: React.FC<CreateListingFormProps> = ({ createListing, loading, currentAccount }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewListing>()

  const onSubmit: SubmitHandler<NewListing> = (data) => {
    createListing(data)
  }

  return (
    <Card
      sx={{
        width: 500,
        padding: 3
      }}
    >
      <h2 className='text-center text-2xl font-bold mb-10'>Create New Listing</h2>

      {currentAccount ? (
        <p>Please connect your wallet to create listings.</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <TextField
              id='name'
              label='Your Name'
              variant='outlined'
              size='small'
              fullWidth
              required
              {...register('name', { required: true })}
              error={!!errors.title}
              helperText={errors.title ? 'Your Name is required' : ''}
            />
          </div>

          <div className='mt-2'>
            <TextField
              id='title'
              label='Title'
              variant='outlined'
              size='small'
              fullWidth
              required
              {...register('title', { required: true })}
              error={!!errors.title}
              helperText={errors.title ? 'Title is required' : ''}
            />
          </div>

          <div className='mt-2'>
            <TextField
              id='description'
              label='Description'
              variant='outlined'
              size='small'
              fullWidth
              multiline
              rows={4}
              required
              {...register('description', { required: true })}
              error={!!errors.description}
              helperText={errors.description ? 'Description is required' : ''}
            />
          </div>

          <div className='mt-2'>
            <FormControl fullWidth>
              <InputLabel id='type'>Type</InputLabel>
              <Select
                labelId='type'
                id='type-select'
                size='small'
                label='Type'
                defaultValue={0}
                {...register('type', { required: true })}
              >
                <MenuItem value={0}>Skill</MenuItem>
                <MenuItem value={1}>Item</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={loading}
            sx={{ marginTop: 2, width: '100%' }}
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </Button>
        </form>
      )}
    </Card>
  )
}

export default CreateListingForm
