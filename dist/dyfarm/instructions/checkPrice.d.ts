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
 * @category CheckPrice
 * @category generated
 */
export declare type CheckPriceInstructionArgs = {
    pair: string;
};
/**
 * @category Instructions
 * @category CheckPrice
 * @category generated
 */
export declare const checkPriceStruct: beet.FixableBeetArgsStruct<CheckPriceInstructionArgs & {
    instructionDiscriminator: number[];
}>;
/**
 * Accounts required by the _checkPrice_ instruction
 *
 * @property [_writable_, **signer**] user
 * @property [_writable_] farmConfig
 * @property [] priceFeed
 * @category Instructions
 * @category CheckPrice
 * @category generated
 */
export declare type CheckPriceInstructionAccounts = {
    user: web3.PublicKey;
    farmConfig: web3.PublicKey;
    priceFeed: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const checkPriceInstructionDiscriminator: number[];
/**
 * Creates a _CheckPrice_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CheckPrice
 * @category generated
 */
export declare function createCheckPriceInstruction(accounts: CheckPriceInstructionAccounts, args: CheckPriceInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
