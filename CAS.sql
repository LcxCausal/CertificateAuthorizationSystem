/*
 Navicat Premium Data Transfer

 Source Server         : blockchain-mysql
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : 192.168.1.100:3306
 Source Schema         : CAS

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 15/12/2019 17:50:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_agency
-- ----------------------------
DROP TABLE IF EXISTS `tb_agency`;
CREATE TABLE `tb_agency`  (
  `nounce` int(11) NOT NULL AUTO_INCREMENT,
  `agencyID` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `agencyInfo` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `levelID` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`nounce`) USING BTREE,
  UNIQUE INDEX `agencyID`(`agencyID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_agency
-- ----------------------------
INSERT INTO `tb_agency` VALUES (1, 'CN20190101', '国家教育部', 'CN201901');
INSERT INTO `tb_agency` VALUES (2, 'CN20190102', '国家创新比赛部', 'CN201901');
INSERT INTO `tb_agency` VALUES (3, 'P20190201', '四川省教育部', 'P201902');
INSERT INTO `tb_agency` VALUES (4, 'P20190202', '贵州省教育部', 'P201902');
INSERT INTO `tb_agency` VALUES (5, 'P20190203', '山东省教育部', 'P201902');
INSERT INTO `tb_agency` VALUES (6, 'M20190301', '北京市教育部', 'M201903');
INSERT INTO `tb_agency` VALUES (7, 'M20190302', '天津市教育部', 'M201903');
INSERT INTO `tb_agency` VALUES (8, 'U20190401', '四川师范大学', 'U201904');
INSERT INTO `tb_agency` VALUES (9, 'U20190402', '四川大学', 'U201904');
INSERT INTO `tb_agency` VALUES (10, 'C20190501', '计算机科学学院', 'C201905');
INSERT INTO `tb_agency` VALUES (11, 'C20190502', '物理与电子信息工程学院', 'C201905');
INSERT INTO `tb_agency` VALUES (12, 'C20190503', '地理资源与环境科学学院', 'C201905');

-- ----------------------------
-- Table structure for tb_certificate
-- ----------------------------
DROP TABLE IF EXISTS `tb_certificate`;
CREATE TABLE `tb_certificate`  (
  `nounce` int(11) NOT NULL AUTO_INCREMENT,
  `certID` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `certHash` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userAddress` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `agencyID` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `levelID` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `awardDate` date NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`nounce`) USING BTREE,
  UNIQUE INDEX `certID`(`certID`) USING BTREE,
  UNIQUE INDEX `certHash`(`certHash`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_certificate
-- ----------------------------
INSERT INTO `tb_certificate` VALUES (1, 'CN20190101001', '-9a9f560a', '0x72d0ec81b831eAA15bb079b3F50Bc77cB37eaEC9', 'CN20190101', 'CN201901', '2019-08-23', '这是国家教育部颁发给account1的国家级证书，证书编号为：CN20190101001，颁发时间为2019年8月23日。');
INSERT INTO `tb_certificate` VALUES (2, 'CN20190102001', '-9335bac3', '0xCb7B8038012CFFAbe2f5bb53F35802b4d95b58a6', 'CN20190102', 'CN201901', '2019-08-22', '这是国家创新比赛部颁发给account2的国家级证书，证书编号为：CN20190102001，颁发时间为2019年8月22日。');
INSERT INTO `tb_certificate` VALUES (3, 'P20190201001', '28b5fde7', '0x2e75f86F1BB687816e6F338ce6220CAd7760f7f7', 'P20190201', 'P201902', '2019-08-20', '这是四川省教育部颁发给account3的省级证书，证书编号为：P20190201001，颁发时间为2019年8月20日。');
INSERT INTO `tb_certificate` VALUES (4, 'M20190301001', '-30df069c', '0x353601273e85c5885f45699B92e723524CC12798', 'M20190301', 'M201903', '2019-07-23', '这是北京市教育部颁发给account4的市级证书，证书编号为：M20190301001，颁发时间为2019年7月23日。');
INSERT INTO `tb_certificate` VALUES (5, 'U20190401001', '-7d18a3bc', '0x52C25AD333795F9E6d55dcda313885894632F385', 'U20190401', 'U201904', '2019-09-23', '这是四川师范大学颁发给account5的校级证书，证书编号为：U20190401001，颁发时间为2019年9月23日。');
INSERT INTO `tb_certificate` VALUES (6, 'C20190501001', '-895d586a', '0x52C25AD333795F9E6d55dcda313885894632F385', 'C20190501', 'C201905', '2019-09-23', '这是计算机科学学院颁发给account5的院级证书，证书编号为：C20190501001，颁发时间为2019年9月23日。');
INSERT INTO `tb_certificate` VALUES (7, 'CN20190101000', '0xjasdhlakehfleelifaliofao', '0x72d0ec81b831eAA15bb079b3F50Bc77cB37eaEC9', 'CN20190101', 'CN201901', '2019-08-23', '这是国家教育部颁发给account1的国家级证书，证书编号为：CN20190101001，颁发时间为2019年8月2日。');
INSERT INTO `tb_certificate` VALUES (9, 'CN20190101010', '0xjasdhlakehfleelifaliofajdshjschdjo', '0x72d0ec81b831eAA15bb079b3F50Bc77cB37eaEC9', 'CN20190101', 'CN201901', '2019-08-23', '这是国家教育部颁发给account1的国家级证书，证书编号为：CN20190101001，颁发时间为2019年8月3日。');

INSERT INTO `tb_certificate` VALUES (10, 'CN20190101002', '-9a9f560a2', '0xD95fA32Ff98b978611799781c6CfbeB243d5cf8E', 'CN20190101', 'CN201901', '2019-08-23', '这是国家教育部颁发给account1的国家级证书，证书编号为：CN20190101001，颁发时间为2019年8月23日。');
INSERT INTO `tb_certificate` VALUES (11, 'CN20190102002', '-9335bac32', '0x6d58ADa35FB7B00348703f1434a09eB465b0B06B', 'CN20190102', 'CN201901', '2019-08-22', '这是国家创新比赛部颁发给account2的国家级证书，证书编号为：CN20190102001，颁发时间为2019年8月22日。');
INSERT INTO `tb_certificate` VALUES (12, 'P20190201002', '28b5fde72', '0x2186424ee6df5ccD519760289CD5002c5f8981D8', 'P20190201', 'P201902', '2019-08-20', '这是四川省教育部颁发给account3的省级证书，证书编号为：P20190201001，颁发时间为2019年8月20日。');
INSERT INTO `tb_certificate` VALUES (13, 'M20190301002', '-30df069c2', '0x494528C26b87C407eD502f90EEf59D6164e73A54', 'M20190301', 'M201903', '2019-07-23', '这是北京市教育部颁发给account4的市级证书，证书编号为：M20190301001，颁发时间为2019年7月23日。');
INSERT INTO `tb_certificate` VALUES (14, 'U20190401002', '-7d18a3bc2', '0xD3b4F606C74DB0782DCA40d55e7BD5Ed285E9a87', 'U20190401', 'U201904', '2019-09-23', '这是四川师范大学颁发给account5的校级证书，证书编号为：U20190401001，颁发时间为2019年9月23日。');
INSERT INTO `tb_certificate` VALUES (15, 'C20190501002', '-895d586a2', '0xD3b4F606C74DB0782DCA40d55e7BD5Ed285E9a87', 'C20190501', 'C201905', '2019-09-23', '这是计算机科学学院颁发给account5的院级证书，证书编号为：C20190501001，颁发时间为2019年9月23日。');
INSERT INTO `tb_certificate` VALUES (16, 'CN201901010012', '0xjasdhlakehfleelifaliofao2', '0xD95fA32Ff98b978611799781c6CfbeB243d5cf8E', 'CN20190101', 'CN201901', '2019-08-23', '这是国家教育部颁发给account1的国家级证书，证书编号为：CN20190101001，颁发时间为2019年8月2日。');
INSERT INTO `tb_certificate` VALUES (17, 'CN201901010112', '0xjasdhlakehfleelifaliofajdshjschdjo2', '0xD95fA32Ff98b978611799781c6CfbeB243d5cf8E', 'CN20190101', 'CN201901', '2019-08-23', '这是国家教育部颁发给account1的国家级证书，证书编号为：CN20190101001，颁发时间为2019年8月3日。');

-- ----------------------------
-- Table structure for tb_level
-- ----------------------------
DROP TABLE IF EXISTS `tb_level`;
CREATE TABLE `tb_level`  (
  `nounce` int(11) NOT NULL AUTO_INCREMENT,
  `levelID` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `levelInfo` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`nounce`) USING BTREE,
  UNIQUE INDEX `levelID`(`levelID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_level
-- ----------------------------
INSERT INTO `tb_level` VALUES (1, 'CN201901', '国家级');
INSERT INTO `tb_level` VALUES (2, 'P201902', '省级');
INSERT INTO `tb_level` VALUES (3, 'M201903', '市级');
INSERT INTO `tb_level` VALUES (4, 'U201904', '校级');
INSERT INTO `tb_level` VALUES (5, 'C201905', '学院级');

-- ----------------------------
-- Table structure for tb_recorder
-- ----------------------------
DROP TABLE IF EXISTS `tb_recorder`;
CREATE TABLE `tb_recorder`  (
  `nounce` int(11) NOT NULL AUTO_INCREMENT,
  `userAddress` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `certID` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`nounce`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_recorder
-- ----------------------------
INSERT INTO `tb_recorder` VALUES (1, '0x72d0ec81b831eAA15bb079b3F50Bc77cB37eaEC9', 'CN20190102001');
INSERT INTO `tb_recorder` VALUES (2, '0xD95fA32Ff98b978611799781c6CfbeB243d5cf8E', 'CN20190102001');

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user`  (
  `nounce` int(11) NOT NULL AUTO_INCREMENT,
  `userAddress` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userInfo` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userLevel` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`nounce`) USING BTREE,
  UNIQUE INDEX `userAddress`(`userAddress`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES (1, '0x72d0ec81b831eAA15bb079b3F50Bc77cB37eaEC9', 'account1', 1);
INSERT INTO `tb_user` VALUES (2, '0xCb7B8038012CFFAbe2f5bb53F35802b4d95b58a6', 'account2', 0);
INSERT INTO `tb_user` VALUES (3, '0x2e75f86F1BB687816e6F338ce6220CAd7760f7f7', 'account3', 0);
INSERT INTO `tb_user` VALUES (4, '0x353601273e85c5885f45699B92e723524CC12798', 'account4', 0);
INSERT INTO `tb_user` VALUES (5, '0x52C25AD333795F9E6d55dcda313885894632F385', 'account5', 0);

INSERT INTO `tb_user` VALUES (6, '0xD95fA32Ff98b978611799781c6CfbeB243d5cf8E', 'account1', 1);
INSERT INTO `tb_user` VALUES (7, '0x6d58ADa35FB7B00348703f1434a09eB465b0B06B', 'account2', 0);
INSERT INTO `tb_user` VALUES (8, '0x2186424ee6df5ccD519760289CD5002c5f8981D8', 'account3', 0);
INSERT INTO `tb_user` VALUES (9, '0x494528C26b87C407eD502f90EEf59D6164e73A54', 'account4', 0);
INSERT INTO `tb_user` VALUES (10, '0xD3b4F606C74DB0782DCA40d55e7BD5Ed285E9a87', 'account5', 0);

SET FOREIGN_KEY_CHECKS = 1;
