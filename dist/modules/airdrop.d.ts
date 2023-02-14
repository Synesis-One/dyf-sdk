import { Connection, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
export declare const createAirdropSNSInstructions: (publicKey: PublicKey, connection: Connection, args: {
    programId: PublicKey;
    snsMint: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
