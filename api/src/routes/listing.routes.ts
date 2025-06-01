import express from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = express.Router()

// Create
router.post("/", async (req, res) => {
  try {
    const listing = await prisma.listing.create({ data: req.body })
    res.status(201).json(listing)
  } catch (err) {
    res.status(400).json({ error: "Failed to create listing", details: err })
  }
})

// Read all
router.get("/", async (req, res) => {
  const listings = await prisma.listing.findMany()
  res.json(listings)
})

// Read one
router.get("/:id", async (req, res) => {
  const listing = await prisma.listing.findUnique({
    where: { id: req.params.id },
  })
  listing ? res.json(listing) : res.status(404).send("Not found")
})

// Update
router.put("/:id", async (req, res) => {
  try {
    const listing = await prisma.listing.update({
      where: { id: req.params.id },
      data: req.body,
    })
    res.json(listing)
  } catch (err) {
    res.status(404).json({ error: "Listing not found or update failed" })
  }
})

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await prisma.listing.delete({ where: { id: req.params.id } })
    res.sendStatus(204)
  } catch (err) {
    res.status(404).json({ error: "Listing not found" })
  }
})

export default router
