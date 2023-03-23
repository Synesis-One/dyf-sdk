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
 * @category CreateCampaign
 * @category generated
 */
export declare type CreateCampaignInstructionArgs = {
    campaignTitle: string;
    pair: string;
    industry: string;
    domain: string;
    subject: string;
    organizer: string;
    lang: string;
    kind: number;
    open: beet.bignum;
    close: beet.bignum;
    expire: beet.bignum;
    rpuValidator: beet.bignum;
    minGeneral: beet.bignum;
    rpuGeneral: beet.bignum;
    minSpecific: beet.bignum;
    rpuSpecific: beet.bignum;
    minCause: beet.bignum;
    rpuCause: beet.bignum;
    minEffect: beet.bignum;
    rpuEffect: beet.bignum;
    minBuilder: number;
    minValidator: number;
    majorityQuorum: number;
    minimumStake: beet.bignum;
    acceptRate: number;
};
/**
 * @category Instructions
 * @category CreateCampaign
 * @category generated
 */
export declare const createCampaignStruct: beet.FixableBeetArgsStruct<CreateCampaignInstructionArgs & {
    instructionDiscriminator: number[];
}>;
/**
 * Accounts required by the _createCampaign_ instruction
 *
 * @property [_writable_, **signer**] user
 * @property [_writable_] campaignAccount
 * @property [_writable_] campaignVault
 * @property [_writable_] dyfVault
 * @property [_writable_] userToken
 * @property [] mint
 * @property [] farmConfig
 * @property [] priceFeed
 * @property [_writable_] pdaAccount
 * @property [_writable_] campaignTableAccount
 * @property [] lookupProgram
 * @property [] oracle
 * @property [] clock
 * @category Instructions
 * @category CreateCampaign
 * @category generated
 */
export declare type CreateCampaignInstructionAccounts = {
    user: web3.PublicKey;
    campaignAccount: web3.PublicKey;
    campaignVault: web3.PublicKey;
    dyfVault: web3.PublicKey;
    userToken: web3.PublicKey;
    mint: web3.PublicKey;
    farmConfig: web3.PublicKey;
    priceFeed: web3.PublicKey;
    pdaAccount: web3.PublicKey;
    campaignTableAccount: web3.PublicKey;
    lookupProgram: web3.PublicKey;
    oracle: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    tokenProgram?: web3.PublicKey;
    clock: web3.PublicKey;
    rent?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const createCampaignInstructionDiscriminator: number[];
/**
 * Creates a _CreateCampaign_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CreateCampaign
 * @category generated
 */
export declare function createCreateCampaignInstruction(accounts: CreateCampaignInstructionAccounts, args: CreateCampaignInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
