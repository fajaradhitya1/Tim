-- CreateTable
CREATE TABLE `sumber_daya_masyarakat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `telepon` VARCHAR(191) NOT NULL,
    `produk` VARCHAR(191) NOT NULL,
    `lainnya` VARCHAR(191) NOT NULL,
    `alamat` TEXT NOT NULL,
    `kelurahan` VARCHAR(191) NOT NULL,
    `jenis` VARCHAR(191) NOT NULL,
    `keterangan` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
