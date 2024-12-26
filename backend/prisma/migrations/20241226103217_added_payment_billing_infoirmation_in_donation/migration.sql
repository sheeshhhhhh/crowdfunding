/*
  Warnings:

  - You are about to drop the column `Address` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `City` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `Country` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `FirstName` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `PostalCode` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `address` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "Address",
DROP COLUMN "City",
DROP COLUMN "Country",
DROP COLUMN "Email",
DROP COLUMN "FirstName",
DROP COLUMN "LastName",
DROP COLUMN "PostalCode",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL;
