-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2023 at 06:10 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(100) NOT NULL,
  `userid` int(100) NOT NULL,
  `products` text NOT NULL,
  `total` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userid`, `products`, `total`, `timestamp`) VALUES
(1, 13, '[{\"id\":1,\"name\":\"blue shirt\",\"price\":\"120\",\"qty\":1,\"image\":\"file_1696859338179.jpg\"},{\"id\":2,\"name\":\"red shirt\",\"price\":\"560\",\"qty\":1,\"image\":\"file_1696859505701.jpg\"},{\"id\":3,\"name\":\"black \",\"price\":\"150\",\"qty\":1,\"image\":\"file_1696859973455.jpg\"}]', '830', '2023-10-14 03:19:18'),
(2, 13, '[{\"id\":1,\"name\":\"blue shirt\",\"price\":\"120\",\"qty\":1,\"image\":\"file_1696859338179.jpg\"},{\"id\":2,\"name\":\"red shirt\",\"price\":\"560\",\"qty\":1,\"image\":\"file_1696859505701.jpg\"},{\"id\":3,\"name\":\"black \",\"price\":\"150\",\"qty\":1,\"image\":\"file_1696859973455.jpg\"}]', '830', '2023-10-14 03:19:24'),
(3, 13, '[{\"id\":2,\"name\":\"red shirt\",\"price\":\"560\",\"qty\":1,\"image\":\"file_1696859505701.jpg\"}]', '560', '2023-10-14 03:20:46'),
(4, 13, '[{\"id\":2,\"name\":\"red shirt\",\"price\":\"560\",\"qty\":1,\"image\":\"file_1696859505701.jpg\"},{\"id\":3,\"name\":\"black \",\"price\":\"150\",\"qty\":1,\"image\":\"file_1696859973455.jpg\"}]', '710', '2023-10-14 03:21:57'),
(5, 13, '[{\"id\":3,\"name\":\"black \",\"price\":\"150\",\"qty\":2,\"image\":\"file_1696859973455.jpg\"}]', '300', '2023-10-14 08:20:58'),
(6, 14, '[{\"id\":9,\"name\":\"saree\",\"price\":\"530\",\"qty\":3,\"image\":\"file_1697303721135.jpg\"}]', '1590', '2023-10-15 16:07:33');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `qty` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `qty`, `price`, `image`) VALUES
(9, 'saree', '4', '530', 'file_1697303721135.jpg'),
(10, 'chudi material ', '8', '480', 'file_1697303754343.jpg'),
(11, 'T-shirt Black', '7', '300', 'file_1697385957137.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `testtable`
--

CREATE TABLE `testtable` (
  `id` int(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phonenumber` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `testtable`
--

INSERT INTO `testtable` (`id`, `name`, `phonenumber`) VALUES
(1, 'star mohan', '7339120184'),
(2, 'prasana', '123456789'),
(3, 'prasana', '123456789'),
(4, 'sabari', '123456789'),
(5, 'gowtham', '123456789'),
(6, 'kathir', '123456789'),
(8, 'postman1', '94420780'),
(9, 'postman2', '7339120182'),
(10, 'hellouser', '123'),
(11, 'pk2', '12345'),
(12, 'gowtham', '7339120185'),
(13, 'pk', '@123'),
(14, 'jegan', '12345678901');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testtable`
--
ALTER TABLE `testtable`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `testtable`
--
ALTER TABLE `testtable`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
