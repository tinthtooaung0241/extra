/*
  Warnings:

  - You are about to drop the column `incomeId` on the `category` table. All the data in the column will be lost.
  - Added the required column `note` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_incomeId_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `incomeId`;

-- AlterTable
ALTER TABLE `income` ADD COLUMN `note` VARCHAR(191) NOT NULL,
    MODIFY `amount` DECIMAL(65, 30) NOT NULL;
