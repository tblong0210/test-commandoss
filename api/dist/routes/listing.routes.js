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
// Create
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listing = yield prisma.listing.create({ data: req.body });
        res.status(201).json(listing);
    }
    catch (err) {
        res.status(400).json({ error: "Failed to create listing", details: err });
    }
}));
// Read all
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listings = yield prisma.listing.findMany();
    res.json(listings);
}));
// Read one
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield prisma.listing.findUnique({
        where: { id: req.params.id },
    });
    listing ? res.json(listing) : res.status(404).send("Not found");
}));
// Update
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listing = yield prisma.listing.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(listing);
    }
    catch (err) {
        res.status(404).json({ error: "Listing not found or update failed" });
    }
}));
// Delete
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.listing.delete({ where: { id: req.params.id } });
        res.sendStatus(204);
    }
    catch (err) {
        res.status(404).json({ error: "Listing not found" });
    }
}));
exports.default = router;
