# Crypto Wallet Generator - Frontend

A clean and modern UI for generating Solana and Ethereum keypairs from a mnemonic phrase.

## Features

- 🎨 Clean, modern UI with black background
- 🔐 Display mnemonic phrase on page load
- 💼 Generate Solana wallets with one click
- 💼 Generate Ethereum wallets with one click
- 📋 Copy public and private keys to clipboard
- 📱 Responsive design
- ✨ Smooth animations and transitions

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:3000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Backend Requirements

Make sure your backend is running on `http://localhost:3000` with the following endpoints:

- `GET /generatedSolana` - Generate Solana keypair
- `GET /generateEtherum` - Generate Ethereum keypair

## Usage

1. When you open the page, the mnemonic phrase will be displayed at the top
2. Click "Generate Solana Wallet" to create a new Solana keypair
3. Click "Generate Ethereum Wallet" to create a new Ethereum keypair
4. Each new keypair is added to the list below (previous ones are preserved)
5. Click the copy icon to copy public or private keys to clipboard

## Security Warning

⚠️ **IMPORTANT**: This is a development tool. Never use generated wallets for real funds without proper security measures. Always keep your private keys and mnemonic phrases secure.
