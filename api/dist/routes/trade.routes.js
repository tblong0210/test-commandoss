"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
// Create a new trade
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trade = yield prisma.trade.create({
            data: req.body,
        });
        res.status(201).json(trade);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: "Failed to create trade" });
    }
}));
// Get all trades
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trades = yield prisma.trade.findMany();
    res.json(trades);
}));
// Get trade by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trade = yield prisma.trade.findUnique({
        where: { id: req.params.id },
    });
    if (!trade)
        return res.status(404).json({ error: "Trade not found" });
    res.json(trade);
}));
// Update a trade
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTrade = yield prisma.trade.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(updatedTrade);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: "Trade not found or update failed" });
    }
}));
// Delete a trade
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.trade.delete({
            where: { id: req.params.id },
        });
        res.sendStatus(204);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: "Trade not found" });
    }
}));
exports.default = router;
