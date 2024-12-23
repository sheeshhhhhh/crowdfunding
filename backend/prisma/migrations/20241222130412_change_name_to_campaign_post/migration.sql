/*
  Warnings:

  - The `status` column on the `CampaignPost` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId,title]` on the table `CampaignPost` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('ACTIVE', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "CampaignPost" DROP COLUMN "status",
ADD COLUMN     "status" "CampaignStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "CrowdFundPostStatus";

-- CreateIndex
CREATE UNIQUE INDEX "CampaignPost_userId_title_key" ON "CampaignPost"("userId", "title");
