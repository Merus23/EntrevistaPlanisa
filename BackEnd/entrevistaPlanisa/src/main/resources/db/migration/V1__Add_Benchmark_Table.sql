-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: entrevista_planisa
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `benchmark`
--

DROP TABLE IF EXISTS `benchmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `benchmark` (
  `data_inicio` date NOT NULL,
  `data_termino` date NOT NULL,
  `quantidade_pessoas_pais1` int NOT NULL,
  `quantidade_pessoas_pais2` int NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pais1` varchar(255) NOT NULL,
  `pais2` varchar(255) NOT NULL,
  `tipo_comparacao` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benchmark`
--

LOCK TABLES `benchmark` WRITE;
/*!40000 ALTER TABLE `benchmark` DISABLE KEYS */;
INSERT INTO `benchmark` VALUES ('2021-02-12','2021-02-14',1678,207,2,'Brazil','Argentina','deaths','Qualquer coisa'),('2024-07-26','2024-07-28',100,200,3,'Nome do País 1','Nome do País 2','Tipo de Comparação','Teste'),('2024-07-26','2024-07-28',100,200,4,'Nome do País 1','Nome do País 2','Tipo de Comparação','Teste'),('2024-07-26','2024-07-28',100,200,6,'Nome do País 1','Nome do País 2','Tipo de Comparação','Teste'),('2024-07-26','2024-07-28',100,200,11,'Nome do País 1','Nome do País 2','Tipo de Comparação','Teste'),('2024-07-26','2024-07-28',100,200,12,'Nome do País 1','Nome do País 2','Tipo de Comparação','Teste'),('2024-07-26','2024-07-28',100,200,13,'Nome do País 1','Nome do País 2','Tipo de Comparação','Teste'),('2024-07-26','2024-07-28',100,200,14,'Nome do País 1','Nome do País 2','Tipo de Comparação','Teste 1'),('2024-07-26','2024-07-28',100,200,15,'Nome do País 1','Nome do País 2','Tipo de Comparação','Teste'),('2021-02-12','2021-02-14',1678,207,16,'Brazil','Argentina','deaths','Comparação entre Brasil e Argentina'),('2021-01-12','2021-01-13',1264,135,17,'Brazil','Argentina','deaths','AAAAA'),('2021-01-12','2021-01-15',3553,379,18,'Brazil','Argentina','deaths','Comparação entre Brasil e Argentina');
/*!40000 ALTER TABLE `benchmark` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-14 23:47:56
