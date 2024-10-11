/*
  Warnings:

  - You are about to drop the column `acountId` on the `expense` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `expense` DROP FOREIGN KEY `Expense_acountId_fkey`;

-- AlterTable
ALTER TABLE `expense` DROP COLUMN `acountId`,
    ADD COLUMN `accountId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
