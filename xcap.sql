/*
 Navicat Premium Data Transfer

 Source Server         : xcapitalsc heroku
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : qn66usrj1lwdk1cc.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306
 Source Schema         : jsqwhof9f0zvw2op

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 02/09/2020 00:26:51
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
  `tipo_conta` enum('Conta Corrente','Conta Poupança') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `bank_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of bank_datas
-- ----------------------------
INSERT INTO `bank_datas` VALUES (17, 'wqw', '123123                                 ', '40342-9', 'Conta Corrente', '2020-05-29 12:45:11', '2020-08-15 17:27:23', 2);

-- ----------------------------
-- Table structure for bank_lists
-- ----------------------------
DROP TABLE IF EXISTS `bank_lists`;
CREATE TABLE `bank_lists`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 118 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of bank_lists
-- ----------------------------
INSERT INTO `bank_lists` VALUES (1, 'Banco do Brasil S.A.', '001', NULL, NULL);
INSERT INTO `bank_lists` VALUES (2, 'Banco Santander (Brasil) S.A.', '033', NULL, NULL);
INSERT INTO `bank_lists` VALUES (3, 'Caixa Econômica Federal', '104', NULL, NULL);
INSERT INTO `bank_lists` VALUES (4, 'Banco Bradesco S.A.', '237', NULL, NULL);
INSERT INTO `bank_lists` VALUES (5, 'Banco Itaú S.A.', '341', NULL, NULL);
INSERT INTO `bank_lists` VALUES (6, 'Banco Real S.A. (antigo)', '356', NULL, NULL);
INSERT INTO `bank_lists` VALUES (7, 'Banco Mercantil do Brasil S.A.', '389', NULL, NULL);
INSERT INTO `bank_lists` VALUES (8, 'HSBC Bank Brasil S.A. – Banco Múltiplo', '399', NULL, NULL);
INSERT INTO `bank_lists` VALUES (9, 'Banco Safra S.A.', '422', NULL, NULL);
INSERT INTO `bank_lists` VALUES (10, 'Banco Rural S.A.', '453', NULL, NULL);
INSERT INTO `bank_lists` VALUES (11, 'Banco Rendimento S.A.', '633', NULL, NULL);
INSERT INTO `bank_lists` VALUES (12, 'Itaú Unibanco Holding S.A.', '652', NULL, NULL);
INSERT INTO `bank_lists` VALUES (13, 'Banco Citibank S.A.', '745', NULL, NULL);
INSERT INTO `bank_lists` VALUES (14, 'Banco ABC Brasil S.A.', '246', NULL, NULL);
INSERT INTO `bank_lists` VALUES (15, 'Banco Alfa S.A.', '025', NULL, NULL);
INSERT INTO `bank_lists` VALUES (16, 'Banco Alvorada S.A.', '641', NULL, NULL);
INSERT INTO `bank_lists` VALUES (17, 'Banco Banerj S.A.', '029', NULL, NULL);
INSERT INTO `bank_lists` VALUES (18, 'Banco Banestado S.A.', '038', NULL, NULL);
INSERT INTO `bank_lists` VALUES (19, 'Banco Bankpar S.A.', '000', NULL, NULL);
INSERT INTO `bank_lists` VALUES (20, 'Banco Barclays S.A.', '740', NULL, NULL);
INSERT INTO `bank_lists` VALUES (21, 'Banco BBM S.A.', '107', NULL, NULL);
INSERT INTO `bank_lists` VALUES (22, 'Banco Beg S.A.', '031', NULL, NULL);
INSERT INTO `bank_lists` VALUES (23, 'Banco BM&F de Serviços de Liquidação e Custódia S.A', '096', NULL, NULL);
INSERT INTO `bank_lists` VALUES (24, 'Banco BMG S.A.', '318', NULL, NULL);
INSERT INTO `bank_lists` VALUES (25, 'Banco BNP Paribas Brasil S.A.', '752', NULL, NULL);
INSERT INTO `bank_lists` VALUES (26, 'Banco Boavista Interatlântico S.A.', '248', NULL, NULL);
INSERT INTO `bank_lists` VALUES (27, 'Banco Bradesco BBI S.A.', '036', NULL, NULL);
INSERT INTO `bank_lists` VALUES (28, 'Banco Bradesco Cartões S.A.', '204', NULL, NULL);
INSERT INTO `bank_lists` VALUES (29, 'Banco Brascan S.A.', '225', NULL, NULL);
INSERT INTO `bank_lists` VALUES (30, 'Banco BVA S.A.', '044', NULL, NULL);
INSERT INTO `bank_lists` VALUES (31, 'Banco Cacique S.A.', '263', NULL, NULL);
INSERT INTO `bank_lists` VALUES (32, 'Banco Caixa Geral – Brasil S.A.', '473', NULL, NULL);
INSERT INTO `bank_lists` VALUES (33, 'Banco Calyon Brasil S.A.', '222', NULL, NULL);
INSERT INTO `bank_lists` VALUES (34, 'Banco Cargill S.A.', '040', NULL, NULL);
INSERT INTO `bank_lists` VALUES (35, 'Banco Citicard S.A.', 'M08', NULL, NULL);
INSERT INTO `bank_lists` VALUES (36, 'Banco CNH Capital S.A.', 'M19', NULL, NULL);
INSERT INTO `bank_lists` VALUES (37, 'Banco Comercial e de Investimento Sudameris S.A.', '215', NULL, NULL);
INSERT INTO `bank_lists` VALUES (38, 'Banco Cooperativo do Brasil S.A. – BANCOOB', '756', NULL, NULL);
INSERT INTO `bank_lists` VALUES (39, 'Banco Cooperativo Sicredi S.A.', '748', NULL, NULL);
INSERT INTO `bank_lists` VALUES (40, 'Banco Credit Suisse (Brasil) S.A.', '505', NULL, NULL);
INSERT INTO `bank_lists` VALUES (41, 'Banco Cruzeiro do Sul S.A.', '229', NULL, NULL);
INSERT INTO `bank_lists` VALUES (42, 'Banco da Amazônia S.A.', '003', NULL, NULL);
INSERT INTO `bank_lists` VALUES (43, 'Banco da China Brasil S.A.', '083-3', NULL, NULL);
INSERT INTO `bank_lists` VALUES (44, 'Banco Daycoval S.A.', '707', NULL, NULL);
INSERT INTO `bank_lists` VALUES (45, 'Banco de Lage Landen Brasil S.A.', 'M06', NULL, NULL);
INSERT INTO `bank_lists` VALUES (46, 'Banco de Pernambuco S.A. – BANDEPE', '024', NULL, NULL);
INSERT INTO `bank_lists` VALUES (47, 'Banco de Tokyo-Mitsubishi UFJ Brasil S.A.', '456', NULL, NULL);
INSERT INTO `bank_lists` VALUES (48, 'Banco Dibens S.A.', '214', NULL, NULL);
INSERT INTO `bank_lists` VALUES (49, 'Banco do Estado de Sergipe S.A.', '047', NULL, NULL);
INSERT INTO `bank_lists` VALUES (50, 'Banco do Estado do Pará S.A.', '037', NULL, NULL);
INSERT INTO `bank_lists` VALUES (51, 'Banco do Estado do Rio Grande do Sul S.A.', '041', NULL, NULL);
INSERT INTO `bank_lists` VALUES (52, 'Banco do Nordeste do Brasil S.A.', '004', NULL, NULL);
INSERT INTO `bank_lists` VALUES (53, 'Banco Fator S.A.', '265', NULL, NULL);
INSERT INTO `bank_lists` VALUES (54, 'Banco Fiat S.A.', 'M03', NULL, NULL);
INSERT INTO `bank_lists` VALUES (55, 'Banco Fibra S.A.', '224', NULL, NULL);
INSERT INTO `bank_lists` VALUES (56, 'Banco Ficsa S.A.', '626', NULL, NULL);
INSERT INTO `bank_lists` VALUES (57, 'Banco Finasa BMC S.A.', '394', NULL, NULL);
INSERT INTO `bank_lists` VALUES (58, 'Banco Ford S.A.', 'M18', NULL, NULL);
INSERT INTO `bank_lists` VALUES (59, 'Banco GE Capital S.A.', '233', NULL, NULL);
INSERT INTO `bank_lists` VALUES (60, 'Banco Gerdau S.A.', '734', NULL, NULL);
INSERT INTO `bank_lists` VALUES (61, 'Banco GMAC S.A.', 'M07', NULL, NULL);
INSERT INTO `bank_lists` VALUES (62, 'Banco Guanabara S.A.', '612', NULL, NULL);
INSERT INTO `bank_lists` VALUES (63, 'Banco Honda S.A.', 'M22', NULL, NULL);
INSERT INTO `bank_lists` VALUES (64, 'Banco Ibi S.A. Banco Múltiplo', '063', NULL, NULL);
INSERT INTO `bank_lists` VALUES (65, 'Banco IBM S.A.', 'M11', NULL, NULL);
INSERT INTO `bank_lists` VALUES (66, 'Banco Industrial do Brasil S.A.', '604', NULL, NULL);
INSERT INTO `bank_lists` VALUES (67, 'Banco Industrial e Comercial S.A.', '320', NULL, NULL);
INSERT INTO `bank_lists` VALUES (68, 'Banco Indusval S.A.', '653', NULL, NULL);
INSERT INTO `bank_lists` VALUES (69, 'Banco Intercap S.A.', '630', NULL, NULL);
INSERT INTO `bank_lists` VALUES (70, 'Banco Investcred Unibanco S.A.', '249', NULL, NULL);
INSERT INTO `bank_lists` VALUES (71, 'Banco Itaú BBA S.A.', '184', NULL, NULL);
INSERT INTO `bank_lists` VALUES (72, 'Banco ItaúBank S.A', '479', NULL, NULL);
INSERT INTO `bank_lists` VALUES (73, 'Banco Itaucred Financiamentos S.A.', 'M09', NULL, NULL);
INSERT INTO `bank_lists` VALUES (74, 'Banco J. P. Morgan S.A.', '376', NULL, NULL);
INSERT INTO `bank_lists` VALUES (75, 'Banco J. Safra S.A.', '074', NULL, NULL);
INSERT INTO `bank_lists` VALUES (76, 'Banco John Deere S.A.', '217', NULL, NULL);
INSERT INTO `bank_lists` VALUES (77, 'Banco Lemon S.A.', '065', NULL, NULL);
INSERT INTO `bank_lists` VALUES (78, 'Banco Luso Brasileiro S.A.', '600', NULL, NULL);
INSERT INTO `bank_lists` VALUES (79, 'Banco Merrill Lynch de Investimentos S.A.', '755', NULL, NULL);
INSERT INTO `bank_lists` VALUES (80, 'Banco Modal S.A.', '746', NULL, NULL);
INSERT INTO `bank_lists` VALUES (81, 'Banco Nossa Caixa S.A.', '151', NULL, NULL);
INSERT INTO `bank_lists` VALUES (82, 'Banco Opportunity S.A.', '045', NULL, NULL);
INSERT INTO `bank_lists` VALUES (83, 'Banco Panamericano S.A.', '623', NULL, NULL);
INSERT INTO `bank_lists` VALUES (84, 'Banco Paulista S.A.', '611', NULL, NULL);
INSERT INTO `bank_lists` VALUES (85, 'Banco Pine S.A.', '643', NULL, NULL);
INSERT INTO `bank_lists` VALUES (86, 'Banco Prosper S.A.', '638', NULL, NULL);
INSERT INTO `bank_lists` VALUES (87, 'Banco Rabobank International Brasil S.A.', '747', NULL, NULL);
INSERT INTO `bank_lists` VALUES (88, 'Banco Rodobens S.A.', 'M16', NULL, NULL);
INSERT INTO `bank_lists` VALUES (89, 'Banco Rural Mais S.A.', '072', NULL, NULL);
INSERT INTO `bank_lists` VALUES (90, 'Banco Schahin S.A.', '250', NULL, NULL);
INSERT INTO `bank_lists` VALUES (91, 'Banco Simples S.A.', '749', NULL, NULL);
INSERT INTO `bank_lists` VALUES (92, 'Banco Société Générale Brasil S.A.', '366', NULL, NULL);
INSERT INTO `bank_lists` VALUES (93, 'Banco Sofisa S.A.', '637', NULL, NULL);
INSERT INTO `bank_lists` VALUES (94, 'Banco Sumitomo Mitsui Brasileiro S.A.', '464', NULL, NULL);
INSERT INTO `bank_lists` VALUES (95, 'Banco Topázio S.A.', '082-5', NULL, NULL);
INSERT INTO `bank_lists` VALUES (96, 'Banco Toyota do Brasil S.A.', 'M20', NULL, NULL);
INSERT INTO `bank_lists` VALUES (97, 'Banco Triângulo S.A.', '634', NULL, NULL);
INSERT INTO `bank_lists` VALUES (98, 'Banco UBS Pactual S.A.', '208', NULL, NULL);
INSERT INTO `bank_lists` VALUES (99, 'Banco Volkswagen S.A.', 'M14', NULL, NULL);
INSERT INTO `bank_lists` VALUES (100, 'Banco Votorantim S.A.', '655', NULL, NULL);
INSERT INTO `bank_lists` VALUES (101, 'Banco VR S.A.', '610', NULL, NULL);
INSERT INTO `bank_lists` VALUES (102, 'Banco WestLB do Brasil S.A.', '370', NULL, NULL);
INSERT INTO `bank_lists` VALUES (103, 'BANESTES S.A. Banco do Estado do Espírito Santo', '021', NULL, NULL);
INSERT INTO `bank_lists` VALUES (104, 'Banif-Banco Internacional do Funchal (Brasil)S.A.', '719', NULL, NULL);
INSERT INTO `bank_lists` VALUES (105, 'BB Banco Popular do Brasil S.A.', '073', NULL, NULL);
INSERT INTO `bank_lists` VALUES (106, 'BES Investimento do Brasil S.A.-Banco de Investimento', '078', NULL, NULL);
INSERT INTO `bank_lists` VALUES (107, 'BPN Brasil Banco Múltiplo S.A.', '069', NULL, NULL);
INSERT INTO `bank_lists` VALUES (108, 'BRB – Banco de Brasília S.A.', '070', NULL, NULL);
INSERT INTO `bank_lists` VALUES (109, 'Citibank N.A.', '477', NULL, NULL);
INSERT INTO `bank_lists` VALUES (110, 'Concórdia Banco S.A.', '081-7', NULL, NULL);
INSERT INTO `bank_lists` VALUES (111, 'Deutsche Bank S.A. – Banco Alemão', '487', NULL, NULL);
INSERT INTO `bank_lists` VALUES (112, 'Dresdner Bank Brasil S.A. – Banco Múltiplo', '751', NULL, NULL);
INSERT INTO `bank_lists` VALUES (113, 'Hipercard Banco Múltiplo S.A.', '062', NULL, NULL);
INSERT INTO `bank_lists` VALUES (114, 'ING Bank N.V.', '492', NULL, NULL);
INSERT INTO `bank_lists` VALUES (115, 'JPMorgan Chase Bank', '488', NULL, NULL);
INSERT INTO `bank_lists` VALUES (116, 'UNIBANCO – União de Bancos Brasileiros S.A.', '409', NULL, NULL);
INSERT INTO `bank_lists` VALUES (117, 'Unicard Banco Múltiplo S.A.', '230', NULL, NULL);

-- ----------------------------
-- Table structure for case_desposits
-- ----------------------------
DROP TABLE IF EXISTS `case_desposits`;
CREATE TABLE `case_desposits`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `amount` decimal(65, 2) NULL DEFAULT NULL,
  `case_amount` decimal(65, 2) NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of case_desposits
-- ----------------------------
INSERT INTO `case_desposits` VALUES (2, 15, 22, 90000.00, NULL, '2020-09-02 00:25:08', '2020-09-02 00:25:08');

-- ----------------------------
-- Table structure for cases
-- ----------------------------
DROP TABLE IF EXISTS `cases`;
CREATE TABLE `cases`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `balance` decimal(65, 2) NULL DEFAULT 0.00,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of cases
-- ----------------------------
INSERT INTO `cases` VALUES (9, 22, 90000.00, '2020-09-02 00:25:08', '2020-09-02 00:25:08');

-- ----------------------------
-- Table structure for contract_pdfs
-- ----------------------------
DROP TABLE IF EXISTS `contract_pdfs`;
CREATE TABLE `contract_pdfs`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `admin_pdf` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `user_pdf` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `invest_type` enum('FLEXIVEL','CRESCIMENTO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `admin_pdf2` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `user_pdf2` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of contract_pdfs
-- ----------------------------

-- ----------------------------
-- Table structure for contracts
-- ----------------------------
DROP TABLE IF EXISTS `contracts`;
CREATE TABLE `contracts`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invest_type` enum('FLEXIVEL','CRESCIMENTO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `open_value` decimal(65, 2) NULL DEFAULT NULL,
  `profit_value` decimal(65, 2) NULL DEFAULT NULL,
  `start_date` date NULL DEFAULT NULL,
  `end_date` date NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `status` enum('pending','processing','expired') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT 'pending',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 63 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of contracts
-- ----------------------------
INSERT INTO `contracts` VALUES (62, 'CRESCIMENTO', 10000.00, NULL, '2020-09-02', '2021-05-02', 22, 'processing', '2020-09-02 00:41:59', '2020-09-02 00:41:59');

-- ----------------------------
-- Table structure for deposit_contracts
-- ----------------------------
DROP TABLE IF EXISTS `deposit_contracts`;
CREATE TABLE `deposit_contracts`  (
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `deposit_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  PRIMARY KEY (`deposit_id`, `plan_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Records of deposit_contracts
-- ----------------------------

-- ----------------------------
-- Table structure for deposits
-- ----------------------------
DROP TABLE IF EXISTS `deposits`;
CREATE TABLE `deposits`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `invest_type` enum('FLEXIVEL','CRESCIMENTO') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `user_value` decimal(65, 2) NULL DEFAULT NULL,
  `admin_value` decimal(65, 2) NULL DEFAULT NULL,
  `status` enum('pending','approved') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of deposits
-- ----------------------------
INSERT INTO `deposits` VALUES (7, 22, 'CRESCIMENTO', 10000.00, 10000.00, 'approved', '2020-09-02 00:41:26', '2020-09-02 00:41:59');

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
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of error_logs
-- ----------------------------

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
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = FIXED;

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
  `profit_percent` decimal(65, 0) UNSIGNED NULL DEFAULT 20,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (15, 'Test', 'CRESCIMENTO', '2020-05-08', 'FEMININO', '532.820.857-95', '+55 (12) 32132-1321', '12020-120', 'Rua Joaquim Távora', 123, '', 'Centro', 'Taubaté', 'SP', 'test@test.com', '20.000-50.000', '$2a$08$gq3TPQZtOfZwgiUlq4oBkOqjkaKUZINfujmOjss4i1oNPR1/hAp6m', '1', NULL, '2020-05-28 11:49:50', '2020-08-20 17:52:40', 'ADMIN', 'YES', NULL);
INSERT INTO `users` VALUES (20, 'Gabriel Marvila', 'FLEXIVEL', '1994-12-26', 'MASCULINO', '032.159.717-63', '+55 (21) 96932-2293', '88053-475', 'Rua dos Cações', 47, '', 'Jurerê Internacional', 'Florianópolis', 'SC', 'marvilatrader@gmail.com', '5.000-15.000', '$2a$08$imKPMwI5loXVsuJgOjaLmeZth7kFl57MQEeFAVf5kFMMRV7ScDvpW', '0', NULL, '2020-08-21 22:01:18', '2020-08-21 22:02:01', 'CLIENTE', 'YES', 20);
INSERT INTO `users` VALUES (19, 'Gabriel Marvila', 'CRESCIMENTO', '1994-12-26', 'MASCULINO', '150.158.137-67', '+55 (21) 96932-2293', '88053-475', 'Rua dos Cações', 47, '', 'Jurerê Internacional', 'Florianópolis', 'SC', 'Gabriellmarvilla@gmail.com', '20.000-50.000', '$2a$08$aBTDXMXWY4OGQnrgL3.wDelMpDsjONfWNJJptvyg5fCCgo78hlbFK', '1', NULL, '2020-08-16 00:16:13', '2020-08-16 00:16:45', 'CLIENTE', 'YES', NULL);
INSERT INTO `users` VALUES (22, 'Rian Vicente', 'FLEXIVEL', '1995-08-23', 'MASCULINO', '131.795.337-14', '+55 (21) 97045-6917', '88053-475', 'Rua dos Cações', 47, '', 'Jurerê Internacional', 'Florianópolis', 'SC', 'rianxcapital@gmail.com', '55.000-80.000', '$2a$08$N.X9Eq.q7O.Eoi4lFc.R4u1LJs/45qz6OduFSa2aZ3kuio46NkbX2', '0', NULL, '2020-09-01 22:55:42', '2020-09-01 22:55:58', 'CLIENTE', 'YES', 20);

-- ----------------------------
-- Table structure for withdraws
-- ----------------------------
DROP TABLE IF EXISTS `withdraws`;
CREATE TABLE `withdraws`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` decimal(65, 2) NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `status` enum('pending','approved','canceled') CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT 'pending',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `case_value` decimal(65, 2) NULL DEFAULT NULL,
  `cpf` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of withdraws
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
