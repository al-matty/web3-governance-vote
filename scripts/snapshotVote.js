// workaround to allow require statements with node.js while {type: module}
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// workaround to allow __dirname with node.js while {type: module}
const path = require("path");
const __dirname = path.resolve(path.dirname(''));

// imports
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Web3 = require('web3');
const fs = require("fs");
const { ethers } = require("ethers");
import snapshot from '@snapshot-labs/snapshot.js';

// paths
const choicesPath = path.join(__dirname, '..', '..', 'snapshot-query', 'choices.json');
const encrPkPath = path.join(__dirname, '..', '..', 'test_wallet_encrPK.json');
const INFURA_KEY = process.env.WEB3_INFURA_PROJECT_ID;
const ENCR_PW_MM = process.env.ENCR_PW_MM;
const ENCR_PW = process.env.ENCR_PW;

// decrypt ETH wallet
const rpcURL = "https://mainnet.infura.io/" + INFURA_KEY;
const web3 = new Web3(rpcURL);
function getAccount (pathToEncrPk, encrPw) {
    let contents = fs.readFileSync(pathToEncrPk);
    let parsed = (JSON.parse(contents));
    return web3.eth.accounts.decrypt(parsed, encrPw);
};
const account = getAccount(encrPkPath, ENCR_PW_MM);

// instantiate signer with wallet keys
const hub = 'https://hub.snapshot.org'; // or https://testnet.snapshot.org for testnet
const client = new snapshot.Client712(hub);
const INFURA_SECRET = process.env.WEB3_INFURA_PROJECT_SECRET;
const provider = new ethers.providers.InfuraProvider("homestead", INFURA_KEY)
const wallet = new ethers.Wallet(account.privateKey, provider)
var signer = wallet.connect(provider)

// convert voting data to right format
const getVoteDict = (proposal) => {
  return {
    space: proposal['space'],
    proposal: proposal['id'],
    type: proposal['type'],
    choice: proposal['pop_choice'],
    metadata: JSON.stringify({})
  };
};

// vote with each wallet as determined in choices.json
const vote = async(signer, wallet, voteDict) => {
  try {
    await client.vote(signer, wallet, voteDict);
    console.log(`=== SUCCESS: Voted for ${voteDict['space']} with ${wallet}` );

  } catch (error) {
      console.log(`=== FAILURE: Have not been able to vote for ${voteDict['space']}`);
      console.log('\twith', wallet);
    };
};

const choices = require(choicesPath);

for (let wallet_proposals of Object.entries(choices)) {
  let _wallet = wallet_proposals[0];
  let proposals = wallet_proposals[1];

  for (let prop of Object.values(proposals)) {
    let voteDict = getVoteDict(prop);
    let delay = Math.floor(Math.random() * 3500) + 500
    setTimeout(function(){
        vote(signer, _wallet, voteDict);
    }, delay);
  };
};
