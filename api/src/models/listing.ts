export interface Listing {
  id: string
  title: string
  description: string
  type: "skill" | "item"
  owner: string
  ownerName: string
  status: string
  createdAt: string
}
