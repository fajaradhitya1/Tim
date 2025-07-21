/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
