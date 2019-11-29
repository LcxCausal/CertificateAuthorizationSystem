
// Import 'express' module.
var express = require('express');

// Import 'body-parser'.
var bodyParser = require('body-parser');

// Import 'hashcode'.
var encode = require('hashcode').hashCode;

// Init app.
var app = express();

// Apply application/x-www-form-urlencoded code parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static('public'));

// Import 'mysql' module.
var mysql = require('mysql');

// Import 'os' module.
var os = require('os');

// Auto acqure server IP.
var networkInterfaces = os.networkInterfaces();
var hostIP = networkInterfaces.ens33[0].address;

// Edit mysql connection configuration infomation.
var mysqlConnectionConfiguration = {
  host: hostIP,
  user: 'root',
  password: 'root',
  database: 'CAS',
  port: '3306'
};

// Function: Open connection.
function openConnection(connection) {
  connection.connect(function (err) {
    if (err) throw err;
  });
}

// Function: Close connection.
function closeConnection(connection) {
  connection.end(function (err) {
    if (err) throw err;
  });
}

// Function: query certificate hash by where clause.
function queryCertificateHash(whereClause, connection, res) {

  var queryString = "SELECT certHash FROM tb_certificate " + whereClause;

  connection.query(queryString, function (err, results) {

    if (err) throw err;

    var jsonResults = [];

    for (var i = 0; i < results.length; i++) {
      jsonResults.push(JSON.parse('{ \"certHash\" : \"' + results[i].certHash + '\"}'));
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ 'certHash': jsonResults });

  });

}

// Function: query certificate hash by user address.
function queryCertificertHashByUserAddress(userAddress, connection, res) {
  var whereClause = "WHERE userAddress = '" + userAddress + "'";
  queryCertificateHash(whereClause, connection, res);
}

// 'Get' method: query certificate hash by user address.
app.get('/findCertificateHashByUserAddress', function (req, res) {

  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Select certificate hash by user address.
  queryCertificertHashByUserAddress(req.query.userAddress, connection, res);

  // Close mysql connection.
  closeConnection(connection);

})

// 'Post' method: query certificate hash by user address.
app.post('/findCertificateHashByUserAddressPost', function (req, res) {

  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Select certificate hash by user address.
  queryCertificertHashByUserAddress(req.body.userAddress, connection, res);

  // Close mysql connection.
  closeConnection(connection);

})

// Function: query certificate hash by user address and level id.
function queryCertificateHashByUserAddressAndLevelID(userAddress, levelID, connection, res) {
  var whereClause = "WHERE userAddress = '" + userAddress + "' AND " + "levelID ='" + levelID + "'";
  queryCertificateHash(whereClause, connection, res);
}

// 'Get' method: query certificate hash by user address and level.
app.get('/findCertificateHashByUserAddressAndLevelID', function (req, res) {

  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Select all certificate hash by user address and level id.
  queryCertificateHashByUserAddressAndLevelID(req.query.userAddress, req.query.levelID, connection, res);

  // Close mysql connection.
  closeConnection(connection);

})

// 'Post' method: query certificate hash by level.
app.post('/findCertificateHashByUserAddressAndLevelIDPost', function (req, res) {

  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Select all certificate hash by level id.
  queryCertificateHashByUserAddressAndLevelID(req.body.userAddress, req.body.levelID, connection, res);

  // Close mysql connection.
  closeConnection(connection);

})

// Function: query certificate hash by user address and agency id.
function queryCertificateHashByRecorderAddressAndAgencyID(userAddress, agencyID, connection, res) {
  var whereClause = "WHERE userAddress='" + userAddress + "' AND agencyID='" + agencyID + "'";
  queryCertificateHash(whereClause, connection, res);
}

// 'Get' method: query certificate hash by user address and agency id.
app.get('/findCertificateHashByUserAddressAndAgencyID', function (req, res) {

  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Select all certificate hash by user address and agency id.
  queryCertificateHashByRecorderAddressAndAgencyID(req.query.userAddress, req.query.agencyID, connection, res);

  // Close mysql connection.
  closeConnection(connection);

})

// 'Post' method: query certificate hash by user address and agency id.
app.post('/findCertificateHashByUserAddressAndAgencyIDPost', function (req, res) {

  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Select all certificate hash by agency id.
  queryCertificateHashByRecorderAddressAndAgencyID(req.body.userAddress, req.body.agencyID, connection, res);

  // Close mysql connection.
  closeConnection(connection);

})

// Function: query certificate hash by user address and date.
function queryCertificateHashByRecorderAddressAndDate(userAddress, startDate, endDate, connection, res) {
  var whereClause = "WHERE userAddress='" + userAddress + "' and date(awardDate) BETWEEN '" + startDate + "' AND '" + endDate + "'";
  queryCertificateHash(whereClause, connection, res);
}

// 'Get' method: query certificate hash by user address and date.
app.get('/findCertificateHashByUserAddressAndDate', function (req, res) {

  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Query certificate hash by user address and date.
  queryCertificateHashByRecorderAddressAndDate(req.query.userAddress, req.query.startDate, req.query.endDate, connection, res);

  // Close mysql connection.
  closeConnection(connection);

})

// 'Post' method: query certificate hash by user address and date.
app.post('/findCertificateHashByUserAddressAndDatePost', function (req, res) {

  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Query certificate hash by user address and date.
  queryCertificateHashByRecorderAddressAndDate(req.body.userAddress, req.body.startDate, req.body.endDate, connection, res);

  // Close mysql connection.
  closeConnection(connection);

})

// Function: query certificate details by certificate hash.
function queryCertificateDetailsByHash(certHash, connection, res) {

  var queryString = "SELECT content FROM tb_certificate " + "WHERE certHash='" + certHash + "'";

  connection.query(queryString, function (err, results) {

    if (err) throw err;

    var jsonResults = [];

    for (var i = 0; i < results.length; i++) {
      jsonResults.push(JSON.parse('{ \"content\" : \"' + results[i].content + '\"}'));
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ 'content': jsonResults });

  });

}

// 'Get' method: query certificate details by certificate hash.
app.get('/getCertificateDetailsByHash', function (req, res) {

  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Query certificate details by certificate hash.
  queryCertificateDetailsByHash(req.query.certHash, connection, res);

  // Close mysql connection.
  closeConnection(connection);

})

// 'Post' method: query certificate details by certificate hash.
app.post('/getCertificateDetailsByHashPost', function (req, res) {

  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Query certificate details by certificate hash.
  queryCertificateDetailsByHash(req.body.certHash, connection, res);

  // Close mysql connection.
  closeConnection(connection);

})

// Function: add certificate.
function addCertificate(certID, userAddress, agencyID, levelID, awardDate, content, recorderAddress, connection, res) {
  var certHashContent = certID + '_' + userAddress + '_' + agencyID + '_' + levelID + '_' + awardDate + '_' + content;
  var certHash = encode().value(certHashContent).toString(16);

  var addSql = "INSERT INTO tb_certificate(certID, certHash, userAddress, agencyID, levelID, awardDate, content) VALUES(?,?,?,?,?,?,?);";
  var addSqlParameters = [certID, certHash, userAddress, agencyID, levelID, awardDate, content];

  connection.query(addSql, addSqlParameters, function (err, results) {
    if (err) throw err;
  });

  addSql = "INSERT INTO tb_recorder(userAddress, certID) VALUES('" + recorderAddress + "','" + certID + "');"
  addSqlParameters = [recorderAddress, certID];

  connection.query(addSql, addSqlParameters, function (err, results) {
    if (err) throw err;

    var jsonResults = [];
    jsonResults.push(JSON.parse('{ \"affectedRows\" : \"' + results.affectedRows + '\"}'));

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ 'OkPacket': jsonResults });
  });
}

// 'Get' method: add certificate.
app.get('/addCertificate', function (req, res) {

  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Add certificate.
  addCertificate(req.query.certID, req.query.userAddress, req.query.agencyID, req.query.levelID, req.query.awardDate, req.query.content, req.query.recorderAddress, connection, res);

  // Close mysql connection.
  closeConnection(connection);

})

// 'Post' method: add certificate.
app.post('/addCertificatePost', function (req, res) {

  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Add certificate.
  addCertificate(req.body.certID, req.body.userAddress, req.body.agencyID, req.body.levelID, req.body.awardDate, req.body.content, req.body.recoderAddress, connection, res);

  // Close mysql connection.
  closeConnection(connection);

})

// Function: query userLevel by user address
function queryUserLevelByUserAddress(userAddress, connection, res) {
  var querySql = "SELECT userLevel FROM tb_user " + "WHERE userAddress='" + userAddress + "'";
  connection.query(querySql, function (err, results) {
    if (err) throw err;

    var jsonResults = [];
    for (var i = 0; i < results.length; i++) {
      jsonResults.push(JSON.parse('{ \"userLevel\" : \"' + results[i].userLevel + '\"}'));
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ 'userLevel': jsonResults });
  });
}

// 'Get' method: query userLevel by user address
app.get('/queryUserLevelByUserAddress', function (req, res) {
  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Query userLevel by user address.
  queryUserLevelByUserAddress(req.query.userAddress, connection, res);

  // Close mysql connection.
  closeConnection(connection);
})

// 'Post' method: query userLevel by user address
app.post('/queryUserLevelByUserAddressPost', function (req, res) {
  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Query userLevel by user address.
  queryUserLevelByUserAddress(req.body.userAddress, connection, res);

  // Close mysql connection.
  closeConnection(connection);
})

// Function: query certificate levels
function queryCertLevels(connection, res) {
  var querySql = "SELECT levelID, levelInfo FROM tb_level";
  connection.query(querySql, function (err, results) {
    if (err) throw err;

    var jsonResults = [];
    for (var i = 0; i < results.length; i++) {
      jsonResults.push(JSON.parse('{ \"levelID\" : \"' + results[i].levelID + '\", \"levelInfo\" : \"' + results[i].levelInfo + '\" }'));
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ 'levels': jsonResults });
  })
}

// 'Get' method: query certLevels
app.get('/queryCertLevels', function (req, res) {
  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Query certificate levels.
  queryCertLevels(connection, res);

  // Close mysql connection.
  closeConnection(connection);
})

// 'Post' method: query certLevels
app.post('/queryCertLevelsPost', function (req, res) {
  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Query certificate levels.
  queryCertLevels(connection, res);

  // Close mysql connection.
  closeConnection(connection);
})

// Function: query certificate agencies
function queryCertAgencies(connection, res) {
  var querySql = "SELECT agencyID, agencyInfo FROM tb_agency";
  connection.query(querySql, function (err, results) {
    if (err) throw err;

    var jsonResults = [];
    for (var i = 0; i < results.length; i++) {
      jsonResults.push(JSON.parse('{ \"agencyID\" : \"' + results[i].agencyID + '\", \"agencyInfo\" : \"' + results[i].agencyInfo + '\" }'));
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ 'agencies': jsonResults });
  })
}

// 'Get' method: query certificate agencies
app.get('/queryCertAgencies', function (req, res) {
  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Query certificate agencies.
  queryCertAgencies(connection, res);

  // Close mysql connection.
  closeConnection(connection);
})

// 'Post' method: query certificate agencies
app.post('/queryCertAgenciesPost', function (req, res) {
  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Query certificate agencies.
  queryCertAgencies(connection, res);

  // Close mysql connection.
  closeConnection(connection);
})

// Function: query levelID by agencyID
function queryLevelIDByAgencyID(agencyID, connection, res) {
  var querySql = "SELECT levelID FROM tb_agency WHERE agencyID = '" + agencyID + "'";
  connection.query(querySql, function (err, results) {
    if (err) throw err;

    var jsonResults = [];
    for (var i = 0; i < results.length; i++) {
      jsonResults.push(JSON.parse('{ \"levelID\" : \"' + results[i].levelID + '\" }'));
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ 'levelID': jsonResults });
  })
}

// 'Get' method: query levelID by AgencyID
app.get('/queryLevelIDByAgencyID', function (req, res) {
  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Query levelID by agencyID.
  queryLevelIDByAgencyID(req.query.agencyID, connection, res);

  // Close mysql connection.
  closeConnection(connection);
})

// 'Post' method: query levelID by agencyID
app.post('/queryLevelIDByAgencyIDPost', function (req, res) {
  // Create mysql connection.
  var connection = mysql.createConnection(mysqlConnectionConfiguration);

  // Open connection.
  openConnection(connection);

  // Query levelID by agencyID.
  queryLevelIDByAgencyID(req.body.agencyID, connection, res);

  // Close mysql connection.
  closeConnection(connection);
})

// Add server listtener.
var server = app.listen(8080, hostIP, function () {

  var serverAddress = server.address();
  var host = serverAddress.address;
  var port = serverAddress.port;

  console.log("The server started...");
  console.log('The url is: http://' + host + ':' + port);
  console.log('......');
  console.log('......');
  console.log('......');
  console.log('Please input \'Ctrl+C\' to \'exit\'.');
})

module.exports = {
  "server": {
    "baseDir": "src",
    "routes": {
      "/node_modules": "node_modules"
    },
    "files": ["build/contracts/*.json"],
    middleware: {
      1: app,
    },
  },
  port: 3000,
};