
import express from 'express';
import * as bip39 from 'bip39'
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58'
const app = express();
const port = 3000;
//First Generate Mneomic 
let genreatedMnemomic: string;
let solanaCount = 0;
let etherumCount = 0;


genreatedMnemomic = bip39.generateMnemonic()
console.log(genreatedMnemomic)


app.get('/generatedSolana', (req, res) => {
     if (!genreatedMnemomic) {
          res.status(401).json({
               msg: "Error in generating  mnemonic"
          })
     }
     const seed = bip39.mnemonicToSeedSync(genreatedMnemomic)
     const path = `m/44'/501'/${solanaCount}'/0'`;
     const derivedKey = derivePath(path, seed.toString('hex')).key
     const sol = Keypair.fromSeed(derivedKey)
     res.status(200).json({
          "Public_Key": sol.publicKey,
          "Private_Key": bs58.encode(sol.secretKey),
          "Account_Index":solanaCount,
          "DerivationPath":path

     })
     solanaCount++
})
app.get('/health', (req, res) => {
     res.send('Healty');
});
app.listen(port, () => {
     console.log(
          `Connected successfully on port ${port}`)
});