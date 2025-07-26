/*
  Warnings:

  - The primary key for the `SumberDayaMasyarakat` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `SumberDayaMasyarakat` DROP PRIMARY KEY,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL DEFAULT '/images/tanya.jpg',
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
