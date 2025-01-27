-- MySQL dump 10.13  Distrib 8.3.0, for Win64 (x86_64)
--
-- Host: localhost    Database: sistemaflexdb
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
-- Table structure for table `beneficiario`
--

DROP TABLE IF EXISTS `beneficiario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beneficiario` (
  `BeneficiarioID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`BeneficiarioID`),
  UNIQUE KEY `Email` (`Email`),
  KEY `IX_Beneficiario_Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beneficiario`
--

/*!40000 ALTER TABLE `beneficiario` DISABLE KEYS */;
/*!40000 ALTER TABLE `beneficiario` ENABLE KEYS */;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `PagoID` int(11) NOT NULL AUTO_INCREMENT,
  `PresupuestoID` int(11) NOT NULL,
  `CantidadPagada` decimal(10,2) NOT NULL,
  `FechaPago` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`PagoID`),
  KEY `PresupuestoID` (`PresupuestoID`),
  CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`PresupuestoID`) REFERENCES `presupuesto` (`PresupuestoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;

--
-- Table structure for table `poliza`
--

DROP TABLE IF EXISTS `poliza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poliza` (
  `PolizaID` int(11) NOT NULL AUTO_INCREMENT,
  `BeneficiarioID` int(11) NOT NULL,
  `TipoPoliza` varchar(50) DEFAULT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date DEFAULT NULL,
  `Estado` varchar(50) DEFAULT 'Inactiva',
  PRIMARY KEY (`PolizaID`),
  KEY `BeneficiarioID` (`BeneficiarioID`),
  CONSTRAINT `poliza_ibfk_1` FOREIGN KEY (`BeneficiarioID`) REFERENCES `beneficiario` (`BeneficiarioID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poliza`
--

/*!40000 ALTER TABLE `poliza` DISABLE KEYS */;
/*!40000 ALTER TABLE `poliza` ENABLE KEYS */;

--
-- Table structure for table `presupuesto`
--

DROP TABLE IF EXISTS `presupuesto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presupuesto` (
  `PresupuestoID` int(11) NOT NULL AUTO_INCREMENT,
  `SiniestroID` int(11) NOT NULL,
  `MontoTotal` decimal(10,2) NOT NULL,
  `Estado` enum('Pendiente','Pagado') DEFAULT 'Pendiente',
  `FechaCreacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`PresupuestoID`),
  KEY `SiniestroID` (`SiniestroID`),
  KEY `IX_Presupuesto_Estado` (`Estado`),
  CONSTRAINT `presupuesto_ibfk_1` FOREIGN KEY (`SiniestroID`) REFERENCES `siniestro` (`SiniestroID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presupuesto`
--

/*!40000 ALTER TABLE `presupuesto` DISABLE KEYS */;
/*!40000 ALTER TABLE `presupuesto` ENABLE KEYS */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_CrearPago
AFTER INSERT ON Presupuesto
FOR EACH ROW
BEGIN
    -- Validar si el siniestro relacionado está en estado 'Pendiente'
    IF EXISTS (
        SELECT 1
        FROM Siniestro
        WHERE SiniestroID = NEW.SiniestroID
        AND Estado = 'Pendiente'
    ) THEN
        -- Insertar en la tabla de pagos
        INSERT INTO Pago (PresupuestoID, CantidadPagada)
        VALUES (NEW.PresupuestoID, NEW.MontoTotal);
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El siniestro no está pendiente de pago.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `siniestro`
--

DROP TABLE IF EXISTS `siniestro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `siniestro` (
  `SiniestroID` int(11) NOT NULL AUTO_INCREMENT,
  `BeneficiarioID` int(11) NOT NULL,
  `VehiculoID` int(11) NOT NULL,
  `PolizaID` int(11) NOT NULL,
  `TallerID` int(11) DEFAULT NULL,
  `Fecha` date NOT NULL DEFAULT curdate(),
  `Ubicacion` varchar(200) DEFAULT NULL,
  `Tipo` varchar(50) NOT NULL,
  `Estado` enum('Pendiente','Cerrado','En Proceso') DEFAULT 'Pendiente',
  `Descripcion` text DEFAULT NULL,
  PRIMARY KEY (`SiniestroID`),
  KEY `BeneficiarioID` (`BeneficiarioID`),
  KEY `VehiculoID` (`VehiculoID`),
  KEY `PolizaID` (`PolizaID`),
  KEY `TallerID` (`TallerID`),
  KEY `IX_Siniestro_Estado` (`Estado`),
  CONSTRAINT `siniestro_ibfk_1` FOREIGN KEY (`BeneficiarioID`) REFERENCES `beneficiario` (`BeneficiarioID`),
  CONSTRAINT `siniestro_ibfk_2` FOREIGN KEY (`VehiculoID`) REFERENCES `vehiculo` (`VehiculoID`),
  CONSTRAINT `siniestro_ibfk_3` FOREIGN KEY (`PolizaID`) REFERENCES `poliza` (`PolizaID`),
  CONSTRAINT `siniestro_ibfk_4` FOREIGN KEY (`TallerID`) REFERENCES `taller` (`TallerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `siniestro`
--

/*!40000 ALTER TABLE `siniestro` DISABLE KEYS */;
/*!40000 ALTER TABLE `siniestro` ENABLE KEYS */;

--
-- Table structure for table `taller`
--

DROP TABLE IF EXISTS `taller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taller` (
  `TallerID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Direccion` varchar(200) NOT NULL,
  `Capacidad` int(11) NOT NULL,
  `Estado` enum('Disponible','Ocupado') DEFAULT 'Disponible',
  `Telefono` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`TallerID`),
  KEY `IX_Taller_Estado` (`Estado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taller`
--

/*!40000 ALTER TABLE `taller` DISABLE KEYS */;
/*!40000 ALTER TABLE `taller` ENABLE KEYS */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `UsuarioID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Rol` enum('Personal','Administrador','Beneficiario') NOT NULL,
  PRIMARY KEY (`UsuarioID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'John','Doe','johndoe@example.com','$2b$10$1r2ESmNw9qkH6B4yekmPHeMPeMJ7BYjXqWJoi9HJqHiZjuSY7e/nC','Administrador'),(2,'Guax','Double','gix@gmail.com','$2b$10$WmksUWCCeC9U.KwdCun/pOS0jwTKul2tIzPB9T2Z0mBtkt0.tou3i','Personal'),(7,'Manuek','Roblas','manuel@gmail.com','$2b$10$.p/QqFbOyenCf0OBX8TgMOcdtOUTIeLvQUtvJyW8lgHG.2WP/prGa','Beneficiario');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

--
-- Table structure for table `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculo` (
  `VehiculoID` int(11) NOT NULL AUTO_INCREMENT,
  `Placa` varchar(50) NOT NULL,
  `Marca` varchar(50) NOT NULL,
  `Modelo` varchar(50) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`VehiculoID`),
  UNIQUE KEY `Placa` (`Placa`),
  KEY `IX_Vehiculo_Placa` (`Placa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculo`
--

/*!40000 ALTER TABLE `vehiculo` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehiculo` ENABLE KEYS */;

--
-- Dumping routines for database 'sistemaflexdb'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_ActualizarEstadoTaller` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ActualizarEstadoTaller`(
    IN TallerID INT,
    IN Estado VARCHAR(50)
)
BEGIN
    UPDATE Taller
    SET Estado = Estado
    WHERE TallerID = TallerID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_CrearPoliza` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CrearPoliza`(
    IN BeneficiarioID INT,
    IN TipoPoliza VARCHAR(50),
    IN FechaInicio DATE,
    IN FechaFin DATE,
    IN Estado VARCHAR(50),
    OUT PolizaID INT
)
BEGIN
    -- Si el Estado no se proporciona, establecerlo como 'Inactiva'
    IF Estado IS NULL OR Estado = '' THEN
        SET Estado = 'Inactiva';
    END IF;

    -- Validar si el beneficiario existe
    IF NOT EXISTS (
        SELECT 1
        FROM Beneficiario
        WHERE BeneficiarioID = BeneficiarioID
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El beneficiario no existe.';
    END IF;

    -- Insertar la póliza asociada al beneficiario
    INSERT INTO Poliza (BeneficiarioID, TipoPoliza, FechaInicio, FechaFin, Estado)
    VALUES (BeneficiarioID, TipoPoliza, FechaInicio, FechaFin, Estado);

    -- Obtener el ID de la póliza creada
    SET PolizaID = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_CreateUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CreateUser`(
    IN p_Nombre VARCHAR(100),
    IN p_Apellido VARCHAR(100),
    IN p_Email VARCHAR(100),
    IN p_Password VARCHAR(255),
    IN p_Rol ENUM('Personal', 'Administrador','Beneficiario')
)
BEGIN
    DECLARE email_count INT DEFAULT 0;

    -- Verificar si el correo electrónico ya existe
    SELECT COUNT(*) INTO email_count FROM Usuario WHERE Email = p_Email;

    IF email_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El correo electrónico ya está registrado';
    ELSE
        -- Insertar el nuevo usuario si no existe
        INSERT INTO Usuario (Nombre, Apellido, Email, Password, Rol)
        VALUES (p_Nombre, p_Apellido, p_Email, p_Password, p_Rol);
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_FindUserByEmail` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_FindUserByEmail`(IN p_Email VARCHAR(100))
BEGIN
    SELECT UsuarioID, Nombre, Apellido, Email, Password, Rol
    FROM Usuario
    WHERE Email = p_Email
    LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_RegistrarPresupuesto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RegistrarPresupuesto`(
    IN SiniestroID INT,
    IN MontoTotal DECIMAL(10, 2),
    OUT PresupuestoID INT
)
BEGIN
    INSERT INTO Presupuesto (SiniestroID, MontoTotal)
    VALUES (SiniestroID, MontoTotal);

    SET PresupuestoID = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_RegistrarSiniestro` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RegistrarSiniestro`(
    IN BeneficiarioID INT,
    IN VehiculoID INT,
    IN PolizaID INT,
    IN Fecha DATE,
    IN Ubicacion VARCHAR(200),
    IN Tipo VARCHAR(50),
    IN Descripcion TEXT,
    OUT SiniestroID INT
)
BEGIN
    INSERT INTO Siniestro (BeneficiarioID, VehiculoID, PolizaID, Fecha, Ubicacion, Tipo, Descripcion)
    VALUES (BeneficiarioID, VehiculoID, PolizaID, Fecha, Ubicacion, Tipo, Descripcion);

    SET SiniestroID = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-26 19:17:34
