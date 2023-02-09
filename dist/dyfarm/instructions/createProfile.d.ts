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
 * @category CreateProfile
 * @category generated
 */
export declare type CreateProfileInstructionArgs = {
    role: number;
    access: number;
};
/**
 * @category Instructions
 * @category CreateProfile
 * @category generated
 */
export declare const createProfileStruct: beet.BeetArgsStruct<CreateProfileInstructionArgs & {
    instructionDiscriminator: number[];
}>;
/**
 * Accounts required by the _createProfile_ instruction
 *
 * @property [_writable_, **signer**] user
 * @property [_writable_] userProfile
 * @property [] farmConfig
 * @property [] clock
 * @category Instructions
 * @category CreateProfile
 * @category generated
 */
export declare type CreateProfileInstructionAccounts = {
    user: web3.PublicKey;
    userProfile: web3.PublicKey;
    farmConfig: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    clock: web3.PublicKey;
    rent?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const createProfileInstructionDiscriminator: number[];
/**
 * Creates a _CreateProfile_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CreateProfile
 * @category generated
 */
export declare function createCreateProfileInstruction(accounts: CreateProfileInstructionAccounts, args: CreateProfileInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
