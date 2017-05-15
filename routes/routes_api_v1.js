/**
 * Created by Kayvon Rahimi on 10-5-2017.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../db/db_connector');

//Test cities
router.get('/cities/test', function(req, res){
    res.send('Test cities.');
});

//Search city by ID or get all cities
router.get('/cities/:id?', function (req, res) {
    var id = req.params.id;
    var query_str;

    if (id) {
        query_str = 'SELECT * FROM city WHERE ID = "' + id + '";';
    }
    else {
        query_str = 'SELECT * FROM city;';
    }

    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        })
    });
});

//add city to db
router.post('/cities/add', function (req, res) {
    var city = {
        ID: req.body.id,
        Name: req.body.name,
        CountryCode: req.body.countrycode,
        District: req.body.district,
        Population: req.body.population
    };

    var qry_strng  = "INSERT INTO city (ID, Name, CountryCode, District, Population) VALUES ('" +
        city.ID + "', '" +
        city.Name + "', '"+
        city.CountryCode + "', '"+
        city.District + "', '" +
        city.Population +"');";

    console.log(qry_strng);

    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(qry_strng, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        })
    });
});

//Search country by code or get all countries
router.get('/countries/:id?', function (req, res) {
    var code = req.params.id;
    var query_str;

    if (code) {
        query_str = 'SELECT * FROM country WHERE CODE = "' + code + '";';
    } else {
        res.status(404);
        res.json({ "description" : "404 - Response not found.    Wrong parameter, please check your URL again and verify your country code."});
    }

    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        })
    });
});

//Update a city in DB
router.put('/cities/edit/:id?', function(req, res){
    var cityId = req.params.id;

    var city = {
        ID: req.body.id,
        Name: req.body.name,
        CountryCode: req.body.countrycode,
        District: req.body.district,
        Population: req.body.population
    };

    var qry_strng  = "UPDATE city SET Name = '" +
        city.Name + "' " +
        "WHERE ID = " + cityId + ");";



});


//add country to DB:
router.post('/countries/add', function(req,res ){
   var country = {
       Code: req.body.code,
       Name: req.body.name,
       Continent: req.body.continent,
       Region: req.body.region,
       SurfaceArea: req.body.surfacearea,
       IndepYear: req.body.indepyear,
       Population: req.body.population,
       LifeExpectancy: req.body.lifeexpectancy,
       GNP: req.body.gnp,
       GNPOld: req.body.old,
       LocalName: req.body.localname,
       GovernmentForm: req.body.governmentform,
       HeadOfState: req.body.headofstate,
       Capital: req.body.capital,
       Code2: req.body.code2
   };

   var qry_strng = "INSERT INTO country VALUES ('" +
       country.Code + "', '" +
       country.Name + "', '" +
       country.Continent + "', '" +
       country.Region + "', '" +
       country.SurfaceArea + "', '" +
       country.IndepYear + "', '" +
       country.Population + "', '" +
       country.LifeExpectancy + "', '" +
       country.GNP + "', '" +
       country.GNPOld + "', '" +
       country.LocalName + "', '" +
       country.GovernmentForm + "', '" +
       country.HeadOfState + "', '" +
       country.Capital + "', '" +
       country.Code2 + "');";

    console.log(qry_strng);

    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(qry_strng, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        })
    });
});

router.get('*', function(request, response){
    response.status(404);
    response.json({ "description" : "404 - Response not found.    Wrong parameter, please check your URL again."});
});

module.exports = router;