import { Connection, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
import { PCampaign, PUtterance, ValidationArgs } from '../typings';
export declare const fetchUtterancesAndHistoriesForValidator: (publicKey: PublicKey, connection: Connection, campaign: PCampaign, latestSubmittedUuids: string[]) => Promise<PUtterance[]>;
export declare const createValidatorValidateUtterancesInstructions: (publicKey: PublicKey, connection: Connection, campaignTitle: string, validations: ValidationArgs[]) => {
    instructions: TransactionInstruction[];
    signers: Signer[];
};
export declare const createRpcValidateUtterancesPromises: (publicKey: PublicKey, connection: Connection, rpcAuthToken: string, campaignTitle: string, batchValidations: ValidationArgs[][]) => {
    promises: Promise<import("../typings").RpcBatchSubmissionResponse[]>[];
};
