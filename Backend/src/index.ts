
import express from 'express';
import * as bip39 from 'bip39'
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
const app = express();
const port = 3000;
//First Generate Mneomic 
let genreatedMnemomic:string;
let solanaCount=0;
let etherumCount=0;

app.get('/',(req,res)=>{
      genreatedMnemomic =bip39.generateMnemonic()
     console.log(genreatedMnemomic)
     res.status(200).send("Generated")
})

app.get('/generatedSolana',(req,res)=>{
     const seed =bip39.mnemonicToSeedSync(genreatedMnemomic)
     const path= "m/44'/501'/0'/0'";
     const derivedKey=derivePath(path,seed.toString('hex')).key
     const sol=Keypair.fromSeed(derivedKey)
     res.status(200).json({
          "Public-Key":sol.publicKey,
          "Private-Key":sol.secretKey.toString()

     })

     solanaCount++


})





app.get('/health', (req, res)=>
{
     res.send('Healty');
});



 app.listen(port, ()=>{
     console.log(
`Connected successfully on port ${port}`)
});