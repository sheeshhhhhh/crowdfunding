/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `BillingInformation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `BillingInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BillingInformation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "paymentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BillingInformation_userId_key" ON "BillingInformation"("userId");

-- AddForeignKey
ALTER TABLE "BillingInformation" ADD CONSTRAINT "BillingInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
