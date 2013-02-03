var jquery = require('fs').readFileSync("./jquery/jquery-1.8.3.min.js").toString(),
    jsdom = require('jsdom'),
    request = require('request');
    ENDPOINT = 'http://www.onelook.com/?w=*&loc=revfp2&clue=',
    PROVIDER = "onelook";


function scrape(term, callback) {

    var result = {
        provider: PROVIDER,
        result: []
    };

    var onelookTerm = makeOneLookTerm(term);

    console.log(ENDPOINT + onelookTerm);

    request({
        uri: ENDPOINT + onelookTerm,
        host: "www.onelook.com",
        referer: "http://www.onelook.com/reverse-dictionary.shtml"
    }, 
    function (error, response, body) {

        console.log("Response code: " + response);

        if (error) {
            console.log(PROVIDER + ": REQUEST ERROR");
            console.log(error);
            callback(result);
        } else {

            handleResponse(body, callback, result);
        }
    });
}

function makeOneLookTerm(term) {
    return term.replace(' ', '+');
}

function handleResponse(body, callback, result) {
        
    jsdom.env({
        html: body,
        src: [jquery],
        done: function(errors, window) {

            if (errors) {
                console.log("DOM ERROR");
                callback(result);
            } else {

                var $ = window.$;
                $('table').find('a').each(function() {
                    console.log($(this).html());
                });

                callback(result);
            }
        }
    });
}




exports.fetch = scrape;

