import ethers from 'ethers'
import '../global'
const { HDNode, providers, utils, Wallet }  = ethers
var Web3 = require('web3')
var web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('https://mainnet.infura.io/yu9V033kKqpkKpVOf2hn'))
var web3Provider = new providers.Web3Provider(web3);

export function generateMnemonics() {
    return HDNode.entropyToMnemonic(utils.randomBytes(16)).split(' ');
}

export function loadWalletFromMnemonics(mnemonics){
    if (!(mnemonics instanceof Array) && typeof mnemonics !== 'string') {
        throw new Error('invalid mnemonic')
    } else if (mnemonics instanceof Array){
        mnemonics = mnemonics.join(' ') 
    }
    const wallet = Wallet.fromMnemonic(mnemonics)
    console.log('Wallet', wallet)
    return wallet
}

export function signedTransaction(wallet) {
   // const wallet = new Wallet(config.privateKey);
    wallet.provider = web3Provider


    const transaction = {
        nonce: 0,
        gasLimit: 21000,
        gasPrice: 10000000000000,
        to: '0x695b08825827E7cf9E0bE8F043a2051381848E40',
        value: 10000000000000,
        // data: "0x",
        // This ensures the transaction cannot be replayed on different networks
       // chainId: 3 // ropsten
    };
    let signedTransaction = wallet.sign(transaction)
    console.log('Sign Transaction', signedTransaction)
    return signedTransaction
   
}

module.exports = {
    generateMnemonics,
    loadWalletFromMnemonics,
    signedTransaction
}