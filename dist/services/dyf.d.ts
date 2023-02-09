import { ApiCampaignInfo, ApiCampaignMeta, SubmitOntologyArgs, BuilderActivityInfo, ValidatorActivityInfo, ApiSubmissionInfo, ApiValidationsInfo } from '../typings';
export declare const submitOntology: (ontology: SubmitOntologyArgs) => Promise<{
    isSuccess: boolean;
    data: string;
    submissionCount: number;
}>;
export declare const deleteOntology: (canonical: string) => Promise<boolean>;
export declare const checkWhitelist: (wallet: string) => Promise<string | null>;
export declare const addCampaignMeta: (data: ApiCampaignMeta) => Promise<boolean>;
export declare const delCampaignMeta: (data: ApiCampaignMeta) => Promise<boolean>;
export declare const getAllCampaignsInfo: () => Promise<ApiCampaignInfo[]>;
export declare const getCampaginMeta: (dapp_title: string) => Promise<ApiCampaignMeta | null>;
export declare const getSubmissionsInfo: (campaign: string) => Promise<ApiSubmissionInfo[]>;
export declare const getValidationsInfo: (campaign: string) => Promise<ApiValidationsInfo[]>;
export declare const getSubmissionsValidationsInfo: (campaign: string) => Promise<{
    submissions: ApiSubmissionInfo[];
    validations: ApiValidationsInfo[];
}>;
export declare const getAllCampaignTitles: () => Promise<string[]>;
export declare const getBuilderActivityInfo: (wallet: string) => Promise<BuilderActivityInfo | null>;
export declare const getValidatorActivityInfo: (wallet: string) => Promise<ValidatorActivityInfo | null>;
export declare const getBuilderRecentSubmissions: (pubkey: string, utc_offset: number) => Promise<number>;
export declare const getValidatorRecentValidations: (pubkey: string, utc_offset: number) => Promise<number>;
