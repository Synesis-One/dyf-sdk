export * from './Campaign';
export * from './CampaignActivity';
export * from './FarmConfig';
export * from './Feed';
export * from './Guild';
export * from './Phrase';
export * from './Profile';
export * from './StakeAccount';
export * from './Validate';
export * from './Validators';
import { FarmConfig } from './FarmConfig';
import { Guild } from './Guild';
import { Profile } from './Profile';
import { CampaignActivity } from './CampaignActivity';
import { Campaign } from './Campaign';
import { Phrase } from './Phrase';
import { Validate } from './Validate';
import { Validators } from './Validators';
import { Feed } from './Feed';
import { StakeAccount } from './StakeAccount';
export declare const accountProviders: {
    FarmConfig: typeof FarmConfig;
    Guild: typeof Guild;
    Profile: typeof Profile;
    CampaignActivity: typeof CampaignActivity;
    Campaign: typeof Campaign;
    Phrase: typeof Phrase;
    Validate: typeof Validate;
    Validators: typeof Validators;
    Feed: typeof Feed;
    StakeAccount: typeof StakeAccount;
};
