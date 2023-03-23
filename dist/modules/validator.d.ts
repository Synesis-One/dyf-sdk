import { Connection, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
import { PUtterance, ValidationArgs } from '../typings';
export declare const getUtterancesAndHistoriesForValidator: (publicKey: PublicKey, connection: Connection, campaignTitle: string, campaignAccountPubkey: string, latestSubmittedUuids: string[], args: {
    apiHost: string;
    apiAuth: string;
    rpcHost: string;
    programId: PublicKey;
}) => Promise<PUtterance[]>;
export declare const createValidatorValidateUtterancesInstructions: (publicKey: PublicKey, connection: Connection, campaignTitle: string, validations: ValidationArgs[], args: {
    programId: PublicKey;
}) => {
    instructions: TransactionInstruction[];
    signers: Signer[];
};
export declare const createRpcValidateUtterancesPromises: (publicKey: PublicKey, connection: Connection, rpcAuthToken: string, campaignTitle: string, batchValidations: ValidationArgs[][], args: {
    programId: PublicKey;
    rpcHost: string;
}) => {
    promise: (token: string, dyfarmContract: string, campaignTitle: string, wallet: string, builders: string[], phraseAccounts: string[], canonicals: string[], values: boolean[], confidences: number[], args: {
        rpcHost: string;
    }) => Promise<import("../typings").RpcBatchSubmissionResponse[]>;
    args: (string | string[] | number[] | boolean[] | {
        rpcHost: string;
    })[][];
};
export declare const createRpcValidateVerifiableUtterancesPromise: (publicKey: PublicKey, signMessage: (message: Uint8Array) => Promise<Uint8Array>, rpcAuthToken: string, campaignTitle: string, validations: ValidationArgs[], args: {
    programId: PublicKey;
}) => Promise<(string | number | boolean)[][]>;
