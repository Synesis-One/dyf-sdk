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
import { PhraseType } from '../types/PhraseType';
import { Offchain } from '../types/Offchain';
/**
 * Arguments used to create {@link Phrase}
 * @category Accounts
 * @category generated
 */
export declare type PhraseArgs = {
    campaign: web3.PublicKey;
    builder: web3.PublicKey;
    rentOwner: web3.PublicKey;
    kind: PhraseType;
    timestamp: beet.bignum;
    head: number;
    lastIndex: number;
    offchainUri: number[];
    offchainType: Offchain;
    correct: number;
    incorrect: number;
    isValid: boolean;
    finish: boolean;
    bump: number;
};
export declare const phraseDiscriminator: number[];
/**
 * Holds the data for the {@link Phrase} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export declare class Phrase implements PhraseArgs {
    readonly campaign: web3.PublicKey;
    readonly builder: web3.PublicKey;
    readonly rentOwner: web3.PublicKey;
    readonly kind: PhraseType;
    readonly timestamp: beet.bignum;
    readonly head: number;
    readonly lastIndex: number;
    readonly offchainUri: number[];
    readonly offchainType: Offchain;
    readonly correct: number;
    readonly incorrect: number;
    readonly isValid: boolean;
    readonly finish: boolean;
    readonly bump: number;
    private constructor();
    /**
     * Creates a {@link Phrase} instance from the provided args.
     */
    static fromArgs(args: PhraseArgs): Phrase;
    /**
     * Deserializes the {@link Phrase} from the data of the provided {@link web3.AccountInfo}.
     * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
     */
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Phrase, number];
    /**
     * Retrieves the account info from the provided address and deserializes
     * the {@link Phrase} from its data.
     *
     * @throws Error if no account info is found at the address or if deserialization fails
     */
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<Phrase>;
    /**
     * Provides a {@link web3.Connection.getProgramAccounts} config builder,
     * to fetch accounts matching filters that can be specified via that builder.
     *
     * @param programId - the program that owns the accounts we are filtering
     */
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<{
        campaign: any;
        builder: any;
        rentOwner: any;
        kind: any;
        timestamp: any;
        head: any;
        lastIndex: any;
        offchainUri: any;
        offchainType: any;
        correct: any;
        incorrect: any;
        isValid: any;
        finish: any;
        bump: any;
        accountDiscriminator: any;
    }>;
    /**
     * Deserializes the {@link Phrase} from the provided data Buffer.
     * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
     */
    static deserialize(buf: Buffer, offset?: number): [Phrase, number];
    /**
     * Serializes the {@link Phrase} into a Buffer.
     * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
     */
    serialize(): [Buffer, number];
    /**
     * Returns the byteSize of a {@link Buffer} holding the serialized data of
     * {@link Phrase}
     */
    static get byteSize(): number;
    /**
     * Fetches the minimum balance needed to exempt an account holding
     * {@link Phrase} data from rent
     *
     * @param connection used to retrieve the rent exemption information
     */
    static getMinimumBalanceForRentExemption(connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    /**
     * Determines if the provided {@link Buffer} has the correct byte size to
     * hold {@link Phrase} data.
     */
    static hasCorrectByteSize(buf: Buffer, offset?: number): boolean;
    /**
     * Returns a readable version of {@link Phrase} properties
     * and can be used to convert to JSON and/or logging
     */
    pretty(): {
        campaign: string;
        builder: string;
        rentOwner: string;
        kind: string;
        timestamp: number | {
            toNumber: () => number;
        };
        head: number;
        lastIndex: number;
        offchainUri: number[];
        offchainType: string;
        correct: number;
        incorrect: number;
        isValid: boolean;
        finish: boolean;
        bump: number;
    };
}
/**
 * @category Accounts
 * @category generated
 */
export declare const phraseBeet: beet.BeetStruct<Phrase, PhraseArgs & {
    accountDiscriminator: number[];
}>;
