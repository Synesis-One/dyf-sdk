import { Connection, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
import { Guild, Role } from '../dyfarm';
export declare const createCreateGuildInstructions: (admin: PublicKey, connection: Connection, guildTitle: string, ownerRate: number, masterRate: number, args: {
    programId: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const createGuildStakeNftInstructions: (admin: PublicKey, user: PublicKey, connection: Connection, guildTitle: string, nftMint: PublicKey, role: Role, args: {
    programId: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const createScholarSignInstructions: (admin: PublicKey, user: PublicKey, connection: Connection, guildTitle: string, args: {
    programId: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const getGuild: (admin: PublicKey, connection: Connection, guildTitle: string, args: {
    programId: PublicKey;
}) => Promise<Guild>;
