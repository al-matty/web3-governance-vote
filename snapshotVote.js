require('dotenv').config();

// define paths
INFURA_KEY = process.env.WEB3_INFURA_PROJECT_ID;
const wallets_path = './wallets.txt'
const to_vote_path = './to_vote.json'
const choices_path = './choices.json'

// initiate web3 connection
const Web3 = require('web3')
const rpcURL = "https://mainnet.infura.io/" + INFURA_KEY
const web3 = new Web3(rpcURL)

// test wallet
const address = ""
//console.log(address)


//console.log(balance)

// implement keychain  handling

// handle pk with test wallet

// import snapshot.js

// read to_vote.js

// read choices.js

// define voting with one wallet

// iterate over all wallets in to_vote: call voting function
