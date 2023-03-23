/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */
/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
/**
 * Arguments used to create {@link FarmConfig}
 * @category Accounts
 * @category generated
 */
export declare type FarmConfigArgs = {
    mint: web3.PublicKey;
    nftCreator: web3.PublicKey;
    stakingContract: web3.PublicKey;
    nftTvl: beet.bignum;
    snsTvl: beet.bignum;
    claimPeriod: beet.bignum;
    rpcClosePeriod: beet.bignum;
    fundClaimPeriod: beet.bignum;
    platformFee: number;
    platformOverrunBuffer: number;
    platformVault: web3.PublicKey;
    burnWallet: web3.PublicKey;
    platformRewardTires: number[];
    authority: web3.PublicKey;
    oracle: web3.PublicKey;
    snsFeed: web3.PublicKey;
    admin: web3.PublicKey;
    rpc: web3.PublicKey;
    campaigns: beet.bignum;
    campaignsTables: web3.PublicKey;
    penalty: beet.bignum;
    promo: number;
    system: number;
    padding: number[];
    bump: number;
};
export declare const farmConfigDiscriminator: number[];
/**
 * Holds the data for the {@link FarmConfig} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export declare class FarmConfig implements FarmConfigArgs {
    readonly mint: web3.PublicKey;
    readonly nftCreator: web3.PublicKey;
    readonly stakingContract: web3.PublicKey;
    readonly nftTvl: beet.bignum;
    readonly snsTvl: beet.bignum;
    readonly claimPeriod: beet.bignum;
    readonly rpcClosePeriod: beet.bignum;
    readonly fundClaimPeriod: beet.bignum;
    readonly platformFee: number;
    readonly platformOverrunBuffer: number;
    readonly platformVault: web3.PublicKey;
    readonly burnWallet: web3.PublicKey;
    readonly platformRewardTires: number[];
    readonly authority: web3.PublicKey;
    readonly oracle: web3.PublicKey;
    readonly snsFeed: web3.PublicKey;
    readonly admin: web3.PublicKey;
    readonly rpc: web3.PublicKey;
    readonly campaigns: beet.bignum;
    readonly campaignsTables: web3.PublicKey;
    readonly penalty: beet.bignum;
    readonly promo: number;
    readonly system: number;
    readonly padding: number[];
    readonly bump: number;
    private constructor();
    /**
     * Creates a {@link FarmConfig} instance from the provided args.
     */
    static fromArgs(args: FarmConfigArgs): FarmConfig;
    /**
     * Deserializes the {@link FarmConfig} from the data of the provided {@link web3.AccountInfo}.
     * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
     */
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [FarmConfig, number];
    /**
     * Retrieves the account info from the provided address and deserializes
     * the {@link FarmConfig} from its data.
     *
     * @throws Error if no account info is found at the address or if deserialization fails
     */
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<FarmConfig>;
    /**
     * Provides a {@link web3.Connection.getProgramAccounts} config builder,
     * to fetch accounts matching filters that can be specified via that builder.
     *
     * @param programId - the program that owns the accounts we are filtering
     */
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<{
        mint: any;
        nftCreator: any;
        stakingContract: any;
        nftTvl: any;
        snsTvl: any;
        claimPeriod: any;
        rpcClosePeriod: any;
        fundClaimPeriod: any;
        platformFee: any;
        platformOverrunBuffer: any;
        platformVault: any;
        burnWallet: any;
        platformRewardTires: any;
        authority: any;
        oracle: any;
        snsFeed: any;
        admin: any;
        rpc: any;
        campaigns: any;
        campaignsTables: any;
        penalty: any;
        promo: any;
        system: any;
        padding: any;
        bump: any;
        accountDiscriminator: any;
    }>;
    /**
     * Deserializes the {@link FarmConfig} from the provided data Buffer.
     * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
     */
    static deserialize(buf: Buffer, offset?: number): [FarmConfig, number];
    /**
     * Serializes the {@link FarmConfig} into a Buffer.
     * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
     */
    serialize(): [Buffer, number];
    /**
     * Returns the byteSize of a {@link Buffer} holding the serialized data of
     * {@link FarmConfig}
     */
    static get byteSize(): number;
    /**
     * Fetches the minimum balance needed to exempt an account holding
     * {@link FarmConfig} data from rent
     *
     * @param connection used to retrieve the rent exemption information
     */
    static getMinimumBalanceForRentExemption(connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    /**
     * Determines if the provided {@link Buffer} has the correct byte size to
     * hold {@link FarmConfig} data.
     */
    static hasCorrectByteSize(buf: Buffer, offset?: number): boolean;
    /**
     * Returns a readable version of {@link FarmConfig} properties
     * and can be used to convert to JSON and/or logging
     */
    pretty(): {
        mint: string;
        nftCreator: string;
        stakingContract: string;
        nftTvl: number | {
            toNumber: () => number;
        };
        snsTvl: number | {
            toNumber: () => number;
        };
        claimPeriod: number | {
            toNumber: () => number;
        };
        rpcClosePeriod: number | {
            toNumber: () => number;
        };
        fundClaimPeriod: number | {
            toNumber: () => number;
        };
        platformFee: number;
        platformOverrunBuffer: number;
        platformVault: string;
        burnWallet: string;
        platformRewardTires: number[];
        authority: string;
        oracle: string;
        snsFeed: string;
        admin: string;
        rpc: string;
        campaigns: number | {
            toNumber: () => number;
        };
        campaignsTables: string;
        penalty: number | {
            toNumber: () => number;
        };
        promo: number;
        system: number;
        padding: number[];
        bump: number;
    };
}
/**
 * @category Accounts
 * @category generated
 */
export declare const farmConfigBeet: beet.BeetStruct<FarmConfig, FarmConfigArgs & {
    accountDiscriminator: number[];
}>;
