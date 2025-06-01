import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import listingRoutes from "./routes/listing.routes"
import tradeRoutes from "./routes/trade.routes"

const app = express()
const port = 3333

app.use(cors())
app.use(bodyParser.json())

app.use("/api/listings", listingRoutes)
app.use("/api/trades", tradeRoutes)

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`)
})
