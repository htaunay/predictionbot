var builder = require('botbuilder');
var predictor = require('./lib/predictor.js');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = process.env.LUIS_URL;
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

// Add intent handlers
dialog.matches('JustName', function(session) {

    predictor.predict(session.message.text, function(result) {
     	session.send(result);
    });
});

dialog.matches('NextGame', function(session, args) {

	var team = builder.EntityRecognizer.findEntity(args.entities, 'team');
	if(!team) session.send('Sorry, don\'t nkow what team is that.');

    predictor.predict(team.entity, function(result) {
     	session.send(result);
    });
});

dialog.onDefault(builder.DialogAction.send("I'm sorry, what?"));
