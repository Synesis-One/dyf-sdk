import { Connection, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
import { PCampaign, SubmitOntologyArgs, PUtterance } from '../typings';
export declare const getUtterancesAndHistoriesForBuilder: (publicKey: PublicKey, connection: Connection, campaign: PCampaign, latestSubmittedUuids: string[]) => Promise<PUtterance[]>;
export declare const createUtteranceByOntology: (publicKey: PublicKey, ontology: SubmitOntologyArgs) => Promise<PUtterance>;
export declare const deleteOntologyByCanonical: (canonical: string) => Promise<true>;
export declare const createBuilderSubmitUtterancesInstructions: (publicKey: PublicKey, connection: Connection, campaignTitle: string, utterances: PUtterance[]) => {
    instructions: TransactionInstruction[];
    signers: Signer[];
};
export declare const createRpcSubmitUtterancesPromises: (publicKey: PublicKey, connection: Connection, rpcAuthToken: string, campaignTitle: string, batchUtterances: PUtterance[][]) => {
    promises: Promise<import("../typings").RpcBatchSubmissionResponse[]>[];
};
