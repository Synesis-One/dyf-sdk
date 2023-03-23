export declare const PHRASE_TYPE: {
    general: {
        val: number;
        label: string;
    };
    specific: {
        val: number;
        label: string;
    };
    cause: {
        val: number;
        label: string;
    };
    effect: {
        val: number;
        label: string;
    };
};
export declare enum RpcTxnStatus {
    Pending = 0,
    Finalized = 1,
    Expired = 2
}
export declare enum CampaignStatus {
    Upcoming = 0,
    Inprogress = 1,
    FinishedUnclaimable = 2,
    FinishedClaimable = 3,
    ClosingByRpc = 4,
    ClosingByArchitect = 5,
    Closed = 6,
    Expired = 7
}
export declare const METADATA_PROGRAM_ADDRESS = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
export declare const SNS_PAIR = "SNS/USD";
export declare const LOOKUP_PROGRAM_ADDRESS = "AddressLookupTab1e1111111111111111111111111";
export declare const LAMPORTS_PER_USDC = 1000000;
