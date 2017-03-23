'use strict';
var Alexa = require('alexa-sdk');
var AWS = require("aws-sdk");
AWS.config.region = 'us-east-1'; //or whatever your region
Alexa.APP_ID = 'YOUR-ALEXA-APP-ID';

exports.handler = function (event, context, callback) {
	var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();
};

var handlers = {
	'LaunchRequest': function () {
		console.log("LaunchRequest");
		this.emit(':ask', 'Hi Jefferson, what product do you want to order from Travis Perkins?');
	},
	'TravisPerkins': function () {
		var numberOfProducts = this.event.request.intent.slots.numberOfProducts.value;
		var product = this.event.request.intent.slots.product.value;
		var output = "You have ordered " + numberOfProducts + " " + product;
		var cardTitle = 'Travis Perkins';
		var cardContent = 'You have ordered a product from Travis Perkins';
		var sns = new AWS.SNS();
		var paramsAddPermission = {
			AWSAccountId: ['YOUR-AWS-ACCOUNT-ID'],
			ActionName: ['Publish'],
			Label: 'AlexaPublish',
			TopicArn: 'YOUR-ARN'
		};
		console.log(paramsAddPermission);
		sns.addPermission(paramsAddPermission, function (err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			else console.log(data); // successful response
		});

		var jsonData = JSON.stringify({
			"user": "Someone",
			"quantity": numberOfProducts,
			"thing": product
		});
		console.log(jsonData);
		var paramsPublish = {
			Message: jsonData,
			Subject: 'STRING_VALUE',
			TargetArn: 'YOUR-ARN'
		};
		sns.publish(paramsPublish, function (err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			else console.log(data); // successful response
		});
		this.emit(':tell', output);
	},
	'AMAZON.HelpIntent': function () {
		this.attributes.speechOutput = this.t("HELP_MESSAGE");
		this.attributes.repromptSpeech = this.t("HELP_REPROMPT");
		this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
	},
	'AMAZON.RepeatIntent': function () {
		this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
	},
	'AMAZON.StopIntent': function () {
		this.emit('SessionEndedRequest');
	},
	'AMAZON.CancelIntent': function () {
		this.emit('SessionEndedRequest');
	},
	'SessionEndedRequest': function () {
		this.emit(':tell', this.t("STOP_MESSAGE"));
	},
	'Unhandled': function () {
		this.attributes.speechOutput = this.t("HELP_MESSAGE");
		this.attributes.repromptSpeech = this.t("HELP_REPROMPT");
		this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
	},
	'LastOrder': function () {
		this.emit(':tell', "Jefferson, you last ordered plasterboard from Travis Perkins on the 10th February 2017.");
	},
	'OweMoney': function () {
		this.emit(':tell', "Jefferson, you owe £2746.92 on your Travis Perkins account.");
	},
	'AddToBasket': function () {
		this.emit(':tell', "One Baxi boiler has been added to your basket");
	}
};
