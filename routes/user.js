var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "cmi",
    password: "cmi",
    database: "cmi"
});

router.get('/', function(req, res, next) {
    if (req.query.id) {
      var query = "SELECT comptes.ID_Compte, CONCAT(u.Labo, '_', NumeroCompte, '_', " +
          "CASE WHEN NomCompte = 'Projet par défaut' THEN u.projectnum ELSE NomCompte END) AS IntituleCompte " +
          "FROM comptes JOIN (SELECT ID_Compte, ID_User FROM utilcomptes WHERE ID_User = ?) " +
          "uc ON uc.ID_Compte = comptes.ID_Compte JOIN (SELECT ID_User, Labo, projectnum FROM utilisateur) u " +
          "ON uc.ID_User = u.ID_User WHERE comptes.ID_Compte != 'cp0003' ORDER BY NumeroCompte";
      con.query(query, [req.query.id], function (err, rows) {
          if (err) throw err;
          console.log('Data received from Db !');
          console.log(req.query.id);
          res.send(rows);
      });
    }
    else {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

module.exports = router;
