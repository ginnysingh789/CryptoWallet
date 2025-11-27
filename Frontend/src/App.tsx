import { useState, useEffect } from 'react'
import { Wallet, Key, Copy, Check } from 'lucide-react'

interface Keypair {
  publicKey: string
  privateKey: string
  accountIndex: number
  derivationPath: string
  type: 'solana' | 'ethereum'
}

function App() {
  const [mnemonic, setMnemonic] = useState<string>('')
  const [keypairs, setKeypairs] = useState<Keypair[]>([])
  const [copiedField, setCopiedField] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const API_BASE = 'http://localhost:3000'

  useEffect(() => {
    // Fetch mnemonic on page load
    fetchMnemonic()
  }, [])

  const fetchMnemonic = async () => {
    try {
      const response = await fetch(`${API_BASE}/mnemonic`)
      const data = await response.json()
      setMnemonic(data.mnemonic)
    } catch (error) {
      console.error('Error fetching mnemonic:', error)
      setMnemonic('Error loading mnemonic. Make sure backend is running.')
    }
  }

  const generateSolanaKeypair = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/generatedSolana`)
      const data = await response.json()
      
      const newKeypair: Keypair = {
        publicKey: data.Sol_Public_Key,
        privateKey: data.Sol_Private_Key,
        accountIndex: data.Account_Index,
        derivationPath: data.DerivationPath,
        type: 'solana'
      }
      
      setKeypairs(prev => [...prev, newKeypair])
    } catch (error) {
      console.error('Error generating Solana keypair:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateEthereumKeypair = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/generateEtherum`)
      const data = await response.json()
      
      const newKeypair: Keypair = {
        publicKey: data.Address,
        privateKey: data.Eth_Private_key,
        accountIndex: data.Account_Index,
        derivationPath: data.DerivationPath,
        type: 'ethereum'
      }
      
      setKeypairs(prev => [...prev, newKeypair])
    } catch (error) {
      console.error('Error generating Ethereum keypair:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(''), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wallet className="w-10 h-10 text-blue-500" />
            <h1 className="text-4xl font-bold text-white">
              Crypto Wallet Generator
            </h1>
          </div>
          <p className="text-gray-400 text-sm">Generate secure Solana and Ethereum keypairs</p>
        </div>

        {/* Mnemonic Display */}
        <div className="mb-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <Key className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-semibold text-gray-200">Secret Recovery Phrase</h2>
          </div>
          <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-300 text-sm leading-relaxed font-mono break-all">
              {mnemonic || 'Loading mnemonic...'}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-3">⚠️ Keep this phrase secure. Never share it with anyone.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <button
            onClick={generateSolanaKeypair}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-700 disabled:to-gray-800 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/50 disabled:cursor-not-allowed"
          >
            <Wallet className="w-5 h-5" />
            Generate Solana Wallet
          </button>
          
          <button
            onClick={generateEthereumKeypair}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-700 disabled:to-gray-800 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/50 disabled:cursor-not-allowed"
          >
            <Wallet className="w-5 h-5" />
            Generate Ethereum Wallet
          </button>
        </div>

        {/* Keypairs Display - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Solana Wallets - Left Column */}
          <div>
            <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
              <Wallet className="w-6 h-6" />
              Solana Wallets
            </h2>
            <div className="space-y-4">
              {keypairs.filter(kp => kp.type === 'solana').length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700">
                  <Wallet className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No Solana wallets yet</p>
                </div>
              ) : (
                keypairs.filter(kp => kp.type === 'solana').map((keypair, index) => (
              <div
                key={`${keypair.type}-${index}`}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl hover:border-gray-600 transition-all duration-200"
              >
                {/* Keypair Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      keypair.type === 'solana' 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold capitalize">
                        {keypair.type} Wallet
                      </h3>
                      <p className="text-xs text-gray-500">Account #{keypair.accountIndex}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{keypair.derivationPath}</span>
                </div>

                {/* Public Key */}
                <div className="mb-4">
                  <label className="text-xs text-gray-400 mb-2 block font-semibold">
                    {keypair.type === 'ethereum' ? 'Address' : 'Public Key'}
                  </label>
                  <div className="flex items-center gap-2 bg-black/50 rounded-lg p-3 border border-gray-700">
                    <p className="text-sm font-mono text-gray-300 flex-1 break-all">
                      {keypair.publicKey}
                    </p>
                    <button
                      onClick={() => copyToClipboard(keypair.publicKey, `public-sol-${index}`)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                      title="Copy to clipboard"
                    >
                      {copiedField === `public-sol-${index}` ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Private Key */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block font-semibold">
                    Private Key
                  </label>
                  <div className="flex items-center gap-2 bg-black/50 rounded-lg p-3 border border-red-900/30">
                    <p className="text-sm font-mono text-gray-300 flex-1 break-all">
                      {keypair.privateKey}
                    </p>
                    <button
                      onClick={() => copyToClipboard(keypair.privateKey, `private-sol-${index}`)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                      title="Copy to clipboard"
                    >
                      {copiedField === `private-sol-${index}` ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-red-400 mt-2">⚠️ Never share your private key</p>
                </div>
              </div>
            ))
              )}
            </div>
          </div>

          {/* Ethereum Wallets - Right Column */}
          <div>
            <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
              <Wallet className="w-6 h-6" />
              Ethereum Wallets
            </h2>
            <div className="space-y-4">
              {keypairs.filter(kp => kp.type === 'ethereum').length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700">
                  <Wallet className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No Ethereum wallets yet</p>
                </div>
              ) : (
                keypairs.filter(kp => kp.type === 'ethereum').map((keypair, index) => (
              <div
                key={`${keypair.type}-${index}`}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl hover:border-gray-600 transition-all duration-200"
              >
                {/* Keypair Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      keypair.type === 'solana' 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold capitalize">
                        {keypair.type} Wallet
                      </h3>
                      <p className="text-xs text-gray-500">Account #{keypair.accountIndex}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{keypair.derivationPath}</span>
                </div>

                {/* Public Key */}
                <div className="mb-4">
                  <label className="text-xs text-gray-400 mb-2 block font-semibold">
                    {keypair.type === 'ethereum' ? 'Address' : 'Public Key'}
                  </label>
                  <div className="flex items-center gap-2 bg-black/50 rounded-lg p-3 border border-gray-700">
                    <p className="text-sm font-mono text-gray-300 flex-1 break-all">
                      {keypair.publicKey}
                    </p>
                    <button
                      onClick={() => copyToClipboard(keypair.publicKey, `public-eth-${index}`)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                      title="Copy to clipboard"
                    >
                      {copiedField === `public-eth-${index}` ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Private Key */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block font-semibold">
                    Private Key
                  </label>
                  <div className="flex items-center gap-2 bg-black/50 rounded-lg p-3 border border-red-900/30">
                    <p className="text-sm font-mono text-gray-300 flex-1 break-all">
                      {keypair.privateKey}
                    </p>
                    <button
                      onClick={() => copyToClipboard(keypair.privateKey, `private-eth-${index}`)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                      title="Copy to clipboard"
                    >
                      {copiedField === `private-eth-${index}` ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-red-400 mt-2">⚠️ Never share your private key</p>
                </div>
              </div>
            ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
