-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2021 at 03:14 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `glints_worker`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `id_attendance` int(3) NOT NULL,
  `id_register` int(3) NOT NULL,
  `entryAt` datetime NOT NULL,
  `exitAt` datetime NOT NULL,
  `checkIn` enum('yes','no') NOT NULL,
  `latitude` varchar(50) NOT NULL,
  `longitude` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `registers`
--

CREATE TABLE `registers` (
  `id_register` int(3) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `token` varchar(255) NOT NULL,
  `account` enum('Active','Deactive') NOT NULL DEFAULT 'Deactive',
  `id_level` int(3) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registers`
--

INSERT INTO `registers` (`id_register`, `full_name`, `email`, `password`, `createdAt`, `token`, `account`, `id_level`) VALUES
(2, 'Paramita', 'paramitaaditung@gmail.com', '$2b$10$Eq2hk7cvajiyQNOQuCP1vezcP.0fdvVfI67M44eHhUmyEB7Tv5QCy', '2021-09-19 13:16:40', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhcmFtaXRhYWRpdHVuZ0BnbWFpbC5jb20iLCJpYXQiOjE2MzIxNDc2MTgsImV4cCI6MTYzMjE1MTIxOH0.ZB2cVWxHP3TJvE5xn_9nZ-WEzT_HTmJUX4W0PZu81os', 'Deactive', 1);

-- --------------------------------------------------------

--
-- Table structure for table `register_levels`
--

CREATE TABLE `register_levels` (
  `id_level` int(3) NOT NULL,
  `level` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `register_levels`
--

INSERT INTO `register_levels` (`id_level`, `level`) VALUES
(1, 'User'),
(2, 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`id_attendance`),
  ADD KEY `register_id_register_fk` (`id_register`);

--
-- Indexes for table `registers`
--
ALTER TABLE `registers`
  ADD PRIMARY KEY (`id_register`),
  ADD KEY `register_levels_id_level_fk` (`id_level`);

--
-- Indexes for table `register_levels`
--
ALTER TABLE `register_levels`
  ADD PRIMARY KEY (`id_level`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `id_attendance` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registers`
--
ALTER TABLE `registers`
  MODIFY `id_register` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `register_levels`
--
ALTER TABLE `register_levels`
  MODIFY `id_level` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `register_id_register_fk` FOREIGN KEY (`id_register`) REFERENCES `registers` (`id_register`);

--
-- Constraints for table `registers`
--
ALTER TABLE `registers`
  ADD CONSTRAINT `register_levels_id_level_fk` FOREIGN KEY (`id_level`) REFERENCES `register_levels` (`id_level`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
