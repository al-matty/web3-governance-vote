# snapshot-vote

Script to automate or aggregate voting on proposals on the web3 governance platform [snapshot.org](https://snapshot.org/#/), i.e. to vote with all your Ethereum addresses simultaneously. Alternatively, automated voting recipes can be created based on data obtained from previously cast votes. See [snapshot-query](https://github.com/al-matty/snapshot-query) to query for active proposals and generate 'choices.json' programmatically, or alternatively write your own 'choices.json' file for use as voting instructions for the script.

### Usage

* Store your Ethereum addresses in a text file, one address per line.
* Create a file 'choices.json' manually or run [snapshot-query](https://github.com/al-matty/snapshot-query) to get a file for all specified wallets and all currently active proposals of all snapshot spaces for which these wallets are currently registered as joined.
* Specify the paths to these files in the wallets and choicesPath variables in [snapshotVote.js](https://github.com/al-matty/snapshot-vote/blob/main/scripts/snapshotVote.js).
* Run the script, i.e. using node.js:
```
node snapshotVote.js
```

### License
MIT-licensed
