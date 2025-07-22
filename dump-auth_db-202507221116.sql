-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: auth_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `role` varchar(191) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1','fajar@gmail.com','$2b$10$MXlkupM2TkS.viK5yjgHvOA1lQcJ.0JeWKElwxOF/4saKbB4JL0TW','2025-07-19 07:35:53.805','user'),('2','fajaradhit@gmail.com','$2b$10$EQnTDCfCaN6d2V7mMKlDPuCS/RoDY/4.D68l/ej.BSNba5CxDmYW.','2025-07-19 07:58:58.209','user'),('3','fajaradhitya12@gmail.com','$2b$10$MNfSZjkkfMOwwEHC5ng7puPHRHqNF8mScaxTBvq0PSgd/7DePACPK','2025-07-19 08:18:50.522','user'),('cmdbuo6fm0000v4qgty2rctac','fajarrr2@gmail.com','$2b$10$P9rYQuj2GQmRCVoTRuzU7uj3nJbDu1nLX1AcxeJeeUBOUJOViXuJe','2025-07-20 15:47:04.979','user'),('cmdbuqw1r0001v4qgdi1prej2','adhitya@gmail.com','$2b$10$DwqxT8f0.0o2wF.LDUiCW.djw7RF85ZvtZohW6uZ2QT8CoRrcb6n2','2025-07-20 15:49:11.487','user'),('cmdcp4xzt0000v4rsczlsywoe','adhimanthey@gmail.com','$2b$10$EYLdzgx6kYGOLZAtPY8CAehjuWngwO23Y7dHFroIKZL4QwtQyrg4a','2025-07-21 05:59:55.671','user'),('cmdcw7e420001v4rsj69mvwwn','fajaradhitya2@gmail.com','$2b$10$V2T6CaiPZv1faIwpCmjI9uy7V.taRYD6K7XS2RoHQLoRsDerPgDXq','2025-07-21 09:17:47.186','user'),('cmddcq9xa0000v46sx4n27374','fajar2501@gmail.com','$2b$10$pPsASWXtpQtmLoJ9sux.zupxK0yD4iA4M7gpe.yNjDeT3V4pVVvk2','2025-07-21 17:00:22.078','user'),('cmddct4a80001v46sp7pz3ofs','nagajelek@gmail.com','$2b$10$mnuRL4c8MPSe1u7x0T3XVu5hFvjV6M9ozc4WG46nygfeLXEAzwBUG','2025-07-21 17:02:34.735','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('0331ca9d-c841-4d66-93ef-696c76917825','cf7913743e844213c53001115854665b7d930f49efe253fc95f1f52fcc05c36a','2025-07-20 14:58:37.557','20250720145837_add_admin_model',NULL,NULL,'2025-07-20 14:58:37.507',1),('4eb6d572-a321-4b78-8457-7e2c8b5f6e92','2f5bcab300e26d4ad78d3b1cc8898ef64c1a514dbe68b5908944a117afef7c92','2025-07-19 06:18:11.432','20250719061811_init',NULL,NULL,'2025-07-19 06:18:11.369',1),('4f47ebca-9e3f-439f-a684-464b92fe46ad','7423a4446dc064c7a8cd5437172f3e5ac5e0798dedccd1c0361242eca2acfde4','2025-07-21 14:10:30.054','20250721141029_add_umkm_features',NULL,NULL,'2025-07-21 14:10:29.804',1),('5abfd62d-e060-40a1-8d9b-361928456cf8','6cf5127f4673ce8edc7a0c2f8a3c6ee971414ea37b8564c6f08d6a3c2a99f4f4','2025-07-20 16:18:10.345','20250720161810_add_umkm_model',NULL,NULL,'2025-07-20 16:18:10.268',1),('ae9c5bae-744c-42c7-b7e2-82a0f7115c5e','5d2015bc507c4d81c955d9845fc586fb2c9c535ecc21eb1de3faa4c0d505181f','2025-07-20 15:40:38.933','20250720154038_init',NULL,NULL,'2025-07-20 15:40:38.830',1),('e7bb8fd3-c42b-40b6-8f55-0ab800f3edad','6de23c204dfce9446126b84f826a0f271394650bfc79238aff048d1ba54562b4','2025-07-20 15:58:10.433','20250720155810_add_umkm',NULL,NULL,'2025-07-20 15:58:10.403',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `adminId` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`adminId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admin','$2b$10$21uxHAdR1e/OEQVLEX1y8O.2ooLNxjcbf4hT09Br2K4Yple.tbD1W','2025-07-20 15:06:17.012'),('admin01','','2025-07-20 15:00:48.346');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `umkm`
--

DROP TABLE IF EXISTS `umkm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `umkm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(191) NOT NULL,
  `deskripsi` varchar(191) NOT NULL,
  `wilayah` varchar(191) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `imageUrl` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `verified` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `umkm`
--

LOCK TABLES `umkm` WRITE;
/*!40000 ALTER TABLE `umkm` DISABLE KEYS */;
INSERT INTO `umkm` VALUES (7,'Keripik enak','Keripik pedan enak banget','Desa Kwala Bingai',3.574239721002229,98.65101887769161,'/uploads/1753089509079-front_design.png','2025-07-21 09:18:29.087',0);
/*!40000 ALTER TABLE `umkm` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-22 11:16:35
