/*
  Warnings:

  - Added the required column `note` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `expense` ADD COLUMN `note` VARCHAR(191) NOT NULL;
