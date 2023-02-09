import { Connection, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
export declare const createAirdropSNSInstructions: (publicKey: PublicKey, connection: Connection) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
