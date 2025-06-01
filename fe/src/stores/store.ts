import { useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Listing, Trade } from '../types'

interface AppState {
  listings: Listing[]
  trades: Trade[]
  addListing: (listing: Omit<Listing, 'id' | 'createdAt'>) => void
  updateListing: (id: string, updates: Partial<Omit<Listing, 'id'>>) => void
  removeListing: (id: string) => void
  addTrade: (trade: Omit<Trade, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void
  updateTradeStatus: (id: string, status: Trade['status']) => void
  cancelTrade: (id: string) => void
  getListingById: (id: string) => Listing | undefined
  getTradeById: (id: string) => Trade | undefined
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      listings: [],
      trades: [],

      // Listing actions
      addListing: (listing) =>
        set((state) => ({
          listings: [
            ...state.listings,
            {
              ...listing,
              id: uuidv4(),
              createdAt: new Date().toISOString()
            }
          ]
        })),

      updateListing: (id, updates) =>
        set((state) => ({
          listings: state.listings.map((listing) =>
            listing.id === id
              ? {
                  ...listing,
                  ...updates,
                  ...(updates.status && { updatedAt: new Date().toISOString() })
                }
              : listing
          )
        })),

      removeListing: (id) =>
        set((state) => ({
          listings: state.listings.filter((listing) => listing.id !== id),
          trades: state.trades.filter((trade) => !trade.description.includes(`listing:${id}`))
        })),

      // Trade actions
      addTrade: (trade) =>
        set((state) => ({
          trades: [
            ...state.trades,
            {
              ...trade,
              id: uuidv4(),
              status: 0, // proposed
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          ]
        })),

      updateTradeStatus: (id, status) =>
        set((state) => ({
          trades: state.trades.map((trade) =>
            trade.id === id
              ? {
                  ...trade,
                  status,
                  updatedAt: new Date().toISOString()
                }
              : trade
          )
        })),

      cancelTrade: (id) =>
        set((state) => ({
          trades: state.trades.map((trade) =>
            trade.id === id
              ? {
                  ...trade,
                  status: 3,
                  updatedAt: new Date().toISOString()
                }
              : trade
          )
        })),

      // Getters
      getListingById: (id) => {
        return get().listings.find((listing) => listing.id === id)
      },

      getTradeById: (id) => {
        return get().trades.find((trade) => trade.id === id)
      }
    }),
    {
      name: 'mock-data',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          return str ? JSON.parse(str) : null
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name)
      }
    }
  )
)

// Custom hooks for better usage
export const useListings = () => useStore((state) => state.listings)
export const useActiveListings = () => useStore((state) => state.listings.filter((l) => l.status === 'available'))
export const useTrades = () => useStore((state) => state.trades)
export const usePendingTrades = () => useStore((state) => state.trades.filter((t) => t.status === 0))

export const useListingActions = () => {
  const addListing = useStore((state) => state.addListing)
  const updateListing = useStore((state) => state.updateListing)
  const removeListing = useStore((state) => state.removeListing)
  const getListingById = useStore((state) => state.getListingById)

  // Return memoized object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      addListing,
      updateListing,
      removeListing,
      getListingById
    }),
    [addListing, updateListing, removeListing, getListingById]
  )
}

export const useTradeActions = () => {
  const addTrade = useStore((state) => state.addTrade)
  const updateTradeStatus = useStore((state) => state.updateTradeStatus)
  const cancelTrade = useStore((state) => state.cancelTrade)
  const getTradeById = useStore((state) => state.getTradeById)

  return useMemo(
    () => ({
      addTrade,
      updateTradeStatus,
      cancelTrade,
      getTradeById
    }),
    [addTrade, updateTradeStatus, cancelTrade, getTradeById]
  )
}
