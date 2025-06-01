"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const listing_routes_1 = __importDefault(require("./routes/listing.routes"));
const trade_routes_1 = __importDefault(require("./routes/trade.routes"));
const app = (0, express_1.default)();
const port = 3333;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/api/listings", listing_routes_1.default);
app.use("/api/trades", trade_routes_1.default);
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
