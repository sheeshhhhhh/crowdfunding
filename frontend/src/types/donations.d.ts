import { CampaignPost } from "./campaign";
import { user } from "./user";


export type Donation = {
    id: string;
    amount: number;

    post?: CampaignPost;
    user?: user

    message?: string;
    paymentId?: string;
    createdAt: string;
    updatedAt: string;
}

export type Donations = Donation[]

export type DonationStatistics = {
    totalDonations: number;
    totalDonors: number;
    averageDonation: number;
}

export type DonationInDashboard = {
    post: {
        id: CampaignPost['id'];
        title: CampaignPost['title'];
    };

    user?: {
        id: user['id'];
        profile: user['profile'];
    }
} & Donation
