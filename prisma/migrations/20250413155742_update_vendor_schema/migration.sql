/*
  Warnings:

  - Added the required column `storeLocation` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vendor` ADD COLUMN `storeLocation` VARCHAR(191) NOT NULL;
