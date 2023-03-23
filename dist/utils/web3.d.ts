/// <reference types="node" />
import { Connection, PublicKey, Signer, TransactionInstruction, Commitment, SendOptions, TransactionSignature, SignatureStatus, AccountInfo } from '@solana/web3.js';
import { AnchorWallet } from '../typings';
export declare function sendInstructions(connection: Connection, wallet: AnchorWallet, instructions: TransactionInstruction[], signers: Signer[], commitment?: Commitment, payer?: PublicKey): Promise<string>;
export declare const awaitTransactionSignatureConfirmation: (txid: TransactionSignature, timeout: number, connection: Connection, commitment?: Commitment, queryStatus?: boolean) => Promise<SignatureStatus | null | void>;
export declare function sendAndConfirmWithRetry(connection: Connection, txn: Buffer, sendOptions: SendOptions, commitment: Commitment, timeout?: number): Promise<{
    txid: string;
}>;
export declare const getAssociateTokenAccount: (mint: PublicKey, authority: PublicKey) => PublicKey;
export declare const getOrCreateAssociateTokenAccount: (connection: Connection, wallet: AnchorWallet, mint: PublicKey, authority: PublicKey) => Promise<PublicKey>;
export declare const isEqualAddress: (acc_st: string | PublicKey, acc_nd: string | PublicKey) => boolean;
export declare const isIncludingAddress: (arr_addr: Array<string | PublicKey>, addr: string | PublicKey) => boolean;
export declare const isValidAddress: (acc: string | PublicKey) => boolean;
export declare const isEmptyAddress: (acc: string | PublicKey) => boolean;
export declare const getAccountsByDiscriminator: (connection: Connection, discriminator: Uint8Array, programId: PublicKey) => Promise<{
    pubkey: PublicKey;
    account: AccountInfo<Buffer>;
}[]>;
