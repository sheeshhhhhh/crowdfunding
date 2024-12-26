import { Update } from "./update";

const CampaignStatus = {
    ACTIVE = "ACTIVE",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
} as const;
type CampaignStatus = typeof CampaignStatus[keyof typeof CampaignStatus];

export type CampaignPost = {
    id: string,
    userId: string,
    title: string,
    headerImage: string,
    status: string,

    body: string,

    user: userProfile,

    goal: number,
    current: number,
    totalDonors: number,

    createdAt: string,
    updatedAt: string,
    endDate?: string
}

export type CampaignPostWithUpdates = CampaignPost & {
    updates: Update[]
}