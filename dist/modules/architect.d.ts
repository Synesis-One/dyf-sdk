import { Connection, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
import { PUtterance, CreateCampaignArgs, UpdateCampaignArgs } from '../typings';
export declare const getUtterancesAndHistoriesForArchitect: (publicKey: PublicKey, connection: Connection, campaignAccountPubkey: string, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<PUtterance[]>;
export declare const createArchitectCreateCampaignInstructions: (publicKey: PublicKey, connection: Connection, data: CreateCampaignArgs, args: {
    programId: PublicKey;
    snsMint: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const createArchitectUpdateCampaignInstructions: (publicKey: PublicKey, connection: Connection, data: UpdateCampaignArgs, args: {
    programId: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const createArchitectClaimCampaignInstructions: (publicKey: PublicKey, connection: Connection, campaignTitle: string, args: {
    programId: PublicKey;
    snsMint: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const getUnusedCampaignTitle: (publicKey: PublicKey, connection: Connection, args: {
    apiHost: string;
    apiAuth: string;
    programId: PublicKey;
}) => Promise<string>;
