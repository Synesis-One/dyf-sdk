import { Connection, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
import { AccessMethod, Role } from '../dyfarm';
import { ProfileStatus } from '../typings';
export declare const createGlobalProfileInstructions: (publicKey: PublicKey, connection: Connection, role: Role, access: AccessMethod, args: {
    programId: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const getProfileStatus: (publicKey: PublicKey, connection: Connection, args: {
    programId: PublicKey;
}) => Promise<ProfileStatus>;
export declare const createRpcPermitInstructions: (publicKey: PublicKey, connection: Connection, role: Role, args: {
    programId: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const getRpcAuthToken: (publicKey: PublicKey, signMessage: (message: Uint8Array) => Promise<Uint8Array>, args: {
    rpcHost: string;
}) => Promise<string>;
