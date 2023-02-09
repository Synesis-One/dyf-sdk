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
 * Arguments used to create {@link Guild}
 * @category Accounts
 * @category generated
 */
export declare type GuildArgs = {
    title: number[];
    nftTable: web3.PublicKey;
    scholarTable: web3.PublicKey;
    owner: web3.PublicKey;
    ownerShare: number;
    master: beet.COption<web3.PublicKey>;
    masterShare: beet.COption<number>;
    scholarSlot: beet.bignum;
    nftSlot: beet.bignum;
    status: boolean;
};
export declare const guildDiscriminator: number[];
/**
 * Holds the data for the {@link Guild} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export declare class Guild implements GuildArgs {
    readonly title: number[];
    readonly nftTable: web3.PublicKey;
    readonly scholarTable: web3.PublicKey;
    readonly owner: web3.PublicKey;
    readonly ownerShare: number;
    readonly master: beet.COption<web3.PublicKey>;
    readonly masterShare: beet.COption<number>;
    readonly scholarSlot: beet.bignum;
    readonly nftSlot: beet.bignum;
    readonly status: boolean;
    private constructor();
    /**
     * Creates a {@link Guild} instance from the provided args.
     */
    static fromArgs(args: GuildArgs): Guild;
    /**
     * Deserializes the {@link Guild} from the data of the provided {@link web3.AccountInfo}.
     * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
     */
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Guild, number];
    /**
     * Retrieves the account info from the provided address and deserializes
     * the {@link Guild} from its data.
     *
     * @throws Error if no account info is found at the address or if deserialization fails
     */
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<Guild>;
    /**
     * Provides a {@link web3.Connection.getProgramAccounts} config builder,
     * to fetch accounts matching filters that can be specified via that builder.
     *
     * @param programId - the program that owns the accounts we are filtering
     */
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<GuildArgs & {
        accountDiscriminator: number[];
    }>;
    /**
     * Deserializes the {@link Guild} from the provided data Buffer.
     * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
     */
    static deserialize(buf: Buffer, offset?: number): [Guild, number];
    /**
     * Serializes the {@link Guild} into a Buffer.
     * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
     */
    serialize(): [Buffer, number];
    /**
     * Returns the byteSize of a {@link Buffer} holding the serialized data of
     * {@link Guild} for the provided args.
     *
     * @param args need to be provided since the byte size for this account
     * depends on them
     */
    static byteSize(args: GuildArgs): number;
    /**
     * Fetches the minimum balance needed to exempt an account holding
     * {@link Guild} data from rent
     *
     * @param args need to be provided since the byte size for this account
     * depends on them
     * @param connection used to retrieve the rent exemption information
     */
    static getMinimumBalanceForRentExemption(args: GuildArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    /**
     * Returns a readable version of {@link Guild} properties
     * and can be used to convert to JSON and/or logging
     */
    pretty(): {
        title: number[];
        nftTable: string;
        scholarTable: string;
        owner: string;
        ownerShare: number;
        master: web3.PublicKey;
        masterShare: number;
        scholarSlot: number | {
            toNumber: () => number;
        };
        nftSlot: number | {
            toNumber: () => number;
        };
        status: boolean;
    };
}
/**
 * @category Accounts
 * @category generated
 */
export declare const guildBeet: beet.FixableBeetStruct<Guild, GuildArgs & {
    accountDiscriminator: number[];
}>;
