import { Connection, PublicKey } from '@solana/web3.js';
import { Campaign, FarmConfig, Role } from '../dyfarm';
import { PCampaign } from '../typings';
import { CampaignStatus } from '../utils';
export declare const getCampaignFromCampaignAccount: (publicKey: PublicKey, connection: Connection, campaignTitle: string, args: {
    apiHost: string;
    apiAuth: string;
    programId: PublicKey;
    stopOffset: number;
    deployment: string;
}) => Promise<PCampaign>;
export declare const getCampaignFromCampaignInfo: (publicKey: PublicKey, connection: Connection, campaignTitle: string, role: Role, args: {
    apiHost: string;
    apiAuth: string;
    programId: PublicKey;
    stopOffset: number;
}) => Promise<PCampaign>;
export declare const getAllCampaigns: (publicKey: PublicKey, connection: Connection, args: {
    apiHost: string;
    apiAuth: string;
    programId: PublicKey;
    rpcHost: string;
    stopOffset: number;
}) => Promise<PCampaign[]>;
export declare const getAppRole: (publicKey: PublicKey, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<Role>;
export declare const getCampaignStatusFromCampaignTitle: (publicKey: PublicKey, connection: Connection, role: Role, campaignTitle: string, args: {
    programId: PublicKey;
    stopOffset: number;
}) => Promise<CampaignStatus>;
export declare const getCampaignStatusFromCampaignTitles: (publicKey: PublicKey, connection: Connection, role: Role, campaignTitles: string[], args: {
    programId: PublicKey;
    stopOffset: number;
}) => Promise<{
    campaignTitle: string;
    status: CampaignStatus;
}[]>;
export declare const getCampaignStatusFromCampaignAccount: (campaign: Campaign, farmConfig: FarmConfig, role: Role, args: {
    stopOffset: number;
}) => CampaignStatus;
