import { Connection, PublicKey } from '@solana/web3.js';
import { AccessMethod, Role } from './dyfarm';
import { ApiCampaignMeta, CreateCampaignArgs, PUtterance, SubmitOntologyArgs, UpdateCampaignArgs, ValidationArgs } from './typings';
export * from './modules/airdrop';
export * from './modules/architect';
export * from './modules/campaignActivities';
export * from './modules/builder';
export * from './modules/campaigns';
export * from './modules/rpcToken';
export * from './modules/validator';
export * from './modules/walletBalance';
export * from './typings';
export * from './dyfarm';
export * from './utils';
export * from './services';
export declare class Dyfarm {
    PROGRAM_ID: PublicKey;
    SNS_MINT: PublicKey;
    KANON_NFT_CHARITY: PublicKey;
    API_HOST: string;
    API_AUTH: string;
    RPC_HOST: string;
    DEPLOYMENT: string;
    STOP_OFFSET: number;
    constructor(args: {
        programId: PublicKey;
        snsMint: PublicKey;
        nftCharity: PublicKey;
        apiHost: string;
        apiAuth: string;
        rpcHost: string;
        stopOffset: number;
        deployment: string;
    });
    createAirdropSNSInstructions(publicKey: PublicKey, connection: Connection): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    }>;
    getUtterancesAndHistoriesForArchitect(publicKey: PublicKey, connection: Connection, campaignAccountPubkey: string): Promise<PUtterance[]>;
    createArchitectCreateCampaignInstructions(publicKey: PublicKey, connection: Connection, data: CreateCampaignArgs): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    }>;
    createArchitectUpdateCampaignInstructions(publicKey: PublicKey, connection: Connection, data: UpdateCampaignArgs): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    }>;
    createArchitectClaimCampaignInstructions(publicKey: PublicKey, connection: Connection, campaignTitle: string): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    }>;
    getUnusedCampaignTitle(publicKey: PublicKey, connection: Connection): Promise<string>;
    getUtterancesAndHistoriesForBuilder(publicKey: PublicKey, connection: Connection, campaignAccountPubkey: string, latestSubmittedUuids: string[]): Promise<PUtterance[]>;
    createUtteranceByOntology(publicKey: PublicKey, ontology: SubmitOntologyArgs): Promise<PUtterance>;
    deleteOntologyByCanonical(canonical: string): Promise<true>;
    createBuilderSubmitUtterancesInstructions(publicKey: PublicKey, connection: Connection, campaignTitle: string, utterances: PUtterance[]): {
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    };
    createRpcSubmitUtterancesPromises(publicKey: PublicKey, connection: Connection, rpcAuthToken: string, campaignTitle: string, batchUtterances: PUtterance[][]): {
        promise: (token: string, dyfarmContract: string, campaignTitle: string, wallet: string, offchainReferences: string[], offchainTypes: number[], kinds: number[], args: {
            rpcHost: string;
        }) => Promise<import("./typings").RpcBatchSubmissionResponse[]>;
        args: (string | any[] | {
            rpcHost: string;
        })[][];
    };
    createRpcSubmitVerifiableUtterancesPromise(publicKey: PublicKey, signMessage: (message: Uint8Array) => Promise<Uint8Array>, rpcAuthToken: string, campaignTitle: string, batchUtterances: PUtterance[]): Promise<(string | number)[][]>;
    createStakeCampaignInstructions(publicKey: PublicKey, connection: Connection, amount: number, campaignTitle: string): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    }>;
    createUnstakeCampaignInstructions(publicKey: PublicKey, connection: Connection, campaignTitle: string): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    }>;
    createClaimRewardInstructions(publicKey: PublicKey, connection: Connection, campaignTitle: string): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    }>;
    createBatchClaimRewardInstructions(publicKey: PublicKey, connection: Connection, campaignTitles: string[]): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    }>;
    createStakeCampaignWithNFTInstructions(publicKey: PublicKey, connection: Connection, role: Role, access: AccessMethod, mint: string): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    }>;
    getTotalAvailableRewards(publicKey: PublicKey, connection: Connection): Promise<{
        rewards: number;
        claimed: number;
        campaignTitles: string[];
    }>;
    getBuilderActivity(publicKey: PublicKey): Promise<import("./typings").BuilderActivityInfo>;
    getValidatorActivity(publicKey: PublicKey): Promise<import("./typings").ValidatorActivityInfo>;
    getBuilderSubmissionsToday(publicKey: PublicKey): Promise<number>;
    getValidatorValidationsToday(publicKey: PublicKey): Promise<number>;
    getCampaignFromCampaignAccount(publicKey: PublicKey, connection: Connection, campaignTitle: string): Promise<import("./typings").PCampaign>;
    getCampaignFromCampaignInfo(publicKey: PublicKey, connection: Connection, campaignTitle: string, role: Role): Promise<import("./typings").PCampaign>;
    getAllCampaigns(publicKey: PublicKey, connection: Connection): Promise<import("./typings").PCampaign[]>;
    getAppRole(publicKey: PublicKey): Promise<Role>;
    getCampaignStatusFromCampaignTitles(publicKey: PublicKey, connection: Connection, role: Role, campaignTitles: string[]): Promise<{
        campaignTitle: string;
        status: import("./utils").CampaignStatus;
    }[]>;
    bootstrapDev(publicKey: PublicKey, connection: Connection): Promise<void>;
    createGlobalProfileInstructions(publicKey: PublicKey, connection: Connection, role: Role, access: AccessMethod): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    }>;
    getProfileStatus(publicKey: PublicKey, connection: Connection): Promise<import("./typings").ProfileStatus>;
    createRpcPermitInstructions(publicKey: PublicKey, connection: Connection, role: Role): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    }>;
    getRpcAuthToken(publicKey: PublicKey, signMessage: (message: Uint8Array) => Promise<Uint8Array>): Promise<string>;
    getUtterancesAndHistoriesForValidator(publicKey: PublicKey, connection: Connection, campaignTitle: string, campaignAccountPubkey: string, latestSubmittedUuids: string[]): Promise<PUtterance[]>;
    createValidatorValidateUtterancesInstructions(publicKey: PublicKey, connection: Connection, campaignTitle: string, validations: ValidationArgs[]): {
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    };
    createRpcValidateUtterancesPromises(publicKey: PublicKey, connection: Connection, rpcAuthToken: string, campaignTitle: string, batchValidations: ValidationArgs[][]): {
        promise: (token: string, dyfarmContract: string, campaignTitle: string, wallet: string, builders: string[], phraseAccounts: string[], canonicals: string[], values: boolean[], confidences: number[], args: {
            rpcHost: string;
        }) => Promise<import("./typings").RpcBatchSubmissionResponse[]>;
        args: (string | number[] | string[] | boolean[] | {
            rpcHost: string;
        })[][];
    };
    createRpcValidateVerifiableUtterancesPromise(publicKey: PublicKey, signMessage: (message: Uint8Array) => Promise<Uint8Array>, rpcAuthToken: string, campaignTitle: string, validations: ValidationArgs[]): Promise<(string | number | boolean)[][]>;
    getSolBalance(publicKey: PublicKey, connection: Connection): Promise<number>;
    getTokenBalance(publicKey: PublicKey, connection: Connection): Promise<number>;
    getKanonNfts(publicKey: PublicKey, connection: Connection): Promise<import("./typings").KanonNft[]>;
    addCampaignMeta(data: ApiCampaignMeta): Promise<boolean>;
    delCampaignMeta(data: ApiCampaignMeta): Promise<boolean>;
    createCreateGuildInstructions(admin: PublicKey, connection: Connection, guildTitle: string, ownerRate: number, masterRate: number): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    }>;
    createGuildStakeNftInstructions(admin: PublicKey, user: PublicKey, connection: Connection, guildTitle: string, nftMint: PublicKey, role: Role): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    }>;
    createScholarSignInstructions(admin: PublicKey, user: PublicKey, connection: Connection, guildTitle: string): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        signers: import("@solana/web3.js").Signer[];
    }>;
    getGuild(admin: PublicKey, connection: Connection, guildTitle: string): Promise<import("./dyfarm").Guild>;
}
