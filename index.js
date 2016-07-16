var builder = require('botbuilder');
var predictor = require('./predictor.js');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);
bot.dialog('/', function (session) {
    predictor.predict(session.message.text, function(result) {
        session.send(result);
    });
});
