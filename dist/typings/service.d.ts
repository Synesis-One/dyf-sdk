import { Tag } from '../dyfarm';
export declare type SubmitOntologyArgs = {
    timestamp: number;
    utterance: string;
    utterance_type: string;
    domain: string;
    subject: string;
    campaign: string;
    architect: string;
    builder: string;
    cap: string;
};
export declare type ApiCampaignMeta = {
    dapp_title: string;
    architect: string;
    subject: string;
    explain: string;
    phrase_specific: string;
    phrase_general: string;
    phrase_cause: string;
    phrase_effect: string;
};
export declare type BuilderActivityInfo = {
    submitted: number;
    validated: number;
    reviewing: number;
    rejected: number;
    waiting_to_start: number;
    dapps: {
        [campaignTitle: string]: {
            submissions: number;
            total_submissions: number;
            rejected: number;
            total_rejected: number;
            validated: number;
            total_validated: number;
        };
    };
};
export declare type ValidatorActivityInfo = {
    validations_submitted: number;
    validations_agreed: number;
    validations_disagreed: number;
    validations_waiting: number;
};
export declare type ApiCampaignInfo = {
    campaignTitle: string;
    tag: Tag;
    pubkey: string;
    industry: string;
    domain: string;
    subject: string;
    explain: string;
    organizer: string;
    language: string;
    specific: string;
    general: string;
    cause: string;
    effect: string;
    open: number;
    close: number;
    expire: number;
    minPhrase: number;
    minValidate: number;
    rpuSpecific: number;
    rpuGeneral: number;
    rpuCause: number;
    rpuEffect: number;
    rpuValidator: number;
    majorityQuorum: number;
    architect: string;
    finish: boolean;
    progress: number;
    submissions: number;
    rejections: number;
    timestamp: number;
};
export declare type ApiSubmissionInfo = {
    timestamp: number;
    kind: string;
    data: string;
    canonical: string;
    builder: string;
    submitted: boolean;
    pubkey?: string;
    finish: boolean;
    correct: number;
    incorrect: number;
};
export declare type ApiValidationsInfo = {
    timestamp: number;
    utterance: string;
    validator: string;
    vote: boolean;
    confidence: number;
    pubkey: string;
};
export declare type RpcSubmissionsInfo = {
    uuid: string;
    canonical: string;
    status: number;
};
export declare type RpcValidationsInfo = {
    uuid: string;
    utterance: string;
    status: number;
};
export declare type RpcBatchSubmissionResponse = {
    isFailed: boolean;
    uuid?: string;
    error?: string;
};
