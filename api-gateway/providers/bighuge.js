var request = require('request'),
    API_KEY = "9d04f8cd7cbd89966190212a0e1fee08",
    ENDPOINT = 'http://words.bighugelabs.com/api/2/' + API_KEY + '/',
    PROVIDER = "bighuge";


function httpRequest(term, callback) {

    var result = {
        provider: PROVIDER
    };

    console.log(ENDPOINT + encodeURI(term) + '/json');
    request(ENDPOINT + encodeURI(term) + '/json', function (error, response, body) {

        console.log(response.statusCode);

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
        result.push(element);
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
    console.log(responseObject);
    if (responseObject.noun && responseObject.noun.syn) {
        for (var i = 0; i < responseObject.noun.syn.length; i++) {
            callback(responseObject.noun.syn[i]);
        }
    }
}

exports.fetch = httpRequest;