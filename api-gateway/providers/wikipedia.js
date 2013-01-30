var jquery = require('fs').readFileSync("./jquery/jquery-1.8.3.min.js").toString(),
    jsdom = require('jsdom'),
    request = require('request');
    ENDPOINT = 'http://en.wikipedia.org/wiki/',
    PROVIDER = "wikipedia";


var CUT_FROM_1 = '<span class="mw-headline" id="See_also">See also</span></h2>',
    CUT_FROM_2 = '<ul>',
    CUT_TO = '<span class="mw-headline" id="References">References</span>',
    CUT_TO_ALTERNATIVE = '<span class="mw-headline" id="Notes">Notes</span>',
    MAX_WORD_COUNT = 3;


function scrape(term, callback) {

    var result = {
        provider: PROVIDER,
        result: []
    };

    var wikiTerm = makeWikiTerm(term);

    request(ENDPOINT + wikiTerm, function (error, response, body) {

        if (error) {
            console.log("REQUEST ERROR");
            callback(result);
        } else {

            handleResponse(body, callback, result);
        }
    });
}

function makeWikiTerm(term) {
    var spacesReplaced = term.replace(' ', '_');
    return spacesReplaced.charAt(0).toUpperCase() + spacesReplaced.slice(1);
}

function handleResponse(body, callback, result) {
    if (body.indexOf(CUT_FROM_1) < 0) {
        console.log("CUT ERROR");
        callback(result);
    } else {

        var fromSeeAlsoSection = body.slice(body.indexOf(CUT_FROM_1) + CUT_FROM_1.length);
        var clutterRemoved = fromSeeAlsoSection.slice(fromSeeAlsoSection.indexOf(CUT_FROM_2));

        var end1 = clutterRemoved.indexOf(CUT_TO);
        var end2 = clutterRemoved.indexOf(CUT_TO_ALTERNATIVE);
        if (end1 < 0) end1 = 300000000;
        if (end2 < 0) end2 = 300000000;
        var cutTo = (end1 < end2) ? end1 : end2;

        console.log(end1 + ", " + end2);
        console.log(cutTo);
        
        var seeAlsoSection = clutterRemoved.slice(0, cutTo);
        
        jsdom.env({
            html: seeAlsoSection,
            src: [jquery],
            done: function(errors, window) {

                if (errors) {
                    console.log("DOM ERROR");
                    callback(result);
                } else {

                    var $ = window.$;
                    $('a').each(
                        function() { 
                            var phrase = $(this).html(),
                                words = wordCount(phrase);

                            if (words > 0 && words < 4) {
                                result.result.push($(this).html());
                            }
                        }
                    );

                    callback(result);
                }
            }
        });
    }
}

function wordCount(str) {
    var count = 0;
    words = str.split(" "); 
    for (i=0 ; i < words.length ; i++){
        if (words[i] != "") {
            count += 1; 
        }
    }   
    return count;
}



exports.fetch = scrape;

