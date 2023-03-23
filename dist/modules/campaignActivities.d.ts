import { Connection, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
import { AccessMethod, Role } from '../dyfarm';
export declare const createStakeCampaignInstructions: (publicKey: PublicKey, connection: Connection, amount: number, campaignTitle: string, args: {
    programId: PublicKey;
    snsMint: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const createUnstakeCampaignInstructions: (publicKey: PublicKey, connection: Connection, campaignTitle: string, args: {
    programId: PublicKey;
    snsMint: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const createClaimRewardInstructions: (publicKey: PublicKey, connection: Connection, campaignTitle: string, args: {
    programId: PublicKey;
    snsMint: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const createBatchClaimRewardInstructions: (publicKey: PublicKey, connection: Connection, campaignTitles: string[], args: {
    programId: PublicKey;
    snsMint: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const createStakeCampaignWithNFTInstructions: (publicKey: PublicKey, connection: Connection, role: Role, access: AccessMethod, mint: string, args: {
    programId: PublicKey;
    snsMint: PublicKey;
}) => Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
}>;
export declare const getTotalAvailableRewards: (publicKey: PublicKey, connection: Connection, args: {
    programId: PublicKey;
    stopOffset: number;
}) => Promise<{
    rewards: number;
    claimed: number;
    campaignTitles: string[];
}>;
export declare const getBuilderActivity: (publicKey: PublicKey, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<import("..").BuilderActivityInfo>;
export declare const getValidatorActivity: (publicKey: PublicKey, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<import("..").ValidatorActivityInfo>;
export declare const getBuilderSubmissionsToday: (publicKey: PublicKey, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<number>;
export declare const getValidatorValidationsToday: (publicKey: PublicKey, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<number>;
