# Web3 Governance Vote

![GitHub](https://img.shields.io/github/license/al-matty/snapshot-vote)
![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/al-matty/snapshot-vote)

Script to automate or aggregate voting on proposals on the web3 governance platform [snapshot.org](https://snapshot.org/#/), e.g. to vote with all your Ethereum addresses simultaneously. Alternatively, automated voting recipes can be created based on data obtained from previously cast votes. See [snapshot-query](https://github.com/al-matty/snapshot-query) to query for active proposals and generate `choices.json` programmatically, or alternatively write your own `choices.json` file for use as voting instructions for the script.

### Usage

* Create an encrypted keyfile for each of your wallets using [eth-keyfile](https://github.com/ethereum/eth-keyfile). Pick a strong password.
* Create an account at [infura.io](http://infura.io/).
* Rename `sample.env` to `.env` and enter these details next to their respective keys:

  ```
  WEB3_INFURA_PROJECT_ID=<your infura project id>
  WEB3_INFURA_PROJECT_SECRET=<your infura project secret>
  ENCR_PW=<the password you chose when generating your encrypted keyfiles>
  ```
* Open `wllts.json` and enter each wallet and the path to its keyfile like this:

  ```
  {
    "<wallet_1_address_str>": "<relative_path_to_keyfile_1>",
    "<wallet_1_address_str>": "<relative_path_to_keyfile_2>",
    ...
  }
  ```

* Voting recipes: Create a file `choices.json` manually or run [snapshot-query](https://github.com/al-matty/snapshot-query) to get a file for all specified wallets and all currently active proposals of all snapshot spaces for which these wallets are currently registered as joined. Expected format of `choices.json`:

  ```
  {
    "<wallet_1_address_str>": {
      "<proposal_1_address_str>": {
        "title": "<proposal title (just for logging)>",
        "pop_choice": <choice integer>,
        "space": "<space name (just for logging)>",
        "id": "<proposal id>",
        "type": "<voting type, e.g. 'single-choice'>"
      },
      "<proposal_2_address_str>": {
        ...
      }
    },
    "<wallet_2_address_str>": {
      ...
    }
  }
  ```

* Specify the path to this file using the `choicesPath` variable in [snapshotVote.js](https://github.com/al-matty/snapshot-vote/blob/main/snapshotVote.js).
* Run the script, e.g. using node.js:

  ```
  node snapshotVote.js
  ```

### License
MIT-licensed
