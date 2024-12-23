/*
  Warnings:

  - You are about to drop the `CrowdFundPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CrowdFundPost" DROP CONSTRAINT "CrowdFundPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_postId_fkey";

-- DropTable
DROP TABLE "CrowdFundPost";

-- CreateTable
CREATE TABLE "CampaignPost" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "headerImage" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "CrowdFundPostStatus" NOT NULL DEFAULT 'ACTIVE',
    "body" TEXT NOT NULL,
    "goal" INTEGER NOT NULL,
    "current" INTEGER NOT NULL,
    "totalDonors" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "CampaignPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CampaignPost" ADD CONSTRAINT "CampaignPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_postId_fkey" FOREIGN KEY ("postId") REFERENCES "CampaignPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
