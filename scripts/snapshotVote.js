// workaround to allow require statements while {type: module}
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// workaround to allow __dirname while {type: module}
const path = require("path");
const __dirname = path.resolve(path.dirname(''));

// import/require statements
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Web3 = require('web3');
const fs = require("fs");
const { ethers } = require("ethers");
import snapshot from '@snapshot-labs/snapshot.js';
const hub = 'https://hub.snapshot.org'; // or https://testnet.snapshot.org for testnet
const client = new snapshot.Client712(hub);

// define paths
const choicesPath = path.join(__dirname, '..', '..', 'snapshot-query', 'choices.json');
const encrPkPath = path.join(__dirname, '..', '..', 'test_wallet_encrPK.json');
const INFURA_KEY = process.env.WEB3_INFURA_PROJECT_ID;
const ENCR_PW = process.env.ENCR_PW;
const choices = require(choicesPath);

// decrypt ETH wallet
const rpcURL = "https://mainnet.infura.io/" + INFURA_KEY;
const web3 = new Web3(rpcURL);
function getAccount (pathToEncrPk, encrPw) {
    let contents = fs.readFileSync(pathToEncrPk);
    let parsed = (JSON.parse(contents));
    return web3.eth.accounts.decrypt(parsed, encrPw);
};
const account = getAccount(encrPkPath, ENCR_PW);

// instantiate signer with wallet keys
const { ethers } = require("ethers");
const INFURA_SECRET = process.env.WEB3_INFURA_PROJECT_SECRET;
const provider = new ethers.providers.InfuraProvider("homestead", INFURA_KEY)
const wallet = new ethers.Wallet(account.privateKey, provider)
var signer = wallet.connect(provider)

// convert voting data to right format
const getVoteDict = (proposal) => {
  outObj = {
    space: proposal['space'],
    proposal: proposal['id'],
    type: proposal['type'],
    choice: proposal['pop_choice'],
    metadata: JSON.stringify({})
  };
  return outObj;
};

// vote with each wallet as determined in choices.json
for (let wallet_proposals of Object.entries(choices)) {
  wallet = wallet_proposals[0];
  proposals = wallet_proposals[1];

  for (let prop of Object.values(proposals)) {
    voteDict = getVoteDict(prop);
    let receipt = await client.vote(signer, wallet, voteDict);
    console.log(receipt);
  };
};


console.log('Groovey!')
