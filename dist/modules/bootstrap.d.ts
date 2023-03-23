import { Connection, PublicKey } from '@solana/web3.js';
export declare const bootstrapDev: (publicKey: PublicKey, connection: Connection, args: {
    apiHost: string;
    apiAuth: string;
    programId: PublicKey;
    stopOffset: number;
    deployment: string;
}) => Promise<void>;
