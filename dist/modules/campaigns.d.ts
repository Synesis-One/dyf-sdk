import { Connection, PublicKey } from '@solana/web3.js';
import { PCampaign } from '../typings';
export declare const getCampaignFromCampaignTitle: (publicKey: PublicKey, connection: Connection, campaignTitle: string) => Promise<PCampaign>;
export declare const getAllCampaigns: (publicKey: PublicKey, connection: Connection) => Promise<PCampaign[]>;
export declare const getAppRole: (publicKey: PublicKey) => Promise<number>;
