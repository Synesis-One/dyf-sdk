import { Connection, PublicKey } from '@solana/web3.js';
import { PCampaign } from '../typings';
export declare const getCampaignFromCampaignTitle: (publicKey: PublicKey, connection: Connection, campaignTitle: string, args: {
    apiHost: string;
    apiAuth: string;
    programId: PublicKey;
}) => Promise<PCampaign>;
export declare const getAllCampaigns: (publicKey: PublicKey, connection: Connection, args: {
    apiHost: string;
    apiAuth: string;
    programId: PublicKey;
    rpcHost: string;
}) => Promise<PCampaign[]>;
export declare const getAppRole: (publicKey: PublicKey, args: {
    apiHost: string;
    apiAuth: string;
}) => Promise<number>;
