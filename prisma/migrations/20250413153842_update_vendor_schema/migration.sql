/*
  Warnings:

  - You are about to drop the column `bio` on the `vendor` table. All the data in the column will be lost.
  - Added the required column `storeBanner` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeDescription` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeLogo` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storePhone` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vendor` DROP COLUMN `bio`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `storeBanner` VARCHAR(191) NOT NULL,
    ADD COLUMN `storeDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `storeLogo` VARCHAR(191) NOT NULL,
    ADD COLUMN `storePhone` VARCHAR(191) NOT NULL;
