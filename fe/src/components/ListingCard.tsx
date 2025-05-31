import React from 'react'
import { Listing } from '../types'
import Card from '@mui/material/Card'
import { Avatar, Button, Chip } from '@mui/material'

interface ListingCardProps {
  listing: Listing
  onProposeTrade: (listing: Listing) => void
  currentAccount: { address: string } | null
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onProposeTrade, currentAccount }) => {
  return (
    <Card
      sx={{
        maxWidth: 275,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2,
        textAlign: 'center'
      }}
    >
      <div className='flex flex-col items-center'>
        <Avatar sx={{ width: 42, height: 42 }} />
        <Chip
          className='!h-fit w-fit !p-1 !rounded-[4px] !my-2'
          label={listing.type}
          color='primary'
          variant='outlined'
        />
        <div className='mt-2'>
          <h1 className='text-2xl font-bold'>{listing.ownerName}</h1>
          <h2 className='text-xs font-semibold'>{listing.title}</h2>
        </div>
        <div className='mt-4 text-xs'>
          {listing.description.length > 50 ? `${listing.description.substring(0, 100)}...` : listing.description}
        </div>
      </div>
      <div className='mt-5'>
        <Button
          disabled={currentAccount === null}
          variant='contained'
          size='small'
          onClick={() => onProposeTrade(listing)}
        >
          Propose Trade
        </Button>
      </div>
    </Card>
  )
}

export default ListingCard
