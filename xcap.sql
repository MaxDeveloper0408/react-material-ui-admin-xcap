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

 Date: 11/07/2020 16:51:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bank_datas
-- ----------------------------
DROP TABLE IF EXISTS `bank_datas`;
CREATE TABLE `bank_datas`  (
  `user_id` int(5) NOT NULL,
  `banco_nome` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `banco_agencia` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `banco_conta` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tipo_conta` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bank_datas
-- ----------------------------
INSERT INTO `bank_datas` VALUES (17, 'wqw', 'qweqwee', 'qweqwe', 'qweqweq', '2020-05-29 12:45:11', '2020-06-02 20:49:44');

-- ----------------------------
-- Table structure for contracts
-- ----------------------------
DROP TABLE IF EXISTS `contracts`;
CREATE TABLE `contracts`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invest_type` enum('FLEXIVEL','CRESCIMENTO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `open_value` decimal(65, 0) NULL DEFAULT NULL,
  `profit_value` decimal(65, 0) NULL DEFAULT NULL,
  `start_date` date NULL DEFAULT NULL,
  `end_date` date NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `status` enum('pending','processing','exprired') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `user_roles` VALUES (NULL, NULL, 18, 1);
INSERT INTO `user_roles` VALUES (NULL, NULL, 17, 1);
INSERT INTO `user_roles` VALUES (NULL, NULL, 16, 1);
INSERT INTO `user_roles` VALUES ('2020-05-28 11:49:50', '2020-05-28 11:49:50', 15, 2);

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
  `zipcode` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `street` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `complement` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `neighborhood` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `investment` enum('5.000-15.000','55.000-80.000','20.000-50.000','100.000+') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `admin` enum('0','1') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT '0',
  `first_access` enum('0','1') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `client_type` enum('CLIENTE','ESPECIAL','DEMO','ADMIN') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT 'CLIENTE',
  `active` enum('YES','NO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT 'NO',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (15, 'Test', 'CRESCIMENTO', '2020-05-08', 'FEMININO', '532.820.857-96', '+55 (12) 32132-1321', '12020-120', 'Rua Joaquim Távora', 123, '', 'Centro', 'Taubaté', 'SP', 'test@test.com', '20.000-50.000', '$2a$08$tHhDCLtU3soD2GxlVN7exOhVPaVGE0//28pHaoLZt5pZu.bSnMy0S', '1', NULL, '2020-05-28 11:49:50', '2020-05-28 11:49:50', 'CLIENTE', 'YES');
INSERT INTO `users` VALUES (17, 'Customer1', 'CRESCIMENTO', '2020-05-08', 'MASCULINO', '532.820.857-96', '+55 (12) 32132-1321', '12020-120', 'Rua Joaquim Távora', 123, '', 'Centro', 'Taubaté', 'SP', 'aaa@aaa.com', '100.000+', '$2a$08$yMV9g.W8oQxxsnI6w6b5zuPOa1KqZEzEPLwNe424Dj/SruIA6s0IS', '0', NULL, '2020-05-28 11:49:50', '2020-07-11 09:00:07', 'CLIENTE', 'YES');
INSERT INTO `users` VALUES (18, 'Customer2', 'CRESCIMENTO', '2020-05-08', 'MASCULINO', '532.820.857-96', '+55 (12) 32132-1321', '12020-120', 'Rua Joaquim Távora', 123, '', 'Centro', 'Taubaté', 'SP', 'aaa@aaa.com', '5.000-15.000', '$2a$08$tHhDCLtU3soD2GxlVN7exOhVPaVGE0//28pHaoLZt5pZu.bSnMy0S', '0', NULL, '2020-05-28 11:49:50', '2020-07-10 09:35:30', 'CLIENTE', 'YES');

SET FOREIGN_KEY_CHECKS = 1;
6', '+55 (12) 32132-1321', '12020-120', 'Rua Joaquim Távora', 123, '', 'Centro', 'Taubaté', 'SP', 'aaa@aaa.com', '100.000+', '$2a$08$yMV9g.W8oQxxsnI6w6b5zuPOa1KqZEzEPLwNe424Dj/SruIA6s0IS', '0', NULL, '2020-05-28 11:49:50', '2020-06-30 12:50:39', 'CLIENTE', 'YES');
INSERT INTO `users` VALUES (18, 'Customer2', 'CRESCIMENTO', '2020-05-08', 'MASCULINO', '532.820.857-96', '+55 (12) 32132-1321', '12020-120', 'Rua Joaquim Távora', 123, '', 'Centro', 'Taubaté', 'SP', 'aaa2@aaa.com', '5.000-15.000', '$2a$08$tHhDCLtU3soD2GxlVN7exOhVPaVGE0//28pHaoLZt5pZu.bSnMy0S', '0', NULL, '2020-05-28 11:49:50', '2020-06-30 14:21:31', 'CLIENTE', 'NO');

SET FOREIGN_KEY_CHECKS = 1;
