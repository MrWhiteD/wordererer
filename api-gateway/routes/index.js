
var wordnik = require('../providers/wordnik'),
    bighuge = require('../providers/bighuge'),
    wikipedia = require('../providers/wikipedia');

/*
 * GET home page.
 */

exports.harvest = function(req, res) {

    getData(req.query["term"], function (result) {
        res.end(JSON.stringify(result));
    });
};


function getData(term, callback) {

    var count = 0,
        expected = 3,
        result = [];

    function onResponse (data) {

        result.push(data);

        if (++count === expected) {
            
            callback({
                apis: result
            });

        }
    }

    bighuge.fetch(term, onResponse);
    wordnik.fetch(term, onResponse);
    wikipedia.fetch(term, onResponse);
} 