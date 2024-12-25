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

export type RecentDonation = {
    user: {
        id: user['id'];
        username: user['username'];
        profile: user['profile'];
        email: user['email'];
    }
} & Donation

export type montlyDonationsStats = {
    month: string,
    amount: number
}[]
export type DonationOverview = {
    activeCampaignscount: number,
    totalDonations: number,
    averageDonation: number,
    totalDonors: number,
    recentDonations: RecentDonation[],
    monthlyDonationsStats: montlyDonationsStats
}