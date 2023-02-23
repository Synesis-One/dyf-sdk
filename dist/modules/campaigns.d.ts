import { Connection, PublicKey } from '@solana/web3.js';
import { PCampaign } from '../typings';
export declare const getCampaignFromCampaignAccount: (publicKey: PublicKey, connection: Connection, campaignTitle: string, args: {
    apiHost: string;
    apiAuth: string;
    programId: PublicKey;
    stopOffset: number;
}) => Promise<PCampaign>;
export declare const getCampaignFromCampaignInfo: (publicKey: PublicKey, connection: Connection, campaignTitle: string, role: number, args: {
    apiHost: string;
    apiAuth: string;
    programId: PublicKey;
    stopOffset: number;
}) => Promise<PCampaign>;
export declare const getAllCampaigns: (publicKey: PublicKey, connection: Connection, isFetchingStakedInfoOnchain: boolean, args: {
    apiHost: string;
    apiAuth: string;
    programId: PublicKey;
    rpcHost: string;
    stopOffset: number;
}) => Promise<PCampaign[]>;
export declare const getAppRole: (publicKey: PublicKey, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<number>;
