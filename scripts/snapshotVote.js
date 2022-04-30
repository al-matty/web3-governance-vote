require('dotenv').config();
const path = require("path");
const Web3 = require('web3')

// define paths
INFURA_KEY = process.env.WEB3_INFURA_PROJECT_ID;
const walletsPath = path.join(__dirname, '..', 'src', 'wallets.txt')
const toVotePath = path.join(__dirname, '..', 'src', 'to_vote.json')
const choicesPath = path.join(__dirname, '..', 'src', 'choices.json')

// initiate web3 connection
const rpcURL = "https://mainnet.infura.io/" + INFURA_KEY
const web3 = new Web3(rpcURL)

// test wallet
const address = //infer from file under walletsPath

//console.log(address)

//console.log(balance)

// implement keychain  handling

// handle pk with test wallet

// import snapshot.js

// read to_vote.js

// read choices.js

// define voting with one wallet

// iterate over all wallets in to_vote: call voting function
