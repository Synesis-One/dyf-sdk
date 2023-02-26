import { ApiCampaignInfo, ApiCampaignMeta, SubmitOntologyArgs, BuilderActivityInfo, ValidatorActivityInfo, ApiSubmissionInfo, ApiValidationsInfo } from '../typings';
export declare const submitOntology: (ontology: SubmitOntologyArgs, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<{
    isSuccess: boolean;
    data: string;
    submissionCount: number;
}>;
export declare const deleteOntology: (canonical: string, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<boolean>;
export declare const checkWhitelist: (wallet: string, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<string | null>;
export declare const addCampaignMeta: (data: ApiCampaignMeta, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<boolean>;
export declare const delCampaignMeta: (data: ApiCampaignMeta, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<boolean>;
export declare const getAllCampaignsInfo: (args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<ApiCampaignInfo[]>;
export declare const getCampaginMeta: (dapp_title: string, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<ApiCampaignMeta | null>;
export declare const getCampaignInfo: (dapp_title: string, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<ApiCampaignInfo | null>;
export declare const getSubmissionsValidationsInfo: (campaign: string, wallet: string, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<{
    submissions: ApiSubmissionInfo[];
    validations: ApiValidationsInfo[];
}>;
export declare const getAllCampaignTitles: (args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<string[]>;
export declare const getBuilderActivityInfo: (wallet: string, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<BuilderActivityInfo | null>;
export declare const getValidatorActivityInfo: (wallet: string, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<ValidatorActivityInfo | null>;
export declare const getBuilderRecentSubmissions: (pubkey: string, utc_offset: number, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<number>;
export declare const getValidatorRecentValidations: (pubkey: string, utc_offset: number, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<number>;
