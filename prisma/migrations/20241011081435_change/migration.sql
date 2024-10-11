-- DropForeignKey
ALTER TABLE `expense` DROP FOREIGN KEY `Expense_accountId_fkey`;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
