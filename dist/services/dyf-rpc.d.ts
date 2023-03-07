import { RpcBatchSubmissionResponse, RpcSubmissionsInfo, RpcValidationsInfo } from '../typings';
export declare const rpcRequestAuth: (wallet: string, args: {
    rpcHost: string;
}) => Promise<string | null>;
export declare const rpcVerifyAuth: (wallet: string, signature: string, args: {
    rpcHost: string;
}) => Promise<string | null>;
export declare const rpcSubmitPhrase: (token: string, dyfarmContract: string, campaignTitle: string, wallet: string, offchainReference: string, offchainType: number, kind: number, id: number, args: {
    rpcHost: string;
}) => Promise<string | null>;
export declare const rpcBatchSubmitPhrases: (token: string, dyfarmContract: string, campaignTitle: string, wallet: string, offchainReferences: string[], offchainTypes: number[], kinds: number[], args: {
    rpcHost: string;
}) => Promise<RpcBatchSubmissionResponse[]>;
export declare const rpcBatchSubmitVerifiablePhrases: (params: (number | string)[], args: {
    rpcHost: string;
}) => Promise<RpcBatchSubmissionResponse[]>;
export declare const rpcValidatePhrase: (token: string, dyfarmContract: string, campaignTitle: string, wallet: string, builder: string, phraseAccount: string, canonical: string, value: boolean, confidence: number, id: number, args: {
    rpcHost: string;
}) => Promise<string | null>;
export declare const rpcBatchValidatePhrase: (token: string, dyfarmContract: string, campaignTitle: string, wallet: string, builders: string[], phraseAccounts: string[], canonicals: string[], values: boolean[], confidences: number[], args: {
    rpcHost: string;
}) => Promise<RpcBatchSubmissionResponse[]>;
export declare const getRpcSubmissionStatus: (wallet: string, campaign: string, args: {
    rpcHost: string;
}) => Promise<RpcSubmissionsInfo[]>;
export declare const getRpcValidationStatus: (wallet: string, campaign: string, args: {
    rpcHost: string;
}) => Promise<RpcValidationsInfo[]>;
export declare const getRpcListActivity: (dyfarmContract: string, wallet: string, args: {
    rpcHost: string;
}) => Promise<string[]>;
