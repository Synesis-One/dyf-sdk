import { Connection, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
import { SubmitOntologyArgs, PUtterance } from '../typings';
export declare const getUtterancesAndHistoriesForBuilder: (publicKey: PublicKey, connection: Connection, campaignAccountPubkey: string, latestSubmittedUuids: string[], args: {
    apiHost: string;
    apiAuth: string;
    rpcHost: string;
    programId: PublicKey;
}) => Promise<PUtterance[]>;
export declare const createUtteranceByOntology: (publicKey: PublicKey, ontology: SubmitOntologyArgs, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<PUtterance>;
export declare const deleteOntologyByCanonical: (canonical: string, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<true>;
export declare const createBuilderSubmitUtterancesInstructions: (publicKey: PublicKey, connection: Connection, campaignTitle: string, utterances: PUtterance[], args: {
    programId: PublicKey;
}) => {
    instructions: TransactionInstruction[];
    signers: Signer[];
};
export declare const createRpcSubmitUtterancesPromises: (publicKey: PublicKey, connection: Connection, rpcAuthToken: string, campaignTitle: string, batchUtterances: PUtterance[][], args: {
    programId: PublicKey;
    rpcHost: string;
}) => {
    promise: (token: string, dyfarmContract: string, campaignTitle: string, wallet: string, offchainReferences: string[], offchainTypes: number[], kinds: number[], args: {
        rpcHost: string;
    }) => Promise<import("../typings").RpcBatchSubmissionResponse[]>;
    args: (string | any[] | {
        rpcHost: string;
    })[][];
};
export declare const createRpcSubmitVerifiableUtterancesPromise: (publicKey: PublicKey, signMessage: (message: Uint8Array) => Promise<Uint8Array>, rpcAuthToken: string, campaignTitle: string, utterances: PUtterance[], args: {
    programId: PublicKey;
}) => Promise<(string | number)[][]>;
