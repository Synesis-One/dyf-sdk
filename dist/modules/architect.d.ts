import { Connection, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
import { PCampaign, PUtterance, CreateCampaignArgs, UpdateCampaignArgs } from '../typings';
export declare const getUtterancesAndHistoriesForArchitect: (publicKey: PublicKey, connection: Connection, campaign: PCampaign) => Promise<PUtterance[]>;
export declare const createArchitectCreateCampaignInstructions: (publicKey: PublicKey, connection: Connection, data: CreateCampaignArgs) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const createArchitectUpdateCampaignInstructions: (publicKey: PublicKey, connection: Connection, data: UpdateCampaignArgs) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const getUnusedCampaignTitle: (publicKey: PublicKey, connection: Connection) => Promise<string>;
