const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Web3 = require('web3');
const fs = require("fs");

// load environment variables
const INFURA_KEY = process.env.WEB3_INFURA_PROJECT_ID;
const ENCR_PW = process.env.ENCR_PW;

// define paths
const walletsPath = path.join(__dirname, '..', 'src', 'wallets.txt');
const toVotePath = path.join(__dirname, '..', 'src', 'to_vote.json');
const choicesPath = path.join(__dirname, '..', 'src', 'choices.json');
const encrPkPath = path.join(__dirname, '..', '..', 'test_wallet_encrPK.json');

// initiate web3 connection
const rpcURL = "https://mainnet.infura.io/" + INFURA_KEY;
const web3 = new Web3(rpcURL);

// takes path to encr account json file, returns account object
function getAccount (pathToEncrPk, encrPw) {
    let contents = fs.readFileSync(pathToEncrPk);
    let parsed = (JSON.parse(contents));
    return web3.eth.accounts.decrypt(parsed, encrPw);
}

// instantiate account object
const account = getAccount(encrPkPath, ENCR_PW);
