import { Update } from "./update";

const CampaignStatus = {
    ACTIVE = "ACTIVE",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
} as const;
type CampaignStatus = typeof CampaignStatus[keyof typeof CampaignStatus];

const CampaignCategory = {
    MEDICAL = "MEDICAL",
    EDUCATION = "EDUCATION",
    ENVIRONMENT = "ENVIRONMENT",
    ANIMALS = "ANIMALS",
    DISASTER = "DISASTER",
    BUSINESS = "BUSINESS",
    OTHER = "OTHER",
} as const;
export type CampaignCategory = typeof CampaignCategory[keyof typeof CampaignCategory];

export type CampaignPost = {
    id: string,
    userId: string,
    title: string,
    headerImage: string,
    status: string,
    category?: CampaignCategory,

    body: string,

    user: userProfile,

    goal: number,
    current: number,
    totalDonors: number,

    createdAt: string,
    updatedAt: string,
    endDate?: string
}

export type campaignProfile = {
    id: string,
    title: string,
    userId: string,
    headerImage: string,
    status: CampaignStatus,
    goal: number,
    current: number,
    totalDonors: number,
    createdAt: string,
    endDate?: string,
}

export type CampaignPostWithUpdates = CampaignPost & {
    updates: Update[]
}