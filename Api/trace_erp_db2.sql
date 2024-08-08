-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 08, 2024 at 10:31 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trace_erp_db2`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `Balance` decimal(65,30) NOT NULL,
  `SubGroupAccountId` int(11) NOT NULL,
  `Description` longtext NOT NULL,
  `AccountNumber` longtext DEFAULT NULL,
  `AccountType` longtext NOT NULL,
  `AccountCode` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`Id`, `Name`, `Balance`, `SubGroupAccountId`, `Description`, `AccountNumber`, `AccountType`, `AccountCode`) VALUES
(1, 'Land', 300000.000000000000000000000000000000, 1, 'land', 'dfc', 'Cash at hand', NULL),
(2, 'Electricity', 0.000000000000000000000000000000, 3, 'electricity account', '', 'Cash at hand', NULL),
(3, 'Imprest', 200000.000000000000000000000000000000, 4, 'imprest', '3234234', 'Cash at hand', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `Id` int(11) NOT NULL,
  `Street` longtext NOT NULL,
  `City` longtext NOT NULL,
  `ZipCode` longtext NOT NULL,
  `Country` longtext NOT NULL,
  `VendorId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `applicationlogs`
--

CREATE TABLE `applicationlogs` (
  `Id` int(11) NOT NULL,
  `ApplicationNumber` longtext NOT NULL,
  `Status` longtext NOT NULL,
  `Message` longtext NOT NULL,
  `Date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applicationlogs`
--

INSERT INTO `applicationlogs` (`Id`, `ApplicationNumber`, `Status`, `Message`, `Date`) VALUES
(1, '9f7c7d39', 'PENDING SURVEY', 'Application has been submitted successfully', '2024-07-07 19:10:15.431010'),
(2, '240e1404', 'PENDING SURVEY', 'Surveyor has been assigned', '2024-07-07 19:42:10.436998'),
(3, '240e1404', 'PENDING CONNECTION INVOICE', 'Survey report has been submitted', '2024-07-07 19:43:53.107944'),
(20, '240e1404', 'APPROVED FOR CONNECTION', 'CONNECTION AUTHORIZATION', '2024-07-07 20:51:06.033989'),
(21, '240e1404', 'PENDING INVOICE PAYMENT', 'Connection Invoice has been generated', '2024-07-07 20:52:29.385028'),
(22, '240e1404', 'PENDING INVOICE PAYMENT', 'Connection invoice has been generated', '2024-07-07 22:03:50.075036'),
(23, '240e1404', 'PENDING INVOICE PAYMENT', 'Connection invoice has been generated', '2024-07-07 22:03:50.835656'),
(24, '34bbfb29', 'PENDING SURVEY', 'Application has been submitted successfully', '2024-07-08 08:35:53.432239'),
(25, '83960761', 'PENDING SURVEY', 'Surveyor has been assigned', '2024-07-08 08:38:39.728538'),
(26, '83960761', 'PENDING CONNECTION INVOICE', 'Survey report has been submitted', '2024-07-08 08:39:33.339859'),
(30, '240e1404', 'CUSTOMER CONNECTED', 'Docket Initiation has been submitted', '2024-07-08 10:00:34.150629'),
(31, '240e1404', 'PENDING INVOICE PAYMENT', 'Connection invoice has been generated', '2024-07-09 16:54:29.033904'),
(32, '240e1404', 'PENDING INVOICE PAYMENT', 'Connection invoice has been generated', '2024-07-12 12:07:59.276522'),
(33, '240e1404', 'PENDING INVOICE PAYMENT', 'Connection invoice has been generated', '2024-07-12 12:07:59.900029'),
(34, '240e1404', 'PENDING INVOICE PAYMENT', 'Connection invoice has been generated', '2024-07-12 12:09:19.610106'),
(35, '240e1404', 'PENDING INVOICE PAYMENT', 'Connection invoice has been generated', '2024-07-12 12:09:19.965548'),
(36, '240e1404', 'Meter Servicing', 'Meter with number 11 was installed by Daniel Ngobi on 7/12/2024', '2024-07-12 14:20:30.932362'),
(37, '240e1404', 'PENDING INVOICE PAYMENT', 'Connection invoice has been generated', '2024-07-14 08:48:14.755913'),
(38, '240e1404', 'PENDING INVOICE PAYMENT', 'Connection invoice has been generated', '2024-07-14 08:48:15.271758'),
(39, '240e1404', 'PENDING INVOICE PAYMENT', 'Connection invoice has been generated', '2024-07-15 14:58:50.164420'),
(40, '240e1404', 'PENDING INVOICE PAYMENT', 'Connection invoice has been generated', '2024-07-15 14:58:51.039222'),
(41, 'ae02a0c2', 'PENDING SURVEY', 'Application has been submitted successfully', '2024-07-15 17:16:06.557098'),
(42, '64682b2e', 'PENDING SURVEY', 'Surveyor has been assigned', '2024-07-15 17:16:41.696594'),
(43, '50a720f5', 'PENDING SURVEY', 'Application has been submitted successfully', '2024-07-15 17:18:54.229148'),
(44, '10e86c1b', 'PENDING SURVEY', 'Surveyor has been assigned', '2024-07-15 17:21:54.333839'),
(45, '10e86c1b', 'PENDING CONNECTION INVOICE', 'Survey report has been submitted', '2024-07-15 17:23:55.419573'),
(46, '9ba93412', 'PENDING SURVEY', 'Application has been submitted successfully', '2024-08-08 11:13:14.815192'),
(47, '3d110ee8', 'PENDING SURVEY', 'Surveyor has been assigned', '2024-08-08 11:13:29.233970'),
(48, '3d110ee8', 'PENDING CONNECTION INVOICE', 'Survey report has been submitted', '2024-08-08 11:14:08.709902'),
(49, '3c7b7459', 'PENDING SURVEY', 'Application has been submitted successfully', '2024-08-08 11:27:55.678318'),
(50, 'fa4007e6', 'PENDING SURVEY', 'Surveyor has been assigned', '2024-08-08 11:28:15.235066'),
(51, 'fa4007e6', 'PENDING CONNECTION INVOICE', 'Survey report has been submitted', '2024-08-08 11:28:56.316949');

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `Id` int(11) NOT NULL,
  `ApplicationNumber` longtext DEFAULT NULL,
  `Title` longtext NOT NULL,
  `FullName` longtext NOT NULL,
  `DateOfBirth` date NOT NULL,
  `Gender` longtext NOT NULL,
  `EmailAddress` longtext NOT NULL,
  `PhoneNumber` longtext NOT NULL,
  `IdNumber` longtext NOT NULL,
  `StateId` int(11) NOT NULL,
  `OperationAreaId` int(11) NOT NULL,
  `BranchId` int(11) NOT NULL,
  `TerritoryId` int(11) NOT NULL,
  `SubTerritoryId` int(11) NOT NULL,
  `StreetAddress` longtext NOT NULL,
  `PlotNumber` longtext NOT NULL,
  `NearestLandMark` longtext DEFAULT NULL,
  `CustomerType` int(11) NOT NULL,
  `BillDeliveryMethod` longtext NOT NULL,
  `CustomerCategoryId` int(11) NOT NULL,
  `ProofOfIdentity` longtext NOT NULL,
  `ProofOfOwnerShip` longtext NOT NULL,
  `ProofOfInstallationSite` longtext NOT NULL,
  `LocalAuthorizationDocument` longtext NOT NULL,
  `Status` longtext NOT NULL,
  `ApplicationDate` date NOT NULL DEFAULT '0001-01-01',
  `AssignedTo` int(11) DEFAULT NULL,
  `SurveyDate` date DEFAULT NULL,
  `CustomertarrifId` int(11) DEFAULT NULL,
  `BlockId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`Id`, `ApplicationNumber`, `Title`, `FullName`, `DateOfBirth`, `Gender`, `EmailAddress`, `PhoneNumber`, `IdNumber`, `StateId`, `OperationAreaId`, `BranchId`, `TerritoryId`, `SubTerritoryId`, `StreetAddress`, `PlotNumber`, `NearestLandMark`, `CustomerType`, `BillDeliveryMethod`, `CustomerCategoryId`, `ProofOfIdentity`, `ProofOfOwnerShip`, `ProofOfInstallationSite`, `LocalAuthorizationDocument`, `Status`, `ApplicationDate`, `AssignedTo`, `SurveyDate`, `CustomertarrifId`, `BlockId`) VALUES
(1, '240e1404', 'Rev', 'Nowembabazi Nickson', '2024-07-07', 'male', 'nowembabazin8@gmail.com', '0771340420', '123', 1, 9, 3, 1, 1, 'Bukoto', '12p', '12l', 1, '1', 1, 'C:\\working directory\\erpsystem\\Api\\uploads\\2c36d6cf-7870-4e9c-8d6a-9b245d2f055c.docx', 'C:\\working directory\\erpsystem\\Api\\uploads\\e9ee4024-678f-466b-acd4-a3893c3aaeda.docx', 'C:\\working directory\\erpsystem\\Api\\uploads\\8c9f0817-7c91-4673-be9d-32643022a489.jpeg', 'C:\\working directory\\erpsystem\\Api\\uploads\\8f319ce4-b5ea-40e6-b687-5454b22b2130.jpeg', 'PENDING INVOICE PAYMENT', '2024-07-07', 1, NULL, 1, 1),
(2, '83960761', 'Mrs', 'Nakito Catherine', '2024-07-08', 'male', 'ngobizadokchrist@gmail.com', '0779226226', '234234', 1, 9, 3, 1, 1, 'Busabala Close', 'erwer232', 'asdasd', 1, '1', 1, 'C:\\working directory\\erpsystem\\Api\\uploads\\3fbc2883-e8e6-44e3-a8e3-4ee174f8b28c.ico', 'C:\\working directory\\erpsystem\\Api\\uploads\\45ba66a5-6e4e-48a7-90ec-fad2141a87cd.ico', 'C:\\working directory\\erpsystem\\Api\\uploads\\1c22854b-77d5-44f1-97a2-ff691867899b.ico', 'C:\\working directory\\erpsystem\\Api\\uploads\\94439cfa-f852-408f-8c82-8548a84b6c83.ico', 'PENDING CONNECTION INVOICE', '2024-07-08', 2, NULL, NULL, NULL),
(3, '64682b2e', 'Dr', 'Cathy', '2024-07-12', 'male', 'kinyeramo@gmail.com', '0777349597', '847377473', 13, 12, 3, 1, 1, 'Hello world', '67', 'Mountain', 1, '1', 1, 'C:\\working directory\\erpsystem\\Api\\uploads\\747b0644-d7e8-45f1-82c1-cf5deed0e51d.jpg', 'C:\\working directory\\erpsystem\\Api\\uploads\\0dcdffed-e3e4-44ea-b582-15709dc66401.jpg', 'C:\\working directory\\erpsystem\\Api\\uploads\\b5a01aea-fc53-409d-9824-7a5d31ae5be6.jpg', 'C:\\working directory\\erpsystem\\Api\\uploads\\73acfefb-e2b6-48f0-b689-9d425a58a6c7.jpg', 'PENDING JOB CARD', '2024-07-15', 2, NULL, NULL, NULL),
(4, '10e86c1b', 'Mrs', 'Pearl', '2024-07-18', 'female', 'kinyeramo55@gmail.com', '0777349597', '343', 14, 12, 4, 1, 1, 'Kirinya', '12', 'Lake', 1, '1', 1, 'C:\\working directory\\erpsystem\\Api\\uploads\\eb73ad7b-dd11-47f5-9fbc-755d6f7de046.jpg', 'C:\\working directory\\erpsystem\\Api\\uploads\\7124c292-d920-4791-8c45-c64617493732.jpg', 'C:\\working directory\\erpsystem\\Api\\uploads\\5acb1ffc-ced7-456e-b3ab-7bc9289d90f1.jpg', 'C:\\working directory\\erpsystem\\Api\\uploads\\4467d50f-c4e2-4fdd-8860-5497773329af.jpg', 'PENDING CONNECTION INVOICE', '2024-07-15', 2, NULL, NULL, NULL),
(5, '3d110ee8', 'Mr', 'NGOBI DANIEL', '2024-08-08', 'male', 'ngobidaniel04@gmail.com', '0703139709', 'asd', 1, 9, 3, 1, 1, 'asd', 'asdas', 'asdsa', 1, '1', 1, 'D:\\working directory\\erpsystem\\Trace\\uploads\\aaee37dd-9000-4e54-8859-8c50827fa17e.docx', 'D:\\working directory\\erpsystem\\Trace\\uploads\\0eaade6d-f840-4d36-bd85-96a5c72ab112.docx', 'D:\\working directory\\erpsystem\\Trace\\uploads\\b16c4009-0202-4e3e-a05b-cf1230cc45bc.docx', 'D:\\working directory\\erpsystem\\Trace\\uploads\\535ecb71-a481-4a1a-8ca5-4662502c987c.docx', 'PENDING CONNECTION INVOICE', '2024-08-08', 2, NULL, NULL, NULL),
(6, 'fa4007e6', 'Mr', 'NGOBI DANIEL3', '2024-08-08', 'male', 'ngobidaniel04@gmail.com', '0703139709', 'asdas', 1, 9, 3, 1, 1, 'BUSABALA', 'asd', 'asd', 1, '1', 1, 'D:\\working directory\\erpsystem\\Trace\\uploads\\9a2f161b-07a2-400f-88cc-1a4ed0f650ff.docx', 'D:\\working directory\\erpsystem\\Trace\\uploads\\c53c7bff-e089-43fc-ba10-bcbd1687c35f.docx', 'D:\\working directory\\erpsystem\\Trace\\uploads\\9ba62ffd-f449-4ef8-a8f6-4804a579df3e.docx', 'D:\\working directory\\erpsystem\\Trace\\uploads\\a0f4eacd-192f-41dc-80a7-fdd869dbcb81.docx', 'PENDING CONNECTION INVOICE', '2024-08-08', 2, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `audittrails`
--

CREATE TABLE `audittrails` (
  `Id` int(11) NOT NULL,
  `Action` longtext NOT NULL,
  `Username` longtext NOT NULL,
  `Timestamp` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `audittrails`
--

INSERT INTO `audittrails` (`Id`, `Action`, `Username`, `Timestamp`) VALUES
(1, 'User created', 'ngobidaniel04@gmail.com', '2024-07-07 11:37:38.777104'),
(2, 'User verified', 'ngobidaniel04@gmail.com', '2024-07-07 11:38:05.505443'),
(3, 'User Password updated', 'ngobidaniel04@gmail.com', '2024-07-07 11:38:12.830509'),
(4, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-07 11:38:19.465478'),
(5, 'User details updated', 'ngobidaniel04@gmail.com', '2024-07-07 11:38:37.404353'),
(6, 'User details updated', 'ngobidaniel04@gmail.com', '2024-07-07 11:38:40.586355'),
(7, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-07 11:39:51.306037'),
(8, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-07 12:04:04.216205'),
(9, 'User created', 'kinyeramo@gmail.com', '2024-07-07 12:06:49.576084'),
(10, 'User verified', 'kinyeramo@gmail.com', '2024-07-07 12:07:04.690606'),
(11, 'User Password updated', 'kinyeramo@gmail.com', '2024-07-07 12:07:16.450600'),
(12, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-07 12:07:23.812686'),
(13, 'User details updated', 'kinyeramo@gmail.com', '2024-07-07 12:07:49.172369'),
(14, 'User details updated', 'kinyeramo@gmail.com', '2024-07-07 12:08:01.198490'),
(15, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-07 12:09:09.711610'),
(16, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-07 19:42:19.137962'),
(17, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-07 20:32:49.354195'),
(18, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-08 08:34:23.730711'),
(19, 'User role assigned', 'kinyeramo@gmail.com', '2024-07-08 08:37:48.615694'),
(20, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-08 08:38:21.743860'),
(21, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-08 08:43:42.227249'),
(22, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-08 08:50:20.431202'),
(23, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-08 08:53:08.397256'),
(24, 'User role assigned', 'ngobidaniel04@gmail.com', '2024-07-08 09:54:15.182361'),
(25, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-08 09:59:07.772240'),
(26, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-08 12:05:32.806163'),
(27, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-08 12:16:15.183287'),
(28, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-08 12:16:47.312888'),
(29, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-08 12:34:21.419135'),
(30, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-08 12:35:14.798401'),
(31, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-09 07:50:05.270090'),
(32, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-09 13:00:43.431819'),
(33, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-09 13:04:01.596452'),
(34, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-09 13:27:32.437092'),
(35, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-09 16:14:34.132518'),
(36, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-09 16:53:22.849592'),
(37, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-10 08:49:52.686159'),
(38, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-10 09:03:52.779975'),
(39, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-10 09:10:41.499088'),
(40, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-10 09:30:30.908235'),
(41, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-10 09:32:02.404231'),
(42, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-10 16:17:41.915433'),
(43, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-10 16:18:24.199665'),
(44, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-10 18:00:14.937529'),
(45, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-12 08:45:06.874205'),
(46, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-12 09:39:47.320081'),
(47, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-12 10:03:45.236900'),
(48, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-12 10:58:19.568172'),
(49, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-12 14:09:54.955084'),
(50, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-13 08:04:19.960478'),
(51, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-13 08:43:57.055074'),
(52, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-13 10:30:39.833061'),
(53, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-14 08:47:48.902321'),
(54, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-15 08:09:50.639183'),
(55, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-15 08:16:46.013153'),
(56, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-15 10:00:30.857006'),
(57, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-15 10:02:22.550894'),
(58, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-15 10:10:59.056803'),
(59, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-15 10:12:29.781705'),
(60, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-15 10:23:21.644608'),
(61, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-15 10:27:44.658052'),
(62, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-15 10:30:52.295212'),
(63, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-15 10:34:16.040496'),
(64, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-15 10:40:21.374966'),
(65, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-15 10:56:09.927888'),
(66, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-15 14:20:40.062740'),
(67, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-16 08:17:42.474819'),
(68, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-16 09:01:58.620510'),
(69, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-16 09:12:08.039917'),
(70, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-16 12:21:55.432997'),
(71, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-16 14:41:42.652029'),
(72, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-16 17:09:24.812907'),
(73, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-16 18:12:54.289032'),
(74, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-17 08:46:13.824953'),
(75, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-17 09:04:32.235854'),
(76, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-17 15:26:49.036113'),
(77, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-17 16:34:23.114924'),
(78, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-17 17:28:33.772909'),
(79, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-17 19:53:42.586478'),
(80, 'User created', 'kinyeramo24@gmail.com', '2024-07-18 08:20:47.326370'),
(81, 'User verified', 'kinyeramo24@gmail.com', '2024-07-18 08:26:16.209976'),
(82, 'User Password updated', 'kinyeramo24@gmail.com', '2024-07-18 08:26:27.241678'),
(83, 'User authenticated', 'kinyeramo24@gmail.com', '2024-07-18 08:26:40.675584'),
(84, 'User details updated', 'kinyeramo24@gmail.com', '2024-07-18 09:51:55.027918'),
(85, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-18 10:18:28.819191'),
(86, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-18 14:51:19.956734'),
(87, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-18 15:46:37.904053'),
(88, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-18 16:32:14.887985'),
(89, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-18 17:08:53.917150'),
(90, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-19 07:57:53.211118'),
(91, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-19 16:38:34.362695'),
(92, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-19 18:37:51.024437'),
(93, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-20 13:14:13.029241'),
(94, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-21 11:06:57.353748'),
(95, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-21 19:11:58.400634'),
(96, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-22 08:02:24.847947'),
(97, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-22 08:14:24.662804'),
(98, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-22 13:07:36.857573'),
(99, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-22 13:11:26.310097'),
(100, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-22 13:14:33.256032'),
(101, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-22 15:06:32.754618'),
(102, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-22 15:32:29.494359'),
(103, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-22 15:58:11.918984'),
(104, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-22 16:45:42.726286'),
(105, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-23 11:48:35.210370'),
(106, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-23 15:02:04.809014'),
(107, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-24 08:27:15.925124'),
(108, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-24 12:24:43.351711'),
(109, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-24 12:30:42.647179'),
(110, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-25 13:23:59.115048'),
(111, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-25 18:01:44.829354'),
(112, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-25 19:13:02.003258'),
(113, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-26 08:24:41.086884'),
(114, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-26 10:10:21.172416'),
(115, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-26 10:40:06.058895'),
(116, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-26 10:41:27.616834'),
(117, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-26 12:37:53.451347'),
(118, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-29 07:55:49.398902'),
(119, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-29 08:13:29.404065'),
(120, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-29 09:17:12.836609'),
(121, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-29 09:25:42.763607'),
(122, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-29 09:26:43.793722'),
(123, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-29 09:27:28.931075'),
(124, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-29 09:47:56.479697'),
(125, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-29 09:48:29.455135'),
(126, 'User created', 'ncathie214@gmail.com', '2024-07-29 15:37:52.282920'),
(127, 'User verified', 'ncathie214@gmail.com', '2024-07-29 15:38:33.007517'),
(128, 'User Password updated', 'ncathie214@gmail.com', '2024-07-29 15:38:56.200988'),
(129, 'User authenticated', 'ncathie214@gmail.com', '2024-07-29 15:39:07.996190'),
(130, 'User details updated', 'ncathie214@gmail.com', '2024-07-29 16:22:46.215200'),
(131, 'User details updated', 'ncathie214@gmail.com', '2024-07-29 16:26:42.304193'),
(132, 'User authenticated', 'ncathie214@gmail.com', '2024-07-29 16:35:35.579503'),
(133, 'User created', 'sharomtiana6@gmail.com', '2024-07-29 16:38:48.274098'),
(134, 'User verified', 'sharomtiana6@gmail.com', '2024-07-29 16:39:21.071769'),
(135, 'User Password updated', 'sharomtiana6@gmail.com', '2024-07-29 16:39:32.720379'),
(136, 'User authenticated', 'ncathie214@gmail.com', '2024-07-29 16:39:43.810515'),
(137, 'User authenticated', 'sharomtiana6@gmail.com', '2024-07-29 16:41:00.541911'),
(138, 'User details updated', 'sharomtiana6@gmail.com', '2024-07-29 16:42:00.566865'),
(139, 'User details updated', 'sharomtiana6@gmail.com', '2024-07-29 16:42:16.593611'),
(140, 'User authenticated', 'sharomtiana6@gmail.com', '2024-07-29 16:44:03.251250'),
(141, 'User authenticated', 'ncathie214@gmail.com', '2024-07-29 16:52:34.196398'),
(142, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-29 21:05:48.281370'),
(143, 'User authenticated', 'ncathie214@gmail.com', '2024-07-30 08:08:05.659127'),
(144, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-30 10:19:56.458500'),
(145, 'User authenticated', 'ncathie214@gmail.com', '2024-07-30 11:12:00.481392'),
(146, 'User authenticated', 'ncathie214@gmail.com', '2024-07-30 11:44:09.909375'),
(147, 'User authenticated', 'kinyeramo24@gmail.com', '2024-07-30 14:46:42.579222'),
(148, 'User created', 'kinyeramo24@gmail.com', '2024-07-30 14:47:36.681139'),
(149, 'User created', 'kinyeramo24@gmail.com', '2024-07-30 15:11:37.366038'),
(150, 'User created', 'kinyeramo2@gmail.com', '2024-07-30 15:15:37.121232'),
(151, 'User verified', 'kinyeramo2@gmail.com', '2024-07-30 15:16:13.844723'),
(152, 'User Password updated', 'kinyeramo2@gmail.com', '2024-07-30 15:16:22.377954'),
(153, 'User authenticated', 'kinyeramo2@gmail.com', '2024-07-30 15:16:34.223794'),
(154, 'User details updated', 'kinyeramo2@gmail.com', '2024-07-30 16:53:52.290740'),
(155, 'User authenticated', 'kinyeramo2@gmail.com', '2024-07-30 16:56:28.936821'),
(156, 'User created', 'kinyeramo25@gmail.com', '2024-07-30 16:57:08.672391'),
(157, 'User verified', 'kinyeramo25@gmail.com', '2024-07-30 16:57:36.715056'),
(158, 'User Password updated', 'kinyeramo25@gmail.com', '2024-07-30 16:57:46.525718'),
(159, 'User authenticated', 'kinyeramo25@gmail.com', '2024-07-30 16:58:04.467732'),
(160, 'User authenticated', 'kinyeramo25@gmail.com', '2024-07-30 17:04:08.998916'),
(161, 'User details updated', 'kinyeramo25@gmail.com', '2024-07-30 17:08:50.078184'),
(162, 'User created', 'kinyeramo26@gmail.com', '2024-07-30 17:49:29.806232'),
(163, 'User verified', 'kinyeramo26@gmail.com', '2024-07-30 17:50:01.182072'),
(164, 'User Password updated', 'kinyeramo26@gmail.com', '2024-07-30 17:50:10.215109'),
(165, 'User authenticated', 'kinyeramo26@gmail.com', '2024-07-30 17:50:22.353139'),
(166, 'User details updated', 'kinyeramo26@gmail.com', '2024-07-30 17:50:57.678017'),
(167, 'User created', 'kinyeramo27@gmail.com', '2024-07-30 17:52:35.956620'),
(168, 'User verified', 'kinyeramo27@gmail.com', '2024-07-30 17:53:14.716453'),
(169, 'User Password updated', 'kinyeramo27@gmail.com', '2024-07-30 17:53:23.597905'),
(170, 'User authenticated', 'kinyeramo27@gmail.com', '2024-07-30 17:53:36.826474'),
(171, 'User details updated', 'kinyeramo27@gmail.com', '2024-07-30 17:54:59.010226'),
(172, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-30 18:31:02.279916'),
(173, 'User created', 'kinyeramo28@gmail.com', '2024-07-30 18:31:21.397360'),
(174, 'User verified', 'kinyeramo28@gmail.com', '2024-07-30 18:32:19.016808'),
(175, 'User Password updated', 'kinyeramo28@gmail.com', '2024-07-30 18:32:27.811805'),
(176, 'User authenticated', 'kinyeramo28@gmail.com', '2024-07-30 18:32:38.123382'),
(177, 'User details updated', 'kinyeramo28@gmail.com', '2024-07-30 19:11:52.020180'),
(178, 'User details updated', 'kinyeramo28@gmail.com', '2024-07-30 20:29:18.121655'),
(179, 'User details updated', 'kinyeramo28@gmail.com', '2024-07-30 20:50:58.366105'),
(180, 'User details updated', 'kinyeramo28@gmail.com', '2024-07-30 20:56:56.782221'),
(181, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-30 21:04:32.788163'),
(182, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-31 08:46:06.436324'),
(183, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-31 09:40:00.109892'),
(184, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-31 09:48:46.005073'),
(185, 'User authenticated', 'kinyeramo@gmail.com', '2024-07-31 10:03:58.305153'),
(186, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-07-31 15:24:52.800708'),
(187, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-08-08 11:12:20.821459'),
(188, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-08-08 11:15:50.016411'),
(189, 'User authenticated', 'ngobidaniel04@gmail.com', '2024-08-08 11:27:10.408737');

-- --------------------------------------------------------

--
-- Table structure for table `billadjustmentrequests`
--

CREATE TABLE `billadjustmentrequests` (
  `Id` int(11) NOT NULL,
  `CustRef` longtext NOT NULL,
  `DocumentNumber` longtext NOT NULL,
  `AdjustmentType` longtext NOT NULL,
  `AdjustmentReason` longtext NOT NULL,
  `AdjustmentStatus` longtext NOT NULL,
  `EvidenceFilePath` longtext NOT NULL,
  `TransactionCode` int(11) NOT NULL,
  `EffectiveDate` datetime(6) NOT NULL,
  `Amount` decimal(65,30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `billadjustmentrequests`
--

INSERT INTO `billadjustmentrequests` (`Id`, `CustRef`, `DocumentNumber`, `AdjustmentType`, `AdjustmentReason`, `AdjustmentStatus`, `EvidenceFilePath`, `TransactionCode`, `EffectiveDate`, `Amount`) VALUES
(4, 'F15A47ED', '940392', '+', 'Adjustment Reason', 'PENDING', 'C:\\working directory\\erpsystem\\Api\\uploads\\9a9fbff6-cf81-4ca3-beb7-1323dd8a37f3.pdf', 1, '0001-01-01 00:00:00.000000', 400.000000000000000000000000000000),
(5, 'F15A47ED', '940392', '+', 'Adjustment Reason', 'PENDING', 'C:\\working directory\\erpsystem\\Api\\uploads\\39a5a31f-f6e5-4bd0-8777-ad3e4f72d1d7.pdf', 1, '0001-01-01 00:00:00.000000', 400.000000000000000000000000000000),
(6, 'F15A47ED', '940392', '+', 'Adjustment Reason', 'PENDING', 'C:\\working directory\\erpsystem\\Api\\uploads\\83d0b6a8-b76a-40a4-b38c-d306a04d9de8.pdf', 1, '0001-01-01 00:00:00.000000', 400.000000000000000000000000000000),
(7, 'F15A47ED', 'qweqw', '+', 'sadasd', 'PENDING', 'C:\\working directory\\erpsystem\\Api\\uploads\\c18f0eef-6123-419a-b334-4a28f4041d23.pdf', 1, '0001-01-01 00:00:00.000000', 600.000000000000000000000000000000);

-- --------------------------------------------------------

--
-- Table structure for table `billdeliverymethods`
--

CREATE TABLE `billdeliverymethods` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `billdeliverymethods`
--

INSERT INTO `billdeliverymethods` (`Id`, `Name`) VALUES
(1, 'Email');

-- --------------------------------------------------------

--
-- Table structure for table `billingcustomers`
--

CREATE TABLE `billingcustomers` (
  `Id` int(11) NOT NULL,
  `CustomerRef` longtext NOT NULL,
  `ApplicationId` int(11) NOT NULL,
  `TarrifId` int(11) NOT NULL,
  `DateConnected` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `billingcustomers`
--

INSERT INTO `billingcustomers` (`Id`, `CustomerRef`, `ApplicationId`, `TarrifId`, `DateConnected`) VALUES
(1, 'F15A47ED', 1, 1, '0001-01-01 00:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `billingperiod`
--

CREATE TABLE `billingperiod` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `StartDate` datetime(6) NOT NULL,
  `EndDate` datetime(6) NOT NULL,
  `IsCompleted` tinyint(1) NOT NULL,
  `Active` tinyint(1) NOT NULL,
  `Period` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `billingperiod`
--

INSERT INTO `billingperiod` (`Id`, `Name`, `StartDate`, `EndDate`, `IsCompleted`, `Active`, `Period`) VALUES
(1, 'string', '2024-07-09 08:39:45.697000', '2024-07-09 08:39:45.697000', 0, 0, ''),
(2, 'string', '2024-07-24 21:00:00.000000', '2024-07-24 21:00:00.000000', 0, 0, ''),
(3, 'string', '2024-07-30 21:00:00.000000', '2024-07-22 21:00:00.000000', 0, 0, ''),
(4, 'Lagos', '2024-07-16 21:00:00.000000', '2024-07-22 21:00:00.000000', 0, 0, ''),
(5, 'Ibadan', '2024-07-24 21:00:00.000000', '2024-07-23 21:00:00.000000', 0, 0, ''),
(6, 'Ibadan', '2024-07-23 21:00:00.000000', '2024-07-23 21:00:00.000000', 0, 0, ''),
(7, 'Abuja', '2024-07-30 21:00:00.000000', '2024-07-30 21:00:00.000000', 0, 0, ''),
(8, 'Ibadan', '2024-07-16 21:00:00.000000', '2024-07-29 21:00:00.000000', 0, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `billingrequests`
--

CREATE TABLE `billingrequests` (
  `Id` int(11) NOT NULL,
  `OperationAreaId` int(11) NOT NULL,
  `BranchId` int(11) NOT NULL,
  `BillingPeriodId` int(11) NOT NULL,
  `ScheduledBillingDate` date NOT NULL,
  `Biller` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `Id` int(11) NOT NULL,
  `BillDate` datetime(6) NOT NULL,
  `DueDate` datetime(6) NOT NULL,
  `BillNo` longtext NOT NULL,
  `TotalAmount` decimal(65,30) DEFAULT NULL,
  `Status` longtext NOT NULL,
  `Narration` longtext DEFAULT NULL,
  `Type` longtext NOT NULL,
  `VendorId` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `billtranitems`
--

CREATE TABLE `billtranitems` (
  `Id` int(11) NOT NULL,
  `AccountId` int(11) NOT NULL,
  `Description` longtext NOT NULL,
  `Amount` decimal(65,30) NOT NULL,
  `BillId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `Id` int(11) NOT NULL,
  `BlockName` longtext NOT NULL,
  `BlockCode` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blocks`
--

INSERT INTO `blocks` (`Id`, `BlockName`, `BlockCode`) VALUES
(1, 'mbarara', '123'),
(2, 'lumumba', '11');

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `OperationAreaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`Id`, `Name`, `OperationAreaId`) VALUES
(3, 'test branch', 12),
(4, 'test branch', 13);

-- --------------------------------------------------------

--
-- Table structure for table `bulkreadings`
--

CREATE TABLE `bulkreadings` (
  `Id` int(11) NOT NULL,
  `OperationAreaId` int(11) NOT NULL,
  `BranchId` int(11) NOT NULL,
  `BillingCycleId` int(11) NOT NULL,
  `ReadingDate` datetime(6) NOT NULL,
  `MeterReaderId` int(11) NOT NULL,
  `filelocation` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customerbills`
--

CREATE TABLE `customerbills` (
  `CustomerBillId` int(11) NOT NULL,
  `CustomerId` int(11) NOT NULL,
  `BillDate` datetime(6) NOT NULL,
  `BillPeriod` int(11) NOT NULL,
  `PreviousReading` int(11) NOT NULL,
  `CurrentReading` int(11) NOT NULL,
  `consuption` int(11) NOT NULL,
  `TotalBillAmount` decimal(65,30) NOT NULL,
  `TotalAmountPaid` decimal(65,30) NOT NULL,
  `DueAmount` decimal(65,30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customercategories`
--

CREATE TABLE `customercategories` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customercategories`
--

INSERT INTO `customercategories` (`Id`, `Name`) VALUES
(1, 'commercial');

-- --------------------------------------------------------

--
-- Table structure for table `customertarrifs`
--

CREATE TABLE `customertarrifs` (
  `Id` int(11) NOT NULL,
  `TarrifName` longtext NOT NULL,
  `TarrifDescription` longtext NOT NULL,
  `TarrifAmount` decimal(65,30) NOT NULL,
  `CreatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customertarrifs`
--

INSERT INTO `customertarrifs` (`Id`, `TarrifName`, `TarrifDescription`, `TarrifAmount`, `CreatedAt`) VALUES
(1, 'Water', 'Please pay', 5000.000000000000000000000000000000, '2024-07-07 20:26:24.761905');

-- --------------------------------------------------------

--
-- Table structure for table `customertypes`
--

CREATE TABLE `customertypes` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customertypes`
--

INSERT INTO `customertypes` (`Id`, `Name`) VALUES
(1, 'flat');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `Active` tinyint(1) NOT NULL,
  `Description` longtext NOT NULL,
  `HeadDepactId` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`Id`, `Name`, `Active`, `Description`, `HeadDepactId`) VALUES
(1, 'Test Department', 1, '', 0),
(2, 'finance1', 1, 'finances by pearl', 1),
(3, 'Tech', 1, 'Software development', 2),
(4, 'Ben', 1, 'Avenger', 2),
(5, 'Amos', 1, 'hey', 2),
(6, 'Technical', 1, 'Technical Department', 1),
(7, 'Commercial', 1, 'Commercial Department', 2),
(8, 'BD TEAM', 1, 'DEVELOPMENT', 3),
(9, 'Nowembabazi Nickson', 1, 'IT', 2),
(10, 'IT Department', 1, 'Handles IT issues', 3);

-- --------------------------------------------------------

--
-- Table structure for table `docketinitiations`
--

CREATE TABLE `docketinitiations` (
  `Id` int(11) NOT NULL,
  `ApplicationId` int(11) NOT NULL,
  `CustomerRef` longtext NOT NULL,
  `MeterNumber` longtext NOT NULL,
  `BlockNumber` longtext DEFAULT NULL,
  `MeterType` longtext NOT NULL,
  `MeterSize` longtext DEFAULT NULL,
  `LocationCordinates` longtext DEFAULT NULL,
  `InitialReading` longtext DEFAULT NULL,
  `Dials` longtext DEFAULT NULL,
  `MeterManufactureDate` date NOT NULL,
  `DateOfInstallation` date NOT NULL,
  `InstalledBy` int(11) NOT NULL,
  `Remarks` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `docketinitiations`
--

INSERT INTO `docketinitiations` (`Id`, `ApplicationId`, `CustomerRef`, `MeterNumber`, `BlockNumber`, `MeterType`, `MeterSize`, `LocationCordinates`, `InitialReading`, `Dials`, `MeterManufactureDate`, `DateOfInstallation`, `InstalledBy`, `Remarks`) VALUES
(1, 1, 'F15A47ED', '299929883', '84727288919', 'type2', '388278282', 'Kampala', '60', '87', '2024-07-08', '0001-01-01', 1, 'Remarks');

-- --------------------------------------------------------

--
-- Table structure for table `escalationmatrices`
--

CREATE TABLE `escalationmatrices` (
  `Id` int(11) NOT NULL,
  `DepartmentId` int(11) NOT NULL,
  `EscalationTime` time(6) NOT NULL,
  `LevelDescription` longtext NOT NULL,
  `LevelName` longtext NOT NULL,
  `PriorityId` int(11) NOT NULL DEFAULT 0,
  `TicketCategoryId` int(11) NOT NULL DEFAULT 0,
  `DepartmentLevel` int(11) NOT NULL DEFAULT 0,
  `EmailTemplate` longtext NOT NULL,
  `NotificationType` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `escalationmatrices`
--

INSERT INTO `escalationmatrices` (`Id`, `DepartmentId`, `EscalationTime`, `LevelDescription`, `LevelName`, `PriorityId`, `TicketCategoryId`, `DepartmentLevel`, `EmailTemplate`, `NotificationType`) VALUES
(9, 2, '02:00:00.000000', 'traceCorp', 'nickson', 6, 3, 3, 'tech hello', 'sms'),
(10, 3, '02:00:00.000000', 'Email Template', 'Email Template', 7, 2, 2, 'Email Template', 'email'),
(11, 7, '02:00:00.000000', 'cathy', 'cath', 7, 3, 4, 'hey hey', 'email'),
(12, 4, '02:00:00.000000', 'tete', 'test', 7, 3, 4, 'ngobidaniel04@gmail.com', 'sms'),
(13, 7, '05:00:00.000000', 'Executive escalation for high-priority unresolved cases', 'Level 5', 10, 6, 8, 'sfdghjkl.,mnbvcghjkk dfghlkjcvj ', 'email'),
(14, 3, '04:04:04.000000', 'cathy-ben', 'Cathy', 6, 3, 8, 'cathyyyy', 'email');

-- --------------------------------------------------------

--
-- Table structure for table `groupaccounts`
--

CREATE TABLE `groupaccounts` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `Behaviour` longtext NOT NULL,
  `Description` longtext NOT NULL,
  `GroupCode` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groupaccounts`
--

INSERT INTO `groupaccounts` (`Id`, `Name`, `Behaviour`, `Description`, `GroupCode`) VALUES
(1, 'Assets', 'Debit', 'assets', NULL),
(2, 'Expenses', 'Debit', 'expenses', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invitedusers`
--

CREATE TABLE `invitedusers` (
  `Id` int(11) NOT NULL,
  `Email` longtext NOT NULL,
  `OrganisationId` int(11) NOT NULL,
  `RoleId` int(11) NOT NULL,
  `Registered` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invitedusers`
--

INSERT INTO `invitedusers` (`Id`, `Email`, `OrganisationId`, `RoleId`, `Registered`) VALUES
(1, 'kinyeramo24@gmail.com', 1, 2, 0),
(2, 'ncathie214@gmail.com', 1, 1, 0),
(3, 'mnakayiza@gmail.com', 1, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `jobcards`
--

CREATE TABLE `jobcards` (
  `Id` int(11) NOT NULL,
  `JobCardNumber` longtext NOT NULL,
  `applicationId` int(11) NOT NULL,
  `AssignedUserId` int(11) NOT NULL,
  `JobCardType` longtext NOT NULL,
  `Status` longtext NOT NULL,
  `CreationDate` datetime(6) NOT NULL,
  `DateUpdated` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobcards`
--

INSERT INTO `jobcards` (`Id`, `JobCardNumber`, `applicationId`, `AssignedUserId`, `JobCardType`, `Status`, `CreationDate`, `DateUpdated`) VALUES
(1, '2fe32b2f', 1, 2, 'SURVEY', 'PENDING', '2024-07-07 19:42:30.641899', '2024-07-07 19:42:30.641926'),
(2, 'fe9461ef', 2, 1, 'SURVEY', 'PENDING', '2024-07-08 08:38:52.032824', '2024-07-08 08:38:52.032850'),
(3, 'a3b61fbb', 3, 2, 'SURVEY', 'PENDING', '2024-07-15 17:17:10.354468', '2024-07-15 17:17:10.354496'),
(4, '15705a20', 4, 2, 'SURVEY', 'PENDING', '2024-07-15 17:22:06.798070', '2024-07-15 17:22:06.798071'),
(5, 'a76dcdc0', 5, 1, 'SURVEY', 'PENDING', '2024-08-08 11:13:37.879643', '2024-08-08 11:13:37.879805'),
(6, '8e939dd6', 6, 1, 'SURVEY', 'PENDING', '2024-08-08 11:28:22.976157', '2024-08-08 11:28:22.976159');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `MaterialId` int(11) NOT NULL,
  `MaterialName` longtext NOT NULL,
  `MaterialUnitPrice` decimal(65,30) NOT NULL,
  `UnitOfMeasure` longtext NOT NULL,
  `MaterialDescription` longtext DEFAULT NULL,
  `Invoiceable` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`MaterialId`, `MaterialName`, `MaterialUnitPrice`, `UnitOfMeasure`, `MaterialDescription`, `Invoiceable`) VALUES
(1, 'Test 1', 8000.000000000000000000000000000000, '20', 'Test 25', 1),
(2, 'Pipes', 500.000000000000000000000000000000, '1kg', 'pipes', 1);

-- --------------------------------------------------------

--
-- Table structure for table `metermakes`
--

CREATE TABLE `metermakes` (
  `Id` int(11) NOT NULL,
  `Make` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metermakes`
--

INSERT INTO `metermakes` (`Id`, `Make`) VALUES
(1, 'plastic');

-- --------------------------------------------------------

--
-- Table structure for table `meterreadings`
--

CREATE TABLE `meterreadings` (
  `Id` int(11) NOT NULL,
  `MeterNo` int(11) NOT NULL,
  `CustomerRef` longtext NOT NULL,
  `ReadingDate` datetime(6) NOT NULL,
  `Reading` int(11) NOT NULL,
  `ReadingType` int(11) NOT NULL,
  `ReadingStatus` longtext NOT NULL,
  `ReadingSource` longtext NOT NULL,
  `ReadingReason` longtext NOT NULL,
  `ReadingBy` int(11) NOT NULL,
  `Consumption` int(11) NOT NULL DEFAULT 0,
  `IsBilled` tinyint(1) NOT NULL DEFAULT 0,
  `IsMeterReset` tinyint(1) NOT NULL DEFAULT 0,
  `PreviousReading` int(11) NOT NULL DEFAULT 0,
  `PreviousReadingDate` date NOT NULL DEFAULT '0001-01-01',
  `Active` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meterreadings`
--

INSERT INTO `meterreadings` (`Id`, `MeterNo`, `CustomerRef`, `ReadingDate`, `Reading`, `ReadingType`, `ReadingStatus`, `ReadingSource`, `ReadingReason`, `ReadingBy`, `Consumption`, `IsBilled`, `IsMeterReset`, `PreviousReading`, `PreviousReadingDate`, `Active`) VALUES
(1, 299929883, 'F15A47ED', '0001-01-01 00:00:00.000000', 60, 0, 'Normal', 'ACTUAL', 'INITIAL', 1, 0, 0, 0, 0, '0001-01-01', 1);

-- --------------------------------------------------------

--
-- Table structure for table `metersizes`
--

CREATE TABLE `metersizes` (
  `Id` int(11) NOT NULL,
  `Size` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metersizes`
--

INSERT INTO `metersizes` (`Id`, `Size`) VALUES
(1, '4');

-- --------------------------------------------------------

--
-- Table structure for table `metertypes`
--

CREATE TABLE `metertypes` (
  `Id` int(11) NOT NULL,
  `MeterType` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metertypes`
--

INSERT INTO `metertypes` (`Id`, `MeterType`) VALUES
(1, 'type 1');

-- --------------------------------------------------------

--
-- Table structure for table `newconnectioninvoicematerials`
--

CREATE TABLE `newconnectioninvoicematerials` (
  `Id` int(11) NOT NULL,
  `NewConnectionInvoiceId` int(11) NOT NULL,
  `MaterialId` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` decimal(65,30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `newconnectioninvoicematerials`
--

INSERT INTO `newconnectioninvoicematerials` (`Id`, `NewConnectionInvoiceId`, `MaterialId`, `Quantity`, `Price`) VALUES
(1, 1, 1, 500, 4000000.000000000000000000000000000000);

-- --------------------------------------------------------

--
-- Table structure for table `newconnectioninvoices`
--

CREATE TABLE `newconnectioninvoices` (
  `Id` int(11) NOT NULL,
  `InvoiceNumber` longtext NOT NULL,
  `ApplicationId` int(11) NOT NULL,
  `InvoiceDate` datetime(6) NOT NULL,
  `Status` longtext NOT NULL,
  `PaymentDate` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `newconnectioninvoices`
--

INSERT INTO `newconnectioninvoices` (`Id`, `InvoiceNumber`, `ApplicationId`, `InvoiceDate`, `Status`, `PaymentDate`) VALUES
(1, 'f9b396d0', 1, '2024-07-07 20:52:26.441000', 'PENDING PAYMENT', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `newmeterservicings`
--

CREATE TABLE `newmeterservicings` (
  `Id` int(11) NOT NULL,
  `CustomerRef` longtext NOT NULL,
  `MeterNo` longtext NOT NULL,
  `MeterSizeId` int(11) DEFAULT NULL,
  `MeterTypeId` int(11) DEFAULT NULL,
  `Dials` longtext DEFAULT NULL,
  `ManufactureDate` date DEFAULT NULL,
  `MeterlifeDuration` longtext DEFAULT NULL,
  `InitialReading` int(11) NOT NULL,
  `DateOfInstallation` date NOT NULL,
  `InstalledBy` int(11) NOT NULL,
  `MeterMakeId` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `newmeterservicings`
--

INSERT INTO `newmeterservicings` (`Id`, `CustomerRef`, `MeterNo`, `MeterSizeId`, `MeterTypeId`, `Dials`, `ManufactureDate`, `MeterlifeDuration`, `InitialReading`, `DateOfInstallation`, `InstalledBy`, `MeterMakeId`) VALUES
(1, 'F15A47ED', '11', 1, 1, '11', '2024-07-12', '11', 11, '2024-07-12', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `operationareas`
--

CREATE TABLE `operationareas` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `StateId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `operationareas`
--

INSERT INTO `operationareas` (`Id`, `Name`, `StateId`) VALUES
(9, 'test test', 1),
(12, 'test test', 13),
(13, 'test test', 14);

-- --------------------------------------------------------

--
-- Table structure for table `organisations`
--

CREATE TABLE `organisations` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `CountryOfOperation` longtext DEFAULT NULL,
  `Logo` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organisations`
--

INSERT INTO `organisations` (`Id`, `Name`, `CountryOfOperation`, `Logo`) VALUES
(1, 'undefined', 'undefined', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `Id` int(11) NOT NULL,
  `CustomerRef` longtext NOT NULL,
  `PaymntReference` longtext NOT NULL,
  `Vendor` longtext NOT NULL,
  `Amount` decimal(65,30) NOT NULL,
  `PaymentDate` datetime(6) NOT NULL,
  `PaymentMethod` longtext NOT NULL,
  `Narration` longtext NOT NULL,
  `CustomerName` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `priorities`
--

CREATE TABLE `priorities` (
  `Id` int(11) NOT NULL,
  `PriorityName` longtext NOT NULL,
  `ColorCode` longtext NOT NULL,
  `PriorityDescription` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `priorities`
--

INSERT INTO `priorities` (`Id`, `PriorityName`, `ColorCode`, `PriorityDescription`) VALUES
(6, 'Medium', 'Red', 'Not so urgent'),
(7, 'Level One', 'Yellow', 'normal '),
(9, 'Level Three', 'Red', 'High priority'),
(10, 'High', 'Red', 'Very important');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `Description` longtext DEFAULT NULL,
  `Category` longtext NOT NULL,
  `Rate` double NOT NULL,
  `AccountId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`Id`, `Name`) VALUES
(1, 'Finance'),
(2, 'Surveyor'),
(3, 'Meter Reader'),
(4, 'Plumber');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`Id`, `Name`) VALUES
(1, 'test tste'),
(9, 'state test'),
(13, 'test tste'),
(14, 'test tste');

-- --------------------------------------------------------

--
-- Table structure for table `subgroupaccounts`
--

CREATE TABLE `subgroupaccounts` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `Description` longtext NOT NULL,
  `GroupId` int(11) NOT NULL,
  `DateCreated` datetime(6) DEFAULT NULL,
  `SubGroupCode` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subgroupaccounts`
--

INSERT INTO `subgroupaccounts` (`Id`, `Name`, `Description`, `GroupId`, `DateCreated`, `SubGroupCode`) VALUES
(1, 'Fixed Assets', 'asdasd', 1, '2024-07-22 16:54:22.933668', NULL),
(2, 'Stock', 'stock', 1, NULL, NULL),
(3, 'Ofiice Expenses', 'office expenses', 2, '2024-07-22 17:03:13.103955', NULL),
(4, 'Cash at hand', 'all cash at hand', 1, '2024-07-22 17:04:00.991162', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subterritories`
--

CREATE TABLE `subterritories` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `TerritoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subterritories`
--

INSERT INTO `subterritories` (`Id`, `Name`, `TerritoryId`) VALUES
(1, 'Test 20', 0);

-- --------------------------------------------------------

--
-- Table structure for table `surveyreports`
--

CREATE TABLE `surveyreports` (
  `Id` int(11) NOT NULL,
  `SurveyorId` int(11) NOT NULL,
  `ApplicationId` int(11) NOT NULL,
  `DistanceFromMain` longtext DEFAULT NULL,
  `LandType` longtext DEFAULT NULL,
  `Obstractions` longtext DEFAULT NULL,
  `MainLineDetails` longtext DEFAULT NULL,
  `ServicePipeSize` longtext DEFAULT NULL,
  `ServicePipeLength` longtext DEFAULT NULL,
  `IdealConnectionType` longtext DEFAULT NULL,
  `ServicePipeMaterial` longtext DEFAULT NULL,
  `ExistingMainSize` longtext DEFAULT NULL,
  `ServicePipeDepth` longtext DEFAULT NULL,
  `ConnectionFromExistingServicePipe` longtext DEFAULT NULL,
  `ExistingConnections` longtext DEFAULT NULL,
  `BlocMapNumber` longtext DEFAULT NULL,
  `NearByCustomer` longtext DEFAULT NULL,
  `DistanceToConnectionPoint` longtext DEFAULT NULL,
  `ConnectionMainDetails` longtext DEFAULT NULL,
  `RoadInformation` longtext DEFAULT NULL,
  `Recommendation` longtext DEFAULT NULL,
  `DateCreated` datetime(6) NOT NULL,
  `DateUpdated` datetime(6) DEFAULT NULL,
  `SurveryReportFile` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `surveyreports`
--

INSERT INTO `surveyreports` (`Id`, `SurveyorId`, `ApplicationId`, `DistanceFromMain`, `LandType`, `Obstractions`, `MainLineDetails`, `ServicePipeSize`, `ServicePipeLength`, `IdealConnectionType`, `ServicePipeMaterial`, `ExistingMainSize`, `ServicePipeDepth`, `ConnectionFromExistingServicePipe`, `ExistingConnections`, `BlocMapNumber`, `NearByCustomer`, `DistanceToConnectionPoint`, `ConnectionMainDetails`, `RoadInformation`, `Recommendation`, `DateCreated`, `DateUpdated`, `SurveryReportFile`) VALUES
(1, 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-07 19:43:53.032785', NULL, 'C:\\working directory\\erpsystem\\Api\\uploads\\00a4b7bf-74d9-491c-b9f3-a6b99bb723eb.png'),
(2, 2, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-08 08:39:33.272636', NULL, 'C:\\working directory\\erpsystem\\Api\\uploads\\3e3da309-702d-439f-8f8a-185f50a74331.ico'),
(3, 2, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-15 17:23:55.383619', NULL, 'C:\\working directory\\erpsystem\\Api\\uploads\\dcf39860-9642-49e3-aef1-b22542fa6caa.jpg'),
(4, 2, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-08 11:14:08.629157', NULL, 'D:\\working directory\\erpsystem\\Trace\\uploads\\5ac647a3-6129-42d0-8d6b-fbc51a2657e8.docx'),
(5, 2, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-08 11:28:56.266261', NULL, 'D:\\working directory\\erpsystem\\Trace\\uploads\\b3194b30-832e-4a5c-9d12-b3a8ccb368e1.docx');

-- --------------------------------------------------------

--
-- Table structure for table `territories`
--

CREATE TABLE `territories` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `BranchId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `territories`
--

INSERT INTO `territories` (`Id`, `Name`, `BranchId`) VALUES
(1, 'test-territory', 4);

-- --------------------------------------------------------

--
-- Table structure for table `ticketaudittrails`
--

CREATE TABLE `ticketaudittrails` (
  `Id` int(11) NOT NULL,
  `TicketId` int(11) NOT NULL,
  `Status` longtext NOT NULL,
  `AssignedTo` int(11) NOT NULL,
  `ReasonOfEscalation` longtext NOT NULL,
  `RecordedBy` longtext NOT NULL,
  `RecordedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticketaudittrails`
--

INSERT INTO `ticketaudittrails` (`Id`, `TicketId`, `Status`, `AssignedTo`, `ReasonOfEscalation`, `RecordedBy`, `RecordedAt`) VALUES
(1, 0, 'Created', 1, 'Normal', 'sdfsdf', '2024-07-23 12:50:07.270148'),
(2, 0, 'Created', 1, 'Normal', 'sdfsdf', '2024-07-23 13:11:11.135684'),
(3, 0, 'Created', 1, 'Normal', 'sdfsdf', '2024-07-23 14:56:02.563847'),
(4, 0, 'Created', 1, 'Normal', 'sdfsdf', '2024-07-23 14:57:46.511470'),
(5, 1, 'Escalated', 3, 'Comments\n', 'Kinyera Amos', '2024-07-24 12:16:20.539980'),
(6, 3, 'Resolved', 1, 'Resolution Summary\r\n', 'Kinyera Amos', '2024-07-24 20:49:51.064532'),
(7, 0, 'Created', 1, 'Normal', 'sdfsdf', '2024-07-25 13:04:12.861575'),
(8, 0, 'Created', 1, 'Normal', 'sdfsdf', '2024-07-25 13:20:18.933831'),
(9, 0, 'Created', 1, 'Normal', 'Kinyera Amos', '2024-07-25 13:28:33.960084'),
(10, 0, 'Created', 1, 'Normal', 'Kinyera Amos', '2024-07-25 13:47:05.778443'),
(11, 0, 'Created', 1, 'Normal', 'Kinyera Amos', '2024-07-25 14:26:04.306611'),
(12, 0, 'Created', 3, 'Normal', 'Kinyera Amos', '2024-07-26 16:36:39.161583'),
(13, 0, 'Created', 2, 'Normal', 'Kinyera Amos', '2024-07-29 08:03:51.287598'),
(14, 0, 'Created', 3, 'Normal', 'Kinyera Amos', '2024-07-29 08:13:45.349330'),
(15, 10, 'Escalated', 6, 'Please work on this', 'Catherine Nakitto', '2024-07-30 11:19:36.251065'),
(16, 0, 'Created', 3, 'Normal', 'Kinyera Amos', '2024-07-31 09:14:19.520660'),
(17, 0, 'Created', 3, 'Normal', 'Kinyera Amos', '2024-07-31 09:20:18.317501'),
(18, 0, 'Created', 3, 'Normal', 'Kinyera Amos', '2024-07-31 09:22:38.199588');

-- --------------------------------------------------------

--
-- Table structure for table `ticketcategories`
--

CREATE TABLE `ticketcategories` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `DepartmentId` int(11) NOT NULL,
  `Description` longtext NOT NULL,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticketcategories`
--

INSERT INTO `ticketcategories` (`Id`, `Name`, `DepartmentId`, `Description`, `IsDeleted`) VALUES
(2, 'Test Category 1', 3, 'getete', 0),
(3, 'Category Name', 2, 'Category Name\n', 0),
(4, 'Category Name', 2, 'Category Name\n', 0),
(5, 'Category Name', 2, 'Category Name\n', 0),
(6, 'test 50', 2, 'test 50', 0),
(7, 'Test 3009999', 2, 'Test 300', 0),
(8, 'Category Name', 4, 'Category Name\n', 0),
(9, 'Category Name23', 3, 'Category Name 44\n', 0),
(10, 'Category Name23', 4, 'Category Name 44\n', 0),
(11, 'Burst', 6, 'test 1234', 0),
(12, 'Hello Category', 6, 'gehehehe', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `Id` int(11) NOT NULL,
  `CustomerType` longtext NOT NULL,
  `CustomerRef` longtext DEFAULT NULL,
  `CustomerName` longtext NOT NULL,
  `OperationAreaId` int(11) NOT NULL,
  `BranchId` int(11) NOT NULL,
  `TerritoryId` int(11) NOT NULL,
  `PhoneNumber` longtext NOT NULL,
  `Address` longtext NOT NULL,
  `ComplaintSubject` longtext NOT NULL,
  `TicketCategoryId` int(11) NOT NULL,
  `TicketSource` longtext NOT NULL,
  `PriorityId` int(11) NOT NULL,
  `Description` longtext NOT NULL,
  `Status` longtext NOT NULL,
  `CreationDate` datetime(6) NOT NULL,
  `EscalationMatrixId` int(11) NOT NULL,
  `AssignedTo` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`Id`, `CustomerType`, `CustomerRef`, `CustomerName`, `OperationAreaId`, `BranchId`, `TerritoryId`, `PhoneNumber`, `Address`, `ComplaintSubject`, `TicketCategoryId`, `TicketSource`, `PriorityId`, `Description`, `Status`, `CreationDate`, `EscalationMatrixId`, `AssignedTo`) VALUES
(10, 'Registered', 'test', 'Email Template', 9, 3, 1, '0777349597', 'Kampala kirinya Uganda1', 'Email Template1', 2, 'Phone Call', 7, 'Email Template\n', 'Escalated', '2024-07-26 16:36:39.121129', 10, 2),
(11, 'Registered', 'test', 'Kinyera Amos', 9, 3, 1, '0777349597', 'Kampala kirinya Uganda', 'Test', 3, 'Phone Call', 6, 'Description', 'Open', '2024-07-29 08:03:51.270330', 9, 2),
(12, 'Non Registered', '', 'Kinyera Amos', 9, 3, 1, '0777349597', 'Kampala kirinya Uganda', 'fetchTickets', 2, 'walk-in', 7, 'fetchTickets', 'Open', '2024-07-29 08:13:45.349159', 10, 3),
(13, 'Non Registered', '', 'Kinyera Amos', 9, 3, 1, '0777349597', 'Kampala kirinya Uganda', 'Test', 2, 'Phone Call', 7, 'Description', 'Open', '2024-07-31 09:14:19.483211', 10, 3),
(14, 'Non Registered', '', 'FULL-STACK DEVELOPER', 13, 4, 1, '0777349597', 'Gulu', 'Ticket Subject', 2, 'walk-in', 7, 'Ticket Subject\n', 'Open', '2024-07-31 09:20:18.316487', 10, 3),
(15, 'Registered', 'Test', 'Kinyera Amos', 12, 3, 1, '0777349597', 'Kampala kirinya Uganda', 'Ticket Subject', 2, 'walk-in', 7, 'Ticket Subject\n', 'Open', '2024-07-31 09:22:38.199459', 10, 3);

-- --------------------------------------------------------

--
-- Table structure for table `transactioncodes`
--

CREATE TABLE `transactioncodes` (
  `Id` int(11) NOT NULL,
  `TransactionCode` longtext NOT NULL,
  `Description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactioncodes`
--

INSERT INTO `transactioncodes` (`Id`, `TransactionCode`, `Description`) VALUES
(1, 'BILL-ADJ', 'For bill adjustment');

-- --------------------------------------------------------

--
-- Table structure for table `transactionentries`
--

CREATE TABLE `transactionentries` (
  `Id` int(11) NOT NULL,
  `TranAccount` int(11) NOT NULL,
  `TransactionType` longtext NOT NULL,
  `Amount` decimal(65,30) NOT NULL,
  `TransactionDate` datetime(6) NOT NULL,
  `TransactionReference` longtext NOT NULL,
  `Narration` longtext NOT NULL,
  `RecordDate` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactionentries`
--

INSERT INTO `transactionentries` (`Id`, `TranAccount`, `TransactionType`, `Amount`, `TransactionDate`, `TransactionReference`, `Narration`, `RecordDate`) VALUES
(1, 1, 'Credit', 300000.000000000000000000000000000000, '2024-07-22 00:00:00.000000', 'Balance B/f', 'Balance B/f', '0001-01-01 00:00:00.000000'),
(2, 2, 'Credit', 0.000000000000000000000000000000, '2024-07-22 00:00:00.000000', 'Balance B/f', 'Balance B/f', '0001-01-01 00:00:00.000000'),
(3, 3, 'Credit', 200000.000000000000000000000000000000, '2024-07-22 00:00:00.000000', 'Balance B/f', 'Balance B/f', '0001-01-01 00:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `Title` longtext DEFAULT NULL,
  `FullName` longtext NOT NULL,
  `ProfilePic` longtext DEFAULT NULL,
  `PasswordHash` longtext DEFAULT NULL,
  `Email` longtext NOT NULL,
  `Verified` tinyint(1) NOT NULL,
  `Active` tinyint(1) NOT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Gender` longtext DEFAULT NULL,
  `IsAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `OrganisationId` int(11) DEFAULT NULL,
  `PhoneNumber` longtext DEFAULT NULL,
  `RoleId` int(11) DEFAULT NULL,
  `Token` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `Title`, `FullName`, `ProfilePic`, `PasswordHash`, `Email`, `Verified`, `Active`, `DateOfBirth`, `Gender`, `IsAdmin`, `OrganisationId`, `PhoneNumber`, `RoleId`, `Token`) VALUES
(1, NULL, 'Daniel Ngobi', 'C:\\working directory\\erpsystem\\Api\\uploads\\e73d775f-d0ff-41d2-88ee-16bfd0c1720e.ico', 'AQAAAAIAAYagAAAAEN/nMJ1fRKJ1/CHSxI3A1vZVj4ncHHGkmC9pcL17DBKw+C5ko9slfiUmVzGzX9AjKQ==', 'ngobidaniel04@gmail.com', 1, 1, '2024-07-07', NULL, 1, 1, '0779226226', 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im5nb2JpZGFuaWVsMDRAZ21haWwuY29tIiwibmJmIjoxNzIzMTA1NjMwLCJleHAiOjE3MjMxMDkyMzAsImlhdCI6MTcyMzEwNTYzMH0.BDorPz7lGIifa--XACNAx9O8U8t_0Cy3jM7krzdUSRg'),
(2, NULL, 'Kinyera Amos', 'C:\\working directory\\erpsystem\\Api\\uploads\\ff3e05ed-2e45-4d86-8502-7f479ac6ae2f.jpg', 'AQAAAAIAAYagAAAAEDX9Ghvq2QxPhY+HsYf2vIZCR0h6Z4LI/bUtQ24auxAqbWbcd23xcZB65lWkX0VZ2A==', 'kinyeramo@gmail.com', 1, 1, '2024-07-17', NULL, 1, 1, '0777349597', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImtpbnllcmFtb0BnbWFpbC5jb20iLCJuYmYiOjE3MjI0MDk0MzgsImV4cCI6MTcyMjQxMzAzOCwiaWF0IjoxNzIyNDA5NDM4fQ.rpXyhEM553xCJl9-CF6ywX9ez5Y-MMdodloRPyfmV-4'),
(3, NULL, 'Lamony John Paul', 'C:\\working directory\\erpsystem\\Api\\uploads\\7129a7db-52cd-4945-9ae6-65c9786a2df4.jpg', 'AQAAAAIAAYagAAAAEFcZuEJm60SQxuNv9lavq0TW1VZF0SU9ZV9PlzEdOZuW9yyrBjqgBHMTxILvQIVR2Q==', 'kinyeramo24@gmail.com', 1, 1, '2024-07-18', NULL, 0, 1, 'null', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImtpbnllcmFtbzI0QGdtYWlsLmNvbSIsIm5iZiI6MTcyMjM0MDAwMiwiZXhwIjoxNzIyMzQzNjAyLCJpYXQiOjE3MjIzNDAwMDJ9.8ix7BciSeBld56RLWwTlMuXUYS591zgPIA-pEIDKz-c'),
(4, NULL, 'Catherine Nakitto', 'C:\\working directory\\erpsystem\\Api\\uploads\\a03db10c-42ae-4a98-96b3-f811305f2950.png', 'AQAAAAIAAYagAAAAELZG+gygntbYkzldaGEyyo249nKAUj+P5Hu3Ei/vCGFH+lZvChJJkKoHyq/HK1jmrg==', 'ncathie214@gmail.com', 1, 1, '2024-08-09', NULL, 1, 1, 'gtghuk', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im5jYXRoaWUyMTRAZ21haWwuY29tIiwibmJmIjoxNzIyMzI5MDQ5LCJleHAiOjE3MjIzMzI2NDksImlhdCI6MTcyMjMyOTA0OX0.AuMFLkhArU9ce8X2jCf9O79ZVKyggznxh0XHQ-YSKTM'),
(5, NULL, 'Shalom Tete', 'C:\\working directory\\erpsystem\\Api\\uploads\\aa6d3ce5-0daf-45a9-b594-4e13a41470ee.png', 'AQAAAAIAAYagAAAAEFaSf6r3ooGNFv+QHdEwv96GfEEYBDmkH3NrApcxqOMlyszIfltUyKEUm1FrqXs/tw==', 'sharomtiana6@gmail.com', 1, 1, '2024-07-08', NULL, 1, 1, 'dwsef', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNoYXJvbXRpYW5hNkBnbWFpbC5jb20iLCJuYmYiOjE3MjIyNjA2NDMsImV4cCI6MTcyMjI2NDI0MywiaWF0IjoxNzIyMjYwNjQzfQ.okUZzQ4wJ4MpZAwC0Ivwxl36llmi81THdWPtSEmkPGM'),
(6, NULL, 'Kinyera Amos', NULL, 'AQAAAAIAAYagAAAAEGIPMg5UI5fQdRnwgaTShbl5Y4zAEk7/PMSOgYzcwKHvYcqnCcoxCTDUspKBL2Q8yA==', 'kinyeramo24@gmail.com', 0, 0, NULL, NULL, 0, 1, NULL, NULL, NULL),
(7, NULL, 'Kinyera Amos', NULL, 'AQAAAAIAAYagAAAAECo4eYkykspg/uHy+lPQsO8BdJONVZ/CJMP7AldTNVAVmuAD17LRo5ZXYTqg5nDFmA==', 'kinyeramo24@gmail.com', 0, 0, NULL, NULL, 0, 1, NULL, NULL, NULL),
(8, NULL, 'Kinyera Amos', 'C:\\working directory\\erpsystem\\Api\\uploads\\fd88d218-58fc-470e-a3b6-58c2df7a92dc.jpg', 'AQAAAAIAAYagAAAAEOQ22jfvz8fq60/ju4SrinbMNmkAWiwm2Q7KJc78ltGaQpCkbupE/wA3YFHDZn9hYA==', 'kinyeramo2@gmail.com', 1, 1, '2024-07-10', NULL, 1, 1, '0777349597', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImtpbnllcmFtbzJAZ21haWwuY29tIiwibmJmIjoxNzIyMzQ3Nzg4LCJleHAiOjE3MjIzNTEzODgsImlhdCI6MTcyMjM0Nzc4OH0.WG74LNagxLtC88hZmQITVjipdaOa-lITrlTXwmpEa2o'),
(9, NULL, 'Kinyera Amos', 'C:\\working directory\\erpsystem\\Api\\uploads\\54affd9d-9ba4-4fa9-b6d4-40ff01ebf67f.jpg', 'AQAAAAIAAYagAAAAELijswHGvySIGrEdrLr6HHgxh8imhK+I/ySz++/sb1VPLsNGdnyoW1RrUXtaGCo5CQ==', 'kinyeramo25@gmail.com', 1, 1, '2024-07-30', NULL, 1, 1, '0777349597', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImtpbnllcmFtbzI1QGdtYWlsLmNvbSIsIm5iZiI6MTcyMjM0ODI0OCwiZXhwIjoxNzIyMzUxODQ4LCJpYXQiOjE3MjIzNDgyNDh9.s9hCiSYE8_XTb_Auv59OxuEtvb6tDrWm6SF3yiS40Tw'),
(10, NULL, 'Kinyera Amos', 'C:\\working directory\\erpsystem\\Api\\uploads\\23f18468-2e10-476f-b5ab-88573587b00a.jpg', 'AQAAAAIAAYagAAAAEGf8ur1/9YWoIzSkWfm2nNZrBvPcb1ljLLgWqKcOJKvi+KODiDkKSNATP9uYGHsp/Q==', 'kinyeramo26@gmail.com', 1, 1, '2024-07-18', NULL, 1, 1, '0777349597', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImtpbnllcmFtbzI2QGdtYWlsLmNvbSIsIm5iZiI6MTcyMjM1MTAyMiwiZXhwIjoxNzIyMzU0NjIyLCJpYXQiOjE3MjIzNTEwMjJ9.tz0MycV6QYM3coqfDnoityUCqBWTbwEZ-jSxC3PqenE'),
(11, NULL, 'Kinyera Amos', 'C:\\working directory\\erpsystem\\Api\\uploads\\86ec7103-5393-41f8-ac4c-7379668dfc64.jpg', 'AQAAAAIAAYagAAAAEDZ2W0+RWMlukkxQCu9l8h/0z5izZ76JN4afSdLBecb9TnLLeWvEml+d1ptzwIKcFg==', 'kinyeramo27@gmail.com', 1, 1, '2024-07-23', NULL, 1, 1, '0777349597', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImtpbnllcmFtbzI3QGdtYWlsLmNvbSIsIm5iZiI6MTcyMjM1MTIxNiwiZXhwIjoxNzIyMzU0ODE2LCJpYXQiOjE3MjIzNTEyMTZ9.szKB1LrXAgVcwgOqVmujJckxmic79sIA5kdRDcnyLFg'),
(12, NULL, 'Kinyera Amos', 'C:\\working directory\\erpsystem\\Api\\uploads\\282cef52-3262-4590-a6dd-f78a1c9386bb.jpg', 'AQAAAAIAAYagAAAAEITi7Co3jgGjNvInRRSt9RR17leBowVvJtwXIe422vNHkUsrFpErlQdknzYXnMUztQ==', 'kinyeramo28@gmail.com', 1, 1, '2024-07-18', NULL, 1, 1, '0777349597', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImtpbnllcmFtbzI4QGdtYWlsLmNvbSIsIm5iZiI6MTcyMjM1MzU1OCwiZXhwIjoxNzIyMzU3MTU4LCJpYXQiOjE3MjIzNTM1NTh9.2F9rCeuqCqA1sGwUW2y9gTThMSRegsbwi6nMlkQMP3o');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `Id` int(11) NOT NULL,
  `Title` longtext NOT NULL,
  `AccountNo` longtext DEFAULT NULL,
  `VendorType` longtext NOT NULL,
  `Email` longtext NOT NULL,
  `Phone` longtext DEFAULT NULL,
  `Mobile` longtext NOT NULL,
  `FullName` longtext NOT NULL,
  `Website` longtext DEFAULT NULL,
  `BillingRate` decimal(65,30) NOT NULL,
  `OpeningBalance` decimal(65,30) NOT NULL,
  `OpeningBalanceDate` datetime(6) NOT NULL,
  `Notes` longtext DEFAULT NULL,
  `BusinessIdNo` longtext DEFAULT NULL,
  `Status` tinyint(1) NOT NULL,
  `AccountId` int(11) DEFAULT NULL,
  `PaymentAccount` int(11) NOT NULL,
  `CompanyName` longtext DEFAULT NULL,
  `BankName` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20240422091216_InitialCreate', '8.0.4'),
('20240422091926_Changing_Group_Account_Type_To_Behaviour', '8.0.4'),
('20240422095651_Addition_Of_Normal_Account', '8.0.4'),
('20240422104008_Addition_of_Transaction_Model', '8.0.4'),
('20240424051704_AdditionofGroupIdOnAccount', '8.0.4'),
('20240424075116_AdditionOfTransactionsEntity', '8.0.4'),
('20240425083433_Addition_of_Vendor_and_Address_Entity', '8.0.4'),
('20240425122018_Addition_Of_SubGroupAccounts', '8.0.4'),
('20240426102732_Addition_of_Description_on_subgroupaccoutn', '8.0.4'),
('20240426182830_UpdatingDatabase', '8.0.4'),
('20240429142548_Addition_Of_Bill', '8.0.4'),
('20240429142858_Updating_Columns_For_DueDate_BillDate', '8.0.4'),
('20240429152217_AdditionOfIgnoringCaseSensitivityOnTables', '8.0.4'),
('20240429153812_AdditionOfIgnoringCaseSensitivityOnTables1', '8.0.4'),
('20240430090722_AdditionOfProductEtity', '8.0.4'),
('20240430101240_AdditionOfNarrantion_and_type_on_Bill', '8.0.4'),
('20240501092525_ModificationOfModels', '8.0.4'),
('20240506083011_AddDescriptionToGroupAccoount', '8.0.4'),
('20240507080212_AdditionOfTypeToVendor', '8.0.4'),
('20240507142015_AddingDateTimeToSubGroup', '8.0.4'),
('20240509095915_AdditionOfAccountNumber', '8.0.4'),
('20240509141233_CreatingOfTransactionEntryModel', '8.0.4'),
('20240509141506_CreatingOfTransactionEntryModel1', '8.0.4'),
('20240510091917_AdditionOfForeignKeyToTranEntry', '8.0.4'),
('20240515052751_AdditionOfRecordDateToTransaction', '8.0.4'),
('20240516074953_CombiningNametoFullNameOnVendors', '8.0.4'),
('20240516082248_CombiningNametoFullNameOnVendors1', '8.0.4'),
('20240520075240_MakingSomeFieldsNullableInVendor', '8.0.4'),
('20240520075750_AdditionOfBankNameToVendors', '8.0.4'),
('20240521063515_AdditionOfVendorIdOnBill', '8.0.4'),
('20240524134731_AdditionOfUserModel', '8.0.4'),
('20240526132408_AdditionOfOrganisationAndUserRole', '8.0.4'),
('20240528090558_AdditionOfRolesAndOrganisation', '8.0.4'),
('20240528101700_AdditionOfInvitedUsers', '8.0.4'),
('20240528113058_AddingForeignKeysToInvitedUsers', '8.0.4'),
('20240528154114_MakingTokenNullable', '8.0.4'),
('20240612103132_AdditionOfNewConnectionModule', '8.0.4'),
('20240618062526_AdditionOfCustomerCategories', '8.0.4'),
('20240619134740_ChangeOfColumnTypes', '8.0.4'),
('20240619141337_RenamingColumn', '8.0.4'),
('20240620110236_AdditionOfApplicationStatus', '8.0.4'),
('20240620132036_AdditionOfApplicationDate', '8.0.4'),
('20240620162625_AdditionOfSurveyReport', '8.0.4'),
('20240621113304_AdditionOfSurveryReport', '8.0.4'),
('20240621162342_AdditionOfApplicationLogs', '8.0.4'),
('20240622155208_Addition', '8.0.4'),
('20240622173445_AdditionOfJobCard', '8.0.4'),
('20240624084614_AdditionOfCustomerType', '8.0.4'),
('20240624095608_AdditionOfBillDelivery', '8.0.4'),
('20240624122423_AdditionOfConnectionInvoice_and_NewConnectionMaterials', '8.0.4'),
('20240624183415_AdditionOfMaterials', '8.0.4'),
('20240625113629_DocketInitiation', '8.0.4'),
('20240626112511_AdditionOfInvoiceableFieldOnMaterials', '8.0.4'),
('20240628105807_AdditionOfPayments', '8.0.4'),
('20240628110006_AdditionOfPayments1', '8.0.4'),
('20240629154954_AdditionOfCustomerNameOnPayments', '8.0.4'),
('20240630135230_AdditionOfBillingRequest', '8.0.4'),
('20240630194922_AdditionOfMeterReading', '8.0.4'),
('20240701212732_AdditionOfCustomerTarrifToApplication', '8.0.4'),
('20240701212917_AdditionOfCustomerTarrifToApplication2', '8.0.4'),
('20240702025727_AdditionOfDateConnected', '8.0.4'),
('20240702133600_ModificationOfMeterReading', '8.0.4'),
('20240702150300_AdditionOfMeterTypes', '8.0.4'),
('20240702151120_AdditionOfMeterSizeModal', '8.0.4'),
('20240702152612_AdditionOfMeterMake', '8.0.4'),
('20240702160917_Modifications', '8.0.4'),
('20240702181003_UpdatedMigrations', '8.0.4'),
('20240702182406_AdditionOfMeterMakeIdOnMeterServicing', '8.0.4'),
('20240702203258_UpdatingForeignKeys', '8.0.4'),
('20240703003940_UpdatingForeignKeysAndNullableFields', '8.0.4'),
('20240706190713_AdditionOfBillAdjustmentRequest_TransactionCodes_tables', '8.0.4'),
('20240707081518_UpdatingBlockIdInApplications', '8.0.4'),
('20240709082912_AdditionOfBillingPeriodAndBulkMeterReadings', '8.0.4'),
('20240709093958_AdditionOfPeriodInBillingPeriod', '8.0.4'),
('20240715092417_AdditionOfDepartmentForCRM', '8.0.4'),
('20240716064304_AdditionOfTicketCategories', '8.0.4'),
('20240716170628_AdditionOfDescriptionForTicketCategory', '8.0.4'),
('20240717055914_AdditionOfEscalationMatrix', '8.0.4'),
('20240717101640_AdditionOfLevelNameAndLevelDescriptionOnEscalationMatrix', '8.0.4'),
('20240717115049_AdditionOfDeleteFlagOnTicketCategories', '8.0.4'),
('20240718070437_AdditionOfPriority', '8.0.4'),
('20240718102112_AdditionOfDescriptionAndColorCodeToPriority', '8.0.4'),
('20240722062858_AdditionOfNewFieldsOnEscalationMatrix', '8.0.4'),
('20240722075739_additionofticket', '8.0.4'),
('20240806115124_AdditionOfCodesToAccounts', '8.0.4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Accounts_SubGroupAccountId` (`SubGroupAccountId`);

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `IX_Addresses_VendorId` (`VendorId`);

--
-- Indexes for table `applicationlogs`
--
ALTER TABLE `applicationlogs`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Applications_BranchId` (`BranchId`),
  ADD KEY `IX_Applications_OperationAreaId` (`OperationAreaId`),
  ADD KEY `IX_Applications_StateId` (`StateId`),
  ADD KEY `IX_Applications_SubTerritoryId` (`SubTerritoryId`),
  ADD KEY `IX_Applications_TerritoryId` (`TerritoryId`),
  ADD KEY `IX_Applications_CustomerCategoryId` (`CustomerCategoryId`),
  ADD KEY `IX_Applications_AssignedTo` (`AssignedTo`),
  ADD KEY `IX_Applications_CustomerType` (`CustomerType`),
  ADD KEY `IX_Applications_CustomertarrifId` (`CustomertarrifId`),
  ADD KEY `IX_Applications_BlockId` (`BlockId`);

--
-- Indexes for table `audittrails`
--
ALTER TABLE `audittrails`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `billadjustmentrequests`
--
ALTER TABLE `billadjustmentrequests`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_BillAdjustmentRequests_TransactionCode` (`TransactionCode`);

--
-- Indexes for table `billdeliverymethods`
--
ALTER TABLE `billdeliverymethods`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `billingcustomers`
--
ALTER TABLE `billingcustomers`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_BillingCustomers_ApplicationId` (`ApplicationId`),
  ADD KEY `IX_BillingCustomers_TarrifId` (`TarrifId`);

--
-- Indexes for table `billingperiod`
--
ALTER TABLE `billingperiod`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `billingrequests`
--
ALTER TABLE `billingrequests`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_BillingRequests_BranchId` (`BranchId`),
  ADD KEY `IX_BillingRequests_OperationAreaId` (`OperationAreaId`),
  ADD KEY `IX_BillingRequests_BillingPeriodId` (`BillingPeriodId`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Bills_VendorId` (`VendorId`);

--
-- Indexes for table `billtranitems`
--
ALTER TABLE `billtranitems`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_billTranItems_BillId` (`BillId`),
  ADD KEY `IX_billTranItems_AccountId` (`AccountId`);

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Branches_OperationAreaId` (`OperationAreaId`);

--
-- Indexes for table `bulkreadings`
--
ALTER TABLE `bulkreadings`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_BulkReadings_BillingCycleId` (`BillingCycleId`),
  ADD KEY `IX_BulkReadings_BranchId` (`BranchId`),
  ADD KEY `IX_BulkReadings_OperationAreaId` (`OperationAreaId`);

--
-- Indexes for table `customerbills`
--
ALTER TABLE `customerbills`
  ADD PRIMARY KEY (`CustomerBillId`),
  ADD KEY `IX_CustomerBills_CustomerId` (`CustomerId`);

--
-- Indexes for table `customercategories`
--
ALTER TABLE `customercategories`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `customertarrifs`
--
ALTER TABLE `customertarrifs`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `customertypes`
--
ALTER TABLE `customertypes`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Departments_HeadDepactId` (`HeadDepactId`);

--
-- Indexes for table `docketinitiations`
--
ALTER TABLE `docketinitiations`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_DocketInitiations_ApplicationId` (`ApplicationId`),
  ADD KEY `IX_DocketInitiations_InstalledBy` (`InstalledBy`);

--
-- Indexes for table `escalationmatrices`
--
ALTER TABLE `escalationmatrices`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_EscalationMatrices_DepartmentId` (`DepartmentId`),
  ADD KEY `IX_EscalationMatrices_PriorityId` (`PriorityId`),
  ADD KEY `IX_EscalationMatrices_TicketCategoryId` (`TicketCategoryId`);

--
-- Indexes for table `groupaccounts`
--
ALTER TABLE `groupaccounts`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `invitedusers`
--
ALTER TABLE `invitedusers`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_InvitedUsers_OrganisationId` (`OrganisationId`),
  ADD KEY `IX_InvitedUsers_RoleId` (`RoleId`);

--
-- Indexes for table `jobcards`
--
ALTER TABLE `jobcards`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_JobCards_applicationId` (`applicationId`),
  ADD KEY `IX_JobCards_AssignedUserId` (`AssignedUserId`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`MaterialId`);

--
-- Indexes for table `metermakes`
--
ALTER TABLE `metermakes`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `meterreadings`
--
ALTER TABLE `meterreadings`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_MeterReadings_ReadingBy` (`ReadingBy`);

--
-- Indexes for table `metersizes`
--
ALTER TABLE `metersizes`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `metertypes`
--
ALTER TABLE `metertypes`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `newconnectioninvoicematerials`
--
ALTER TABLE `newconnectioninvoicematerials`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_NewConnectionInvoiceMaterials_NewConnectionInvoiceId` (`NewConnectionInvoiceId`),
  ADD KEY `IX_NewConnectionInvoiceMaterials_MaterialId` (`MaterialId`);

--
-- Indexes for table `newconnectioninvoices`
--
ALTER TABLE `newconnectioninvoices`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_NewConnectionInvoices_ApplicationId` (`ApplicationId`);

--
-- Indexes for table `newmeterservicings`
--
ALTER TABLE `newmeterservicings`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_NewMeterServicings_InstalledBy` (`InstalledBy`),
  ADD KEY `IX_NewMeterServicings_MeterSizeId` (`MeterSizeId`),
  ADD KEY `IX_NewMeterServicings_MeterMakeId` (`MeterMakeId`),
  ADD KEY `IX_NewMeterServicings_MeterTypeId` (`MeterTypeId`);

--
-- Indexes for table `operationareas`
--
ALTER TABLE `operationareas`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_OperationAreas_StateId` (`StateId`);

--
-- Indexes for table `organisations`
--
ALTER TABLE `organisations`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `priorities`
--
ALTER TABLE `priorities`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `subgroupaccounts`
--
ALTER TABLE `subgroupaccounts`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_SubGroupAccounts_GroupId` (`GroupId`);

--
-- Indexes for table `subterritories`
--
ALTER TABLE `subterritories`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `surveyreports`
--
ALTER TABLE `surveyreports`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_surveyReports_ApplicationId` (`ApplicationId`),
  ADD KEY `IX_surveyReports_SurveyorId` (`SurveyorId`);

--
-- Indexes for table `territories`
--
ALTER TABLE `territories`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Territories_BranchId` (`BranchId`);

--
-- Indexes for table `ticketaudittrails`
--
ALTER TABLE `ticketaudittrails`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_TicketAuditTrails_AssignedTo` (`AssignedTo`);

--
-- Indexes for table `ticketcategories`
--
ALTER TABLE `ticketcategories`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_TicketCategories_DepartmentId` (`DepartmentId`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Tickets_BranchId` (`BranchId`),
  ADD KEY `IX_Tickets_EscalationMatrixId` (`EscalationMatrixId`),
  ADD KEY `IX_Tickets_OperationAreaId` (`OperationAreaId`),
  ADD KEY `IX_Tickets_PriorityId` (`PriorityId`),
  ADD KEY `IX_Tickets_TerritoryId` (`TerritoryId`),
  ADD KEY `IX_Tickets_TicketCategoryId` (`TicketCategoryId`),
  ADD KEY `IX_Tickets_AssignedTo` (`AssignedTo`);

--
-- Indexes for table `transactioncodes`
--
ALTER TABLE `transactioncodes`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `transactionentries`
--
ALTER TABLE `transactionentries`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_transactionEntries_TranAccount` (`TranAccount`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Users_OrganisationId` (`OrganisationId`),
  ADD KEY `IX_Users_RoleId` (`RoleId`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Vendors_PaymentAccount` (`PaymentAccount`);

--
-- Indexes for table `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `applicationlogs`
--
ALTER TABLE `applicationlogs`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `audittrails`
--
ALTER TABLE `audittrails`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190;

--
-- AUTO_INCREMENT for table `billadjustmentrequests`
--
ALTER TABLE `billadjustmentrequests`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `billdeliverymethods`
--
ALTER TABLE `billdeliverymethods`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `billingcustomers`
--
ALTER TABLE `billingcustomers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `billingperiod`
--
ALTER TABLE `billingperiod`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `billingrequests`
--
ALTER TABLE `billingrequests`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `billtranitems`
--
ALTER TABLE `billtranitems`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bulkreadings`
--
ALTER TABLE `bulkreadings`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customerbills`
--
ALTER TABLE `customerbills`
  MODIFY `CustomerBillId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customercategories`
--
ALTER TABLE `customercategories`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customertarrifs`
--
ALTER TABLE `customertarrifs`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customertypes`
--
ALTER TABLE `customertypes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `docketinitiations`
--
ALTER TABLE `docketinitiations`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `escalationmatrices`
--
ALTER TABLE `escalationmatrices`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `groupaccounts`
--
ALTER TABLE `groupaccounts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `invitedusers`
--
ALTER TABLE `invitedusers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jobcards`
--
ALTER TABLE `jobcards`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `MaterialId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `metermakes`
--
ALTER TABLE `metermakes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `meterreadings`
--
ALTER TABLE `meterreadings`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `metersizes`
--
ALTER TABLE `metersizes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `metertypes`
--
ALTER TABLE `metertypes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `newconnectioninvoicematerials`
--
ALTER TABLE `newconnectioninvoicematerials`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `newconnectioninvoices`
--
ALTER TABLE `newconnectioninvoices`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `newmeterservicings`
--
ALTER TABLE `newmeterservicings`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `operationareas`
--
ALTER TABLE `operationareas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `organisations`
--
ALTER TABLE `organisations`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `priorities`
--
ALTER TABLE `priorities`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `subgroupaccounts`
--
ALTER TABLE `subgroupaccounts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subterritories`
--
ALTER TABLE `subterritories`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `surveyreports`
--
ALTER TABLE `surveyreports`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `territories`
--
ALTER TABLE `territories`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ticketaudittrails`
--
ALTER TABLE `ticketaudittrails`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `ticketcategories`
--
ALTER TABLE `ticketcategories`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `transactioncodes`
--
ALTER TABLE `transactioncodes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactionentries`
--
ALTER TABLE `transactionentries`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `FK_Accounts_SubGroupAccounts_SubGroupAccountId` FOREIGN KEY (`SubGroupAccountId`) REFERENCES `subgroupaccounts` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `FK_Addresses_Vendors_VendorId` FOREIGN KEY (`VendorId`) REFERENCES `vendors` (`Id`);

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `FK_Applications_Blocks_BlockId` FOREIGN KEY (`BlockId`) REFERENCES `blocks` (`Id`),
  ADD CONSTRAINT `FK_Applications_Branches_BranchId` FOREIGN KEY (`BranchId`) REFERENCES `branches` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Applications_CustomerCategories_CustomerCategoryId` FOREIGN KEY (`CustomerCategoryId`) REFERENCES `customercategories` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Applications_CustomerTarrifs_CustomertarrifId` FOREIGN KEY (`CustomertarrifId`) REFERENCES `customertarrifs` (`Id`),
  ADD CONSTRAINT `FK_Applications_CustomerTypes_CustomerType` FOREIGN KEY (`CustomerType`) REFERENCES `customertypes` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Applications_OperationAreas_OperationAreaId` FOREIGN KEY (`OperationAreaId`) REFERENCES `operationareas` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Applications_States_StateId` FOREIGN KEY (`StateId`) REFERENCES `states` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Applications_SubTerritories_SubTerritoryId` FOREIGN KEY (`SubTerritoryId`) REFERENCES `subterritories` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Applications_Territories_TerritoryId` FOREIGN KEY (`TerritoryId`) REFERENCES `territories` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Applications_Users_AssignedTo` FOREIGN KEY (`AssignedTo`) REFERENCES `users` (`Id`);

--
-- Constraints for table `billadjustmentrequests`
--
ALTER TABLE `billadjustmentrequests`
  ADD CONSTRAINT `FK_BillAdjustmentRequests_TransactionCodes_TransactionCode` FOREIGN KEY (`TransactionCode`) REFERENCES `transactioncodes` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `billingcustomers`
--
ALTER TABLE `billingcustomers`
  ADD CONSTRAINT `FK_BillingCustomers_Applications_ApplicationId` FOREIGN KEY (`ApplicationId`) REFERENCES `applications` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_BillingCustomers_CustomerTarrifs_TarrifId` FOREIGN KEY (`TarrifId`) REFERENCES `customertarrifs` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `billingrequests`
--
ALTER TABLE `billingrequests`
  ADD CONSTRAINT `FK_BillingRequests_BillingPeriod_BillingPeriodId` FOREIGN KEY (`BillingPeriodId`) REFERENCES `billingperiod` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_BillingRequests_Branches_BranchId` FOREIGN KEY (`BranchId`) REFERENCES `branches` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_BillingRequests_OperationAreas_OperationAreaId` FOREIGN KEY (`OperationAreaId`) REFERENCES `operationareas` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `FK_Bills_Vendors_VendorId` FOREIGN KEY (`VendorId`) REFERENCES `vendors` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `billtranitems`
--
ALTER TABLE `billtranitems`
  ADD CONSTRAINT `FK_billTranItems_Accounts_AccountId` FOREIGN KEY (`AccountId`) REFERENCES `accounts` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_billTranItems_Bills_BillId` FOREIGN KEY (`BillId`) REFERENCES `bills` (`Id`);

--
-- Constraints for table `branches`
--
ALTER TABLE `branches`
  ADD CONSTRAINT `FK_Branches_OperationAreas_OperationAreaId` FOREIGN KEY (`OperationAreaId`) REFERENCES `operationareas` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `bulkreadings`
--
ALTER TABLE `bulkreadings`
  ADD CONSTRAINT `FK_BulkReadings_BillingRequests_BillingCycleId` FOREIGN KEY (`BillingCycleId`) REFERENCES `billingrequests` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_BulkReadings_Branches_BranchId` FOREIGN KEY (`BranchId`) REFERENCES `branches` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_BulkReadings_OperationAreas_OperationAreaId` FOREIGN KEY (`OperationAreaId`) REFERENCES `operationareas` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `customerbills`
--
ALTER TABLE `customerbills`
  ADD CONSTRAINT `FK_CustomerBills_BillingCustomers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `billingcustomers` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `docketinitiations`
--
ALTER TABLE `docketinitiations`
  ADD CONSTRAINT `FK_DocketInitiations_Applications_ApplicationId` FOREIGN KEY (`ApplicationId`) REFERENCES `applications` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_DocketInitiations_Users_InstalledBy` FOREIGN KEY (`InstalledBy`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `escalationmatrices`
--
ALTER TABLE `escalationmatrices`
  ADD CONSTRAINT `FK_EscalationMatrices_Departments_DepartmentId` FOREIGN KEY (`DepartmentId`) REFERENCES `departments` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_EscalationMatrices_Priorities_PriorityId` FOREIGN KEY (`PriorityId`) REFERENCES `priorities` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_EscalationMatrices_TicketCategories_TicketCategoryId` FOREIGN KEY (`TicketCategoryId`) REFERENCES `ticketcategories` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `invitedusers`
--
ALTER TABLE `invitedusers`
  ADD CONSTRAINT `FK_InvitedUsers_Organisations_OrganisationId` FOREIGN KEY (`OrganisationId`) REFERENCES `organisations` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_InvitedUsers_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `jobcards`
--
ALTER TABLE `jobcards`
  ADD CONSTRAINT `FK_JobCards_Applications_applicationId` FOREIGN KEY (`applicationId`) REFERENCES `applications` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_JobCards_Users_AssignedUserId` FOREIGN KEY (`AssignedUserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `meterreadings`
--
ALTER TABLE `meterreadings`
  ADD CONSTRAINT `FK_MeterReadings_Users_ReadingBy` FOREIGN KEY (`ReadingBy`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `newconnectioninvoicematerials`
--
ALTER TABLE `newconnectioninvoicematerials`
  ADD CONSTRAINT `FK_NewConnectionInvoiceMaterials_Materials_MaterialId` FOREIGN KEY (`MaterialId`) REFERENCES `materials` (`MaterialId`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_NewConnectionInvoiceMaterials_NewConnectionInvoices_NewConne~` FOREIGN KEY (`NewConnectionInvoiceId`) REFERENCES `newconnectioninvoices` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `newconnectioninvoices`
--
ALTER TABLE `newconnectioninvoices`
  ADD CONSTRAINT `FK_NewConnectionInvoices_Applications_ApplicationId` FOREIGN KEY (`ApplicationId`) REFERENCES `applications` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `newmeterservicings`
--
ALTER TABLE `newmeterservicings`
  ADD CONSTRAINT `FK_NewMeterServicings_MeterMakes_MeterMakeId` FOREIGN KEY (`MeterMakeId`) REFERENCES `metermakes` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_NewMeterServicings_MeterSizes_MeterSizeId` FOREIGN KEY (`MeterSizeId`) REFERENCES `metersizes` (`Id`),
  ADD CONSTRAINT `FK_NewMeterServicings_MeterTypes_MeterTypeId` FOREIGN KEY (`MeterTypeId`) REFERENCES `metertypes` (`Id`),
  ADD CONSTRAINT `FK_NewMeterServicings_Users_InstalledBy` FOREIGN KEY (`InstalledBy`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `operationareas`
--
ALTER TABLE `operationareas`
  ADD CONSTRAINT `FK_OperationAreas_States_StateId` FOREIGN KEY (`StateId`) REFERENCES `states` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `subgroupaccounts`
--
ALTER TABLE `subgroupaccounts`
  ADD CONSTRAINT `FK_SubGroupAccounts_GroupAccounts_GroupId` FOREIGN KEY (`GroupId`) REFERENCES `groupaccounts` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `surveyreports`
--
ALTER TABLE `surveyreports`
  ADD CONSTRAINT `FK_surveyReports_Applications_ApplicationId` FOREIGN KEY (`ApplicationId`) REFERENCES `applications` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_surveyReports_Users_SurveyorId` FOREIGN KEY (`SurveyorId`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `territories`
--
ALTER TABLE `territories`
  ADD CONSTRAINT `FK_Territories_Branches_BranchId` FOREIGN KEY (`BranchId`) REFERENCES `branches` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `ticketaudittrails`
--
ALTER TABLE `ticketaudittrails`
  ADD CONSTRAINT `FK_TicketAuditTrails_Departments_AssignedTo` FOREIGN KEY (`AssignedTo`) REFERENCES `departments` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `ticketcategories`
--
ALTER TABLE `ticketcategories`
  ADD CONSTRAINT `FK_TicketCategories_Departments_DepartmentId` FOREIGN KEY (`DepartmentId`) REFERENCES `departments` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `FK_Tickets_Branches_BranchId` FOREIGN KEY (`BranchId`) REFERENCES `branches` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Tickets_EscalationMatrices_EscalationMatrixId` FOREIGN KEY (`EscalationMatrixId`) REFERENCES `escalationmatrices` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Tickets_OperationAreas_OperationAreaId` FOREIGN KEY (`OperationAreaId`) REFERENCES `operationareas` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Tickets_Priorities_PriorityId` FOREIGN KEY (`PriorityId`) REFERENCES `priorities` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Tickets_Territories_TerritoryId` FOREIGN KEY (`TerritoryId`) REFERENCES `territories` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Tickets_TicketCategories_TicketCategoryId` FOREIGN KEY (`TicketCategoryId`) REFERENCES `ticketcategories` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `transactionentries`
--
ALTER TABLE `transactionentries`
  ADD CONSTRAINT `FK_transactionEntries_Accounts_TranAccount` FOREIGN KEY (`TranAccount`) REFERENCES `accounts` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_Users_Organisations_OrganisationId` FOREIGN KEY (`OrganisationId`) REFERENCES `organisations` (`Id`),
  ADD CONSTRAINT `FK_Users_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`Id`);

--
-- Constraints for table `vendors`
--
ALTER TABLE `vendors`
  ADD CONSTRAINT `FK_Vendors_Accounts_PaymentAccount` FOREIGN KEY (`PaymentAccount`) REFERENCES `accounts` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
