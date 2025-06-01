import express from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = express.Router()

// Create a new trade
router.post("/", async (req, res) => {
  try {
    const trade = await prisma.trade.create({
      data: req.body,
    })
    res.status(201).json(trade)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: "Failed to create trade" })
  }
})

// Get all trades
router.get("/", async (_req, res) => {
  const trades = await prisma.trade.findMany()
  res.json(trades)
})

// Get trade by ID
router.get("/:id", async (req: any, res: any) => {
  const trade = await prisma.trade.findUnique({
    where: { id: req.params.id },
  })

  if (!trade) return res.status(404).json({ error: "Trade not found" })
  res.json(trade)
})

// Update a trade
router.put("/:id", async (req, res) => {
  try {
    const updatedTrade = await prisma.trade.update({
      where: { id: req.params.id },
      data: req.body,
    })
    res.json(updatedTrade)
  } catch (error) {
    console.error(error)
    res.status(404).json({ error: "Trade not found or update failed" })
  }
})

// Delete a trade
router.delete("/:id", async (req, res) => {
  try {
    await prisma.trade.delete({
      where: { id: req.params.id },
    })
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(404).json({ error: "Trade not found" })
  }
})

export default router
