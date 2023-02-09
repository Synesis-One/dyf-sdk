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
 * @category DeactiveTable
 * @category generated
 */
export declare const deactiveTableStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
/**
 * Accounts required by the _deactiveTable_ instruction
 *
 * @property [_writable_, **signer**] user
 * @property [_writable_] lookupAccount
 * @property [_writable_] pdaAccount
 * @property [] lookupProgram
 * @property [] clock
 * @category Instructions
 * @category DeactiveTable
 * @category generated
 */
export declare type DeactiveTableInstructionAccounts = {
    user: web3.PublicKey;
    lookupAccount: web3.PublicKey;
    pdaAccount: web3.PublicKey;
    lookupProgram: web3.PublicKey;
    clock: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    rent?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const deactiveTableInstructionDiscriminator: number[];
/**
 * Creates a _DeactiveTable_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category DeactiveTable
 * @category generated
 */
export declare function createDeactiveTableInstruction(accounts: DeactiveTableInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
