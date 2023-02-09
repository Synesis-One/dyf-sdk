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
 * Arguments used to create {@link Validate}
 * @category Accounts
 * @category generated
 */
export declare type ValidateArgs = {
    phrase: web3.PublicKey;
    address: web3.PublicKey;
    rentOwner: web3.PublicKey;
    index: number;
    time: beet.bignum;
    vote: boolean;
    confident: number;
    bump: number;
};
export declare const validateDiscriminator: number[];
/**
 * Holds the data for the {@link Validate} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export declare class Validate implements ValidateArgs {
    readonly phrase: web3.PublicKey;
    readonly address: web3.PublicKey;
    readonly rentOwner: web3.PublicKey;
    readonly index: number;
    readonly time: beet.bignum;
    readonly vote: boolean;
    readonly confident: number;
    readonly bump: number;
    private constructor();
    /**
     * Creates a {@link Validate} instance from the provided args.
     */
    static fromArgs(args: ValidateArgs): Validate;
    /**
     * Deserializes the {@link Validate} from the data of the provided {@link web3.AccountInfo}.
     * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
     */
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Validate, number];
    /**
     * Retrieves the account info from the provided address and deserializes
     * the {@link Validate} from its data.
     *
     * @throws Error if no account info is found at the address or if deserialization fails
     */
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<Validate>;
    /**
     * Provides a {@link web3.Connection.getProgramAccounts} config builder,
     * to fetch accounts matching filters that can be specified via that builder.
     *
     * @param programId - the program that owns the accounts we are filtering
     */
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<{
        phrase: any;
        address: any;
        rentOwner: any;
        index: any;
        time: any;
        vote: any;
        confident: any;
        bump: any;
        accountDiscriminator: any;
    }>;
    /**
     * Deserializes the {@link Validate} from the provided data Buffer.
     * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
     */
    static deserialize(buf: Buffer, offset?: number): [Validate, number];
    /**
     * Serializes the {@link Validate} into a Buffer.
     * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
     */
    serialize(): [Buffer, number];
    /**
     * Returns the byteSize of a {@link Buffer} holding the serialized data of
     * {@link Validate}
     */
    static get byteSize(): number;
    /**
     * Fetches the minimum balance needed to exempt an account holding
     * {@link Validate} data from rent
     *
     * @param connection used to retrieve the rent exemption information
     */
    static getMinimumBalanceForRentExemption(connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    /**
     * Determines if the provided {@link Buffer} has the correct byte size to
     * hold {@link Validate} data.
     */
    static hasCorrectByteSize(buf: Buffer, offset?: number): boolean;
    /**
     * Returns a readable version of {@link Validate} properties
     * and can be used to convert to JSON and/or logging
     */
    pretty(): {
        phrase: string;
        address: string;
        rentOwner: string;
        index: number;
        time: number | {
            toNumber: () => number;
        };
        vote: boolean;
        confident: number;
        bump: number;
    };
}
/**
 * @category Accounts
 * @category generated
 */
export declare const validateBeet: beet.BeetStruct<Validate, ValidateArgs & {
    accountDiscriminator: number[];
}>;
