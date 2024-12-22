/*
  Warnings:

  - You are about to drop the column `HeaderImage` on the `CrowdFundPost` table. All the data in the column will be lost.
  - Added the required column `headerImage` to the `CrowdFundPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDonors` to the `CrowdFundPost` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CrowdFundPostStatus" AS ENUM ('ACTIVE', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "CrowdFundPost" DROP COLUMN "HeaderImage",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "headerImage" TEXT NOT NULL,
ADD COLUMN     "status" "CrowdFundPostStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "totalDonors" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "postId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_postId_fkey" FOREIGN KEY ("postId") REFERENCES "CrowdFundPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
