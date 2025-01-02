-- CreateEnum
CREATE TYPE "CampaignCategory" AS ENUM ('MEDICAL', 'EDUCATION', 'ENVIRONMENT', 'ANIMALS', 'DISASTER', 'BUSINESS', 'OTHER');

-- AlterTable
ALTER TABLE "CampaignPost" ADD COLUMN     "category" "CampaignCategory";
