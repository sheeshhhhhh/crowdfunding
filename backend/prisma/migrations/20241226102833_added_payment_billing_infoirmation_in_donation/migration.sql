/*
  Warnings:

  - Added the required column `Address` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `City` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Country` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FirstName` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastName` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PostalCode` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "City" TEXT NOT NULL,
ADD COLUMN     "Country" TEXT NOT NULL,
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "FirstName" TEXT NOT NULL,
ADD COLUMN     "LastName" TEXT NOT NULL,
ADD COLUMN     "PostalCode" TEXT NOT NULL;
