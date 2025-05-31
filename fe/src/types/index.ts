// Define types for the application

export interface Listing {
  id: string
  title: string
  description: string
  type: 'skill' | 'item'
  owner: string
  ownerName: string
  status: string
  createdAt: string
}

export interface Trade {
  id: string
  proposer: string
  recipient: string
  description: string
  status: number // 0: proposed, 1: accepted, 2: completed, 3: cancelled
  createdAt: string
  updatedAt: string
}

export interface NewListing {
  title: string
  description: string
  type: 'skill' | 'item'
}
