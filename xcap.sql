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

 Date: 17/05/2020 22:28:46
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
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'user', '2020-05-17 01:00:35', '2020-05-17 01:00:35');
INSERT INTO `roles` VALUES (2, 'admin', '2020-05-17 01:00:35', '2020-05-17 01:00:35');

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles`  (
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`, `userId`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO `user_roles` VALUES ('2020-05-17 13:16:57', '2020-05-17 13:16:57', 1, 6);
INSERT INTO `user_roles` VALUES ('2020-05-17 08:36:08', '2020-05-17 08:36:08', 2, 1);

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
  `client_type` enum('CLIENTE','ESPECIAL','DEMO','ADMIN') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `active` enum('YES','NO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT 'YES',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '123413', '', '2020-05-06', 'FEMININO', '123123', '12311111111', 123, '123', 123, '123', '131', '123', '123', 'test@test.com', '5.000-15.000', '$2a$08$8qzld8m1inzDw6Jiccpwp.o5AAad1CWYHDKRVQcsw6FuqaTu6Tv/2', '', '1', NULL, '2020-05-17 08:36:08', '2020-05-17 08:36:08', '', 'YES');
INSERT INTO `users` VALUES (6, 'dfadf', '', '2020-05-06', 'MASCULINO', 'sdfasf', '123213213123', 123, '12312', 3123123, '123123', '123123123', '123123', '123213', 'denuniver1@gmail.com', '5.000-15.000', '$2a$08$3sPIB8S8Y0DEShxg7AQZ2ezJmzQACzJfJlC/cIrAMyEyx0IKKj/72', '', '0', NULL, '2020-05-17 13:16:57', '2020-05-17 13:16:57', '', 'YES');

SET FOREIGN_KEY_CHECKS = 1;
