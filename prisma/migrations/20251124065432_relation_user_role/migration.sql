/*
  Warnings:

  - Made the column `name` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `roleId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `roleId` INTEGER NOT NULL,
    MODIFY `username` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `fullName` VARCHAR(255) NULL,
    MODIFY `address` VARCHAR(255) NULL,
    MODIFY `phone` VARCHAR(255) NULL,
    MODIFY `avatar` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
