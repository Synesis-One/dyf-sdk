/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */
import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
/**
 * @category Instructions
 * @category GuildUnstakeNft
 * @category generated
 */
export declare type GuildUnstakeNftInstructionArgs = {
    guildTitle: string;
    newScholarSlot: beet.bignum;
};
/**
 * @category Instructions
 * @category GuildUnstakeNft
 * @category generated
 */
export declare const guildUnstakeNftStruct: beet.FixableBeetArgsStruct<GuildUnstakeNftInstructionArgs & {
    instructionDiscriminator: number[];
}>;
/**
 * Accounts required by the _guildUnstakeNft_ instruction
 *
 * @property [_writable_, **signer**] master
 * @property [_writable_] guildAccount
 * @property [] user
 * @property [_writable_] userProfile
 * @property [_writable_] masterNft
 * @property [_writable_] nftVault
 * @property [_writable_] farmConfig
 * @property [_writable_] pdaAccount
 * @property [_writable_] nftMint
 * @property [_writable_] oldScholarTable
 * @property [_writable_] newScholarTable
 * @property [] lookupProgram
 * @property [] clock
 * @category Instructions
 * @category GuildUnstakeNft
 * @category generated
 */
export declare type GuildUnstakeNftInstructionAccounts = {
    master: web3.PublicKey;
    guildAccount: web3.PublicKey;
    user: web3.PublicKey;
    userProfile: web3.PublicKey;
    masterNft: web3.PublicKey;
    nftVault: web3.PublicKey;
    farmConfig: web3.PublicKey;
    pdaAccount: web3.PublicKey;
    nftMint: web3.PublicKey;
    oldScholarTable: web3.PublicKey;
    newScholarTable: web3.PublicKey;
    lookupProgram: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    tokenProgram?: web3.PublicKey;
    clock: web3.PublicKey;
    rent?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const guildUnstakeNftInstructionDiscriminator: number[];
/**
 * Creates a _GuildUnstakeNft_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category GuildUnstakeNft
 * @category generated
 */
export declare function createGuildUnstakeNftInstruction(accounts: GuildUnstakeNftInstructionAccounts, args: GuildUnstakeNftInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
