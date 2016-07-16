var fs = require('fs');
var request = require('request');

/***************************** Private Methods *******************************/

var extractOdds = function(html) {

    var line = html.split('Palpite do Bing: </span>')[1].split('</div>')[0];
    return line;
};

var solvePrediction = function(odds) {

    var prediction = {};
    var tokens = odds.split(' &#183; ');

    prediction['home'] = {
        'name': tokens[0].split(' ')[0],
        'odds': tokens[0].split(' ')[1].slice(0, -1),
        'oponent': 'away'
    };

    prediction['tie'] = {
        'odds': tokens[1].split(' ')[1].slice(0, -1)
    };

    prediction['away'] = {
        'name': tokens[2].split(' ')[0],
        'odds': tokens[2].split(' ')[1].slice(0, -1),
        'oponent': 'home'
    };

    if( prediction.tie.odds > prediction.home.odds &&
        prediction.tie.odds > prediction.away.odds) {

        prediction['result'] = 'tie';
    }
    else if(prediction.home.odds > prediction.away.odds) {

        prediction['result'] = 'home';
    }
    else {

        prediction['result'] = 'away';
    }

    return prediction;
}

var buildMessage = function(odds) {

    var prediction = solvePrediction(odds);

    if(prediction.result == 'tie') {
        return 'Looks like its going to be a tie between ' +
            prediction.home.name + ' and ' + prediction.away.name;
    }
    else {

        var winner = prediction[prediction.result];
        var loser  = prediction[winner.oponent];

        return 'Looks like there about ' + winner.odds + ' chances that ' +
            winner.name + ' will beat ' + loser.name;
    }
}

var getPrediction = function(team, cb) {

    var query = 'http://www.bing.com/?mkt=pt-BR&q=proximo+jogo+' + team;
    request(query, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            var odds = extractOdds(body);
            cb(buildMessage(odds));
        }
        else {
            cb('I\'m busy right now. Go away.');
        }
    });
};


/***************************** Public Methods ********************************/

var predictor = {};

predictor.predict = function(team, cb) {

    getPrediction(team, cb);
};

module.exports = predictor;
