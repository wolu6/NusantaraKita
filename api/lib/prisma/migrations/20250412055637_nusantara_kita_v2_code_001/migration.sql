-- CreateTable
CREATE TABLE `nk_provinsi` (
    `kode` VARCHAR(13) NOT NULL,
    `nama` VARCHAR(100) NULL,
    `lat` DOUBLE NULL,
    `lng` DOUBLE NULL,

    PRIMARY KEY (`kode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nk_kabupaten_kota` (
    `kode` VARCHAR(13) NOT NULL,
    `nama` VARCHAR(100) NULL,
    `lat` DOUBLE NULL,
    `lng` DOUBLE NULL,
    `kode_provinsi` VARCHAR(13) NULL,

    INDEX `fk_kabupaten_provinsi`(`kode_provinsi`),
    PRIMARY KEY (`kode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nk_kecamatan` (
    `kode` VARCHAR(13) NOT NULL,
    `nama` VARCHAR(100) NULL,
    `lat` DOUBLE NULL,
    `lng` DOUBLE NULL,
    `kode_kab_kota` VARCHAR(13) NULL,

    INDEX `fk_kec_kab_kota`(`kode_kab_kota`),
    PRIMARY KEY (`kode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nk_desa_kelurahan` (
    `kode` VARCHAR(13) NOT NULL,
    `nama` VARCHAR(100) NULL,
    `lat` DOUBLE NULL,
    `lng` DOUBLE NULL,
    `kode_kecamatan` VARCHAR(13) NULL,

    INDEX `fk_desa_kel_kec`(`kode_kecamatan`),
    PRIMARY KEY (`kode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `nk_kabupaten_kota` ADD CONSTRAINT `nk_kabupaten_kota_kode_provinsi_fkey` FOREIGN KEY (`kode_provinsi`) REFERENCES `nk_provinsi`(`kode`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nk_kecamatan` ADD CONSTRAINT `nk_kecamatan_kode_kab_kota_fkey` FOREIGN KEY (`kode_kab_kota`) REFERENCES `nk_kabupaten_kota`(`kode`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nk_desa_kelurahan` ADD CONSTRAINT `nk_desa_kelurahan_kode_kecamatan_fkey` FOREIGN KEY (`kode_kecamatan`) REFERENCES `nk_kecamatan`(`kode`) ON DELETE SET NULL ON UPDATE CASCADE;
