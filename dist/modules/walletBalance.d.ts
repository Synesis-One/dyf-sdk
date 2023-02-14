import { Connection, PublicKey } from '@solana/web3.js';
import { KanonNft } from '../typings';
export declare const getSolBalance: (publicKey: PublicKey, connection: Connection) => Promise<number>;
export declare const getTokenBalance: (publicKey: PublicKey, connection: Connection, args: {
    snsMint: PublicKey;
}) => Promise<number>;
export declare const getKanonNfts: (publicKey: PublicKey, connection: Connection, args: {
    kanonNftCharity: PublicKey;
}) => Promise<KanonNft[]>;
