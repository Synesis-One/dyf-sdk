import { Connection, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
import { PCampaign, PUtterance, CreateCampaignArgs, UpdateCampaignArgs } from '../typings';
export declare const getUtterancesAndHistoriesForArchitect: (publicKey: PublicKey, connection: Connection, campaign: PCampaign, args: {
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
export declare const getUnusedCampaignTitle: (publicKey: PublicKey, connection: Connection, args: {
    apiHost: string;
    apiAuth: string;
    programId: PublicKey;
}) => Promise<string>;
