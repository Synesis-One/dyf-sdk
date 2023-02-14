# DYF SDK


```
npm install @synesis-one/dyf@Synesis-One/dyf-sdk
```

```typescript

import { Dyfarm } from '_packages'

const appDyfarm = new Dyfarm({
  programId: new PublicKey('__DYF_PROGRAM_ADDRESS__'),
  snsMint: new PublicKey('__SNS_ADDRESS__'),
  nftCharity: new PublicKey('__KANON_NFT_CHARITY__'),
  apiHost: '__DYF_API_HOST__',
  apiAuth: '__DYF_API_AUTH__',
  rpcHost: '__DYF_RPC_HOST__'
})

// const campaigns = await appDyfarm.getAllCampaigns(wallet.publicKey, connection)

```