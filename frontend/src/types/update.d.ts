import { CampaignPost } from "./campaign"

export type Update = {
    id: string,
    postId: string,

    message: string,
    
    createdAt: string,
    updatedAt: string,
}

export type UpdateWithPost = Update & {
    post: CampaignPost,
}

export type UpdateForm = {
    message: string,
    campaignId: string,
}