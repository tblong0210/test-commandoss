# 🔁 SkillSwap

A web platform that allows people in Ho Chi Minh City (HCMC) to offer skills or items for barter/trade, or request help from others — all powered by the SUI blockchain.

---

## ✨ Key Features

- 🧑‍🏫 **Post Skills or Help Requests** – "I can teach basic Vietnamese, looking for someone to help fix my laptop"
- 🔍 **Search & Match Offers** – Filter offers/requests based on skill, location, or category
- 🔁 **Barter System** – Connect two users to exchange skills/items
- 🔐 **Blockchain Integration (SUI)** – Every successful barter is recorded immutably on-chain
- 🧾 **Optional Token Rewards** – Reputation or trade verification via NFTs/tokens (planned)

---

## 🚀 Live Demo

🌐 [https://test-commandoss.vercel.app](https://test-commandoss.vercel.app)  
🧪 *Note: Currently running on SUI Testnet. Use SUI Wallet to connect.*

---

## 📦 Tech Stack

| Layer       | Technology      |
|-------------|-----------------|
| Frontend    | React + Vite + TailwindCSS |
| Blockchain  | [SUI](https://sui.io) + Move |
| Wallet      | [SUI Wallet Kit](https://docs.sui.io/build/wallets) |

---

## 🛠️ How to Run Locally

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/skillswap.git](https://github.com/tblong0210/test-commandoss)
cd skillswap/fe
```

### 2. Run the Frontend
```bash
npm install && npm run dev
```

### 3. Connect to SUI Wallet
- Install SUI Wallet Extension
- Request test SUI from Faucet
- Connect wallet on the frontend

### 📜 Smart Contracts

All barter transactions are recorded using a custom Move smart contract deployed on SUI Devnet.

```bash
cd smart-contracts
sui move build
sui client publish --gas-budget 100000000
```

You'll need to have [SUI CLI](https://docs.sui.io/references/cli/client) installed.

# Thank you!
