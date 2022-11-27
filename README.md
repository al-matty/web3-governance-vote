# snapshot-vote
Script to do some automated voting strategies on snapshot.page. Voting recipes can be defined in 'choices.json'. See [snapshot-query](https://github.com/al-matty/snapshot-query) to query for active proposals and generate 'choices.json' programatically, or alternatively write your own 'choices.json' file for use as voting instructions for the script.

### Usage

Store your Ethereum addresses in a text file, one address per line. Specify the path to it in the wallets variable in [snapshotVote.js](https://github.com/al-matty/snapshot-vote/blob/main/scripts/snapshotVote.js). Run the script.

```
node snapshotVote.js
```

### License
MIT-licensed
