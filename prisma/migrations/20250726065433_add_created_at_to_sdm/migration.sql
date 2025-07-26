/*
  Warnings:

  - You are about to drop the `sumber_daya_masyarakat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `sumber_daya_masyarakat`;

-- CreateTable
CREATE TABLE `SumberDayaMasyarakat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `telepon` VARCHAR(191) NOT NULL,
    `produk` VARCHAR(191) NOT NULL,
    `lainnya` VARCHAR(191) NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `kelurahan` VARCHAR(191) NOT NULL,
    `jenis` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
