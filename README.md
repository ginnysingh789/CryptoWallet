# Crypto Wallet Generator

A web application for generating hierarchical deterministic wallets for Solana and Ethereum blockchains. The application uses BIP39 mnemonic phrases to create multiple wallet addresses following the BIP44 standard.

## About

This project consists of a Node.js backend API and a React frontend. Users can generate a mnemonic phrase or import an existing one, then create multiple Solana and Ethereum wallets from that single phrase. Each wallet is derived using a unique account index, allowing for organized wallet management.

The backend handles wallet generation using industry-standard libraries like Solana Web3.js and Ethers.js. The frontend provides a clean interface with separate columns for Solana and Ethereum wallets, making it easy to manage multiple addresses.

## Getting Started

Install dependencies and start both servers:

Backend:
```bash
cd Backend
npm install
npm run start
```

Frontend:
```bash
cd Frontend
npm install
npm run dev
```

The application will be available at http://localhost:5173 with the API running on http://localhost:3000.


