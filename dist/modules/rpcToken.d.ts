import { Connection, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
export declare const getIsRpcPermitted: (publicKey: PublicKey, connection: Connection, role: string, args: {
    programId: PublicKey;
}) => Promise<boolean>;
export declare const getIsProfileCreated: (publicKey: PublicKey, connection: Connection, args: {
    programId: PublicKey;
}) => Promise<boolean>;
export declare const createRpcPermitInstructions: (publicKey: PublicKey, connection: Connection, role: string, args: {
    programId: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const getRpcAuthToken: (publicKey: PublicKey, signMessage: (message: Uint8Array) => Promise<Uint8Array>, args: {
    rpcHost: string;
}) => Promise<string>;
