/*
  Warnings:

  - The primary key for the `PenangkapanIkan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `metode` on the `PenangkapanIkan` table. All the data in the column will be lost.
  - You are about to alter the column `hargaPerKg` on the `PenangkapanIkan` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `stokKg` on the `PenangkapanIkan` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `PenangkapanIkan` DROP PRIMARY KEY,
    DROP COLUMN `metode`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `hargaPerKg` DOUBLE NOT NULL,
    MODIFY `stokKg` DOUBLE NOT NULL,
    ADD PRIMARY KEY (`id`);
