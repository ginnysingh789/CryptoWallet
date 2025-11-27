
import express from 'express';
import * as bip39 from 'bip39'
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58'
import * as ethers from 'ethers'
const app = express();
const port = 3000;
//First Generate Mneomic 
let genreatedMnemomic: string;
let solanaCount = 0;
let etherumCount = 0;
genreatedMnemomic = bip39.generateMnemonic()
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
          "Sol_Public_Key": sol.publicKey,
          "Sol_Private_Key": bs58.encode(sol.secretKey),
          "Account_Index":solanaCount,
          "DerivationPath":path

     })
     solanaCount++
})
//In Etherum Public key is not equal to the address by using this your public key is not exposed until you made transaction
app.get('/generateEtherum',(req,res)=>{
     if(!genreatedMnemomic){
          res.status(401).json({
               msg:"Error in mnemoic"
          })
     }
          const seed=ethers.Mnemonic.fromPhrase(genreatedMnemomic)     
          const path=`m/44'/60'/${etherumCount}'/0'`;
          const eth=ethers.HDNodeWallet.fromMnemonic(seed,path)
          console.log(eth)
          res.status(200).json({
               "Eth_Public_key":eth.publicKey,
               "Eth_Private_key":eth.privateKey,
               "Address":eth.address,
               "Account_Index":etherumCount,
               "DerivationPath":path
     
          })
          etherumCount++
     
})
app.get('/health', (req, res) => {
     res.send('Healty');
});
app.listen(port, () => {
     console.log(
          `Connected successfully on port ${port}`)
});