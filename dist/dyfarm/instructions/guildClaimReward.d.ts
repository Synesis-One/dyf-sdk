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
 * @category GuildClaimReward
 * @category generated
 */
export declare type GuildClaimRewardInstructionArgs = {
    campaignTitle: string;
    guildTitle: string;
};
/**
 * @category Instructions
 * @category GuildClaimReward
 * @category generated
 */
export declare const guildClaimRewardStruct: beet.FixableBeetArgsStruct<GuildClaimRewardInstructionArgs & {
    instructionDiscriminator: number[];
}>;
/**
 * Accounts required by the _guildClaimReward_ instruction
 *
 * @property [_writable_, **signer**] user
 * @property [_writable_] master
 * @property [_writable_] userProfile
 * @property [_writable_] userToken
 * @property [_writable_] campaignAccount
 * @property [_writable_] campaignActivity
 * @property [_writable_] campaignVault
 * @property [] guildAccount
 * @property [_writable_] guildAta
 * @property [] farmConfig
 * @property [_writable_] pdaAccount
 * @property [_writable_] dyfVault
 * @property [] clock
 * @category Instructions
 * @category GuildClaimReward
 * @category generated
 */
export declare type GuildClaimRewardInstructionAccounts = {
    user: web3.PublicKey;
    master: web3.PublicKey;
    userProfile: web3.PublicKey;
    userToken: web3.PublicKey;
    campaignAccount: web3.PublicKey;
    campaignActivity: web3.PublicKey;
    campaignVault: web3.PublicKey;
    guildAccount: web3.PublicKey;
    guildAta: web3.PublicKey;
    farmConfig: web3.PublicKey;
    pdaAccount: web3.PublicKey;
    dyfVault: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    tokenProgram?: web3.PublicKey;
    clock: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const guildClaimRewardInstructionDiscriminator: number[];
/**
 * Creates a _GuildClaimReward_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category GuildClaimReward
 * @category generated
 */
export declare function createGuildClaimRewardInstruction(accounts: GuildClaimRewardInstructionAccounts, args: GuildClaimRewardInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
