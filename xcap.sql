/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100138
 Source Host           : localhost:3306
 Source Schema         : xcap

 Target Server Type    : MySQL
 Target Server Version : 100138
 File Encoding         : 65001

 Date: 21/05/2020 05:24:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bank_data
-- ----------------------------
DROP TABLE IF EXISTS `bank_data`;
CREATE TABLE `bank_data`  (
  `user_id` int(5) NOT NULL,
  `banco_nome` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `banco_agencia` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `banco_conta` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tipo_conta` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for contracts
-- ----------------------------
DROP TABLE IF EXISTS `contracts`;
CREATE TABLE `contracts`  (
  `contrato_id` int(11) NOT NULL,
  `tipo` enum('FLEXIVEL','CRESCIMENTO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `valorInicial` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `valorFinal` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date NOT NULL,
  `contrato_user` int(11) NOT NULL,
  PRIMARY KEY (`contrato_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for error_logs
-- ----------------------------
DROP TABLE IF EXISTS `error_logs`;
CREATE TABLE `error_logs`  (
  `error_id` int(11) NOT NULL AUTO_INCREMENT,
  `erro_desc` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `erro_page` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `date` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`error_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'user', NULL, NULL);
INSERT INTO `roles` VALUES (2, 'admin', NULL, NULL);

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles`  (
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  PRIMARY KEY (`userId`, `roleId`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO `user_roles` VALUES ('2020-05-19 13:41:06', '2020-05-19 13:41:06', 10, 2);
INSERT INTO `user_roles` VALUES ('2020-05-20 18:22:12', '2020-05-20 18:22:12', 11, 1);
INSERT INTO `user_roles` VALUES ('2020-05-20 18:25:52', '2020-05-20 18:25:52', 12, 1);
INSERT INTO `user_roles` VALUES ('2020-05-20 18:47:02', '2020-05-20 18:47:02', 13, 1);
INSERT INTO `user_roles` VALUES ('2020-05-20 19:02:01', '2020-05-20 19:02:01', 14, 1);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `investment_type` enum('FLEXIVEL','CRESCIMENTO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `birthdate` date NULL DEFAULT NULL,
  `gender` enum('MASCULINO','FEMININO','TRANSGÊNERO','OTHER') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `cpf` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `cellphone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `zipcode` int(11) NULL DEFAULT NULL,
  `street` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `complement` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `neighborhood` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `investment` enum('5.000-10.000','5.000-15.000','20.000-50.000','100.000+') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `salt` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `admin` enum('0','1') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT '0',
  `first_access` enum('0','1') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `client_type` enum('CLIENTE','ESPECIAL','DEMO','ADMIN') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT 'CLIENTE',
  `active` enum('YES','NO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT 'NO',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (12, '12312311`23213123', '', '2020-05-08', 'TRANSGÊNERO', '532.820.857-96', '+55 (12) 3123-1232', 12020, 'Rua Doutor Dino Bueno', 123, '', 'Centro', 'Taubaté', 'SP', 'test@test222.com', '5.000-15.000', '$2a$08$itZNx4FN1y6b/JI9YpDSBeCuuztvQBhHikob2Zyvty4g98JJh402W', '', '0', NULL, '2020-05-20 18:25:52', '2020-05-20 18:25:52', '', 'YES');
INSERT INTO `users` VALUES (11, '123123100', '', '2020-05-09', 'FEMININO', '532.820.857-96', '+55 (12) 3123-2132', 12020, 'Rua Doutor Dino Bueno', 21323, '', 'Centro', 'Taubaté', 'SP', 'test@test111.com', '5.000-15.000', '$2a$08$7Ev794kCjehMfM0FeWNxHOAjvople6GiBwGA/QJhQ7Cr1cpeUW2ju', '', '0', NULL, '2020-05-20 18:22:12', '2020-05-20 18:22:12', '', 'YES');
INSERT INTO `users` VALUES (10, '1231231', '', '2020-05-07', 'FEMININO', '532.820.857-96', '+55 (99) 9999-9999', 13010, 'Rua General Osório', 1232, '123123', 'Centro', 'Campinas', 'SP', 'test@test.com', '5.000-15.000', '$2a$08$Bs4yY5zALKJOKQpwATe0G.BuFcFD8VqtveVPs4ovAQfwh5U2nLLjq', '', '1', NULL, '2020-05-19 13:41:06', '2020-05-19 13:41:06', '', 'YES');
INSERT INTO `users` VALUES (13, '123123122222', '', '2020-05-25', 'FEMININO', '532.820.857-96', '+55 (12) 3123-2131', 12020, 'Rua Doutor Dino Bueno', 222, '', 'Centro', 'Taubaté', 'SP', 'test@tes22t.com', '5.000-10.000', '$2a$08$YJQmpHBcCcKAY3vL0vBKzOrOJPHSk4vxqMf0xqq3bgYiliSGJ8zLS', '', '0', NULL, '2020-05-20 18:47:02', '2020-05-20 18:47:02', '', 'YES');
INSERT INTO `users` VALUES (14, '1231231wewe', 'FLEXIVEL', '2020-05-14', 'FEMININO', '532.820.857-96', '+55 (12) 3123-1232', 12020, 'Rua Doutor Dino Bueno', 21323, '', 'Centro', 'Taubaté', 'SP', 'test222@test.com', '5.000-15.000', '$2a$08$8voZs7oGfYjXX5h4ha9.aeY2Sm4Yf8lDjHxVP5kdT115NgBeEymiG', '', '0', NULL, '2020-05-20 19:02:01', '2020-05-20 19:02:01', '', 'YES');

SET FOREIGN_KEY_CHECKS = 1;
