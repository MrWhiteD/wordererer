
var request = require('request'),
    API_KEY = "53558374e2b2c5cde4641077df90779261432f59cfe233dfd",
    ENDPOINT = 'http://api.wordnik.com/v4/words.json/reverseDictionary?includeTags=false&limit=25&skip=0&api_key=' + API_KEY,
    PROVIDER = "wordnik";


function httpRequest(term, callback) {

    var result = {
        provider: PROVIDER
    };

    request(ENDPOINT + '&query=' + encodeURI(term), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            result.result = parseResponse(body) || [];
        } else {
            result.result = [];
        }
        callback(result);
    });
}

function parseResponse(response) {

    var responseObject = parseJson(response),
        result = [];
    
    forEachInResult(responseObject, function (element) {
        result.push(element.word);
    });

    return result;
}

function parseJson(data) {
    try {
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function forEachInResult(responseObject, callback) {
    if (responseObject.results) {
        for (var i = 0; i < responseObject.results.length; i++) {
            callback(responseObject.results[i]);
        }
    }
}

exports.fetch = httpRequest;