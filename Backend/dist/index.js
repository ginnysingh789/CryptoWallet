"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bip39 = __importStar(require("bip39"));
const ed25519_hd_key_1 = require("ed25519-hd-key");
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const app = (0, express_1.default)();
const port = 3000;
//First Generate Mneomic 
let genreatedMnemomic;
let solanaCount = 0;
let etherumCount = 0;
genreatedMnemomic = bip39.generateMnemonic();
console.log(genreatedMnemomic);
app.get('/generatedSolana', (req, res) => {
    if (!genreatedMnemomic) {
        res.status(401).json({
            msg: "Error in generating  mnemoic"
        });
    }
    const seed = bip39.mnemonicToSeedSync(genreatedMnemomic);
    const path = `m/44'/501'/${solanaCount}'/0'`;
    const derivedKey = (0, ed25519_hd_key_1.derivePath)(path, seed.toString('hex')).key;
    const sol = web3_js_1.Keypair.fromSeed(derivedKey);
    res.status(200).json({
        "Public-Key": sol.publicKey,
        "Private-Key": bs58_1.default.encode(sol.secretKey)
    });
    solanaCount++;
});
app.get('/health', (req, res) => {
    res.send('Healty');
});
app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});
//# sourceMappingURL=index.js.map