export interface Trade {
  id: string
  proposer: string
  recipient: string
  description: string
  status: number // 0: proposed, 1: accepted, 2: completed, 3: cancelled
  createdAt: string
  updatedAt: string
}
