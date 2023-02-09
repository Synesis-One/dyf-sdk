import { Connection, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
import { PCampaign } from '../typings';
export declare const createStakeCampaignInstructions: (publicKey: PublicKey, connection: Connection, role: number, amount: number, campaignTitle: string) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const createUnstakeCampaignInstructions: (publicKey: PublicKey, connection: Connection, campaignTitle: string) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const createClaimRewardInstructions: (publicKey: PublicKey, connection: Connection, campaignTitle: string) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const createBatchClaimRewardInstructions: (publicKey: PublicKey, connection: Connection, campaignTitles: string[]) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const createStakeCampaignWithNFTInstructions: (publicKey: PublicKey, connection: Connection, role: string, mint: string) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const getTotalAvailableRewards: (publicKey: PublicKey, connection: Connection, appCampaigns: PCampaign[]) => Promise<{
    rewards: number;
    claimed: number;
    campaignTitles: string[];
}>;
export declare const getBuilderActivity: (publicKey: PublicKey) => Promise<import("../typings").BuilderActivityInfo>;
export declare const getValidatorActivity: (publicKey: PublicKey) => Promise<import("../typings").ValidatorActivityInfo>;
export declare const getBuilderSubmissionsToday: (publicKey: PublicKey) => Promise<number>;
export declare const getValidatorValidationsToday: (publicKey: PublicKey) => Promise<number>;
