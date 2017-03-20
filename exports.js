'use strict';
var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
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
      console.log("TravisPerkins");
      var numberOfProducts = this.event.request.intent.slots.numberOfProducts.value
      var product = this.event.request.intent.slots.product.value
      var output = "You have ordered " + numberOfProducts + " " + product;
      var cardTitle = 'Travis Perkins';
      var cardContent = 'You have ordered a product from Travis Perkins';
      this.emit(':tell', output);
    },
    'AMAZON.HelpIntent': function () {
        this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
        this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest':function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'Unhandled': function () {
        this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
        this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    }
};

var languageStrings = {
    "en": {
        "translation": {
            "SKILL_NAME": "Travis Perkins",
            "WELCOME_MESSAGE": "Welcome to %s. You can ask a question like, what\'s the recipe for a chest? ... Now, what can I help you with.",
            "WELCOME_REPROMPT": "For instructions on what you can say, please say help me.",
            "DISPLAY_CARD_TITLE": "%s  - Recipe for %s.",
            "HELP_MESSAGE": "You can ask questions such as, what\'s the recipe, or, you can say exit...Now, what can I help you with?",
            "HELP_REPROMPT": "You can say things like, what\'s the recipe, or you can say exit...Now, what can I help you with?",
            "STOP_MESSAGE": "Goodbye!",
            "RECIPE_REPEAT_MESSAGE": "Try saying repeat.",
            "RECIPE_NOT_FOUND_MESSAGE": "I\'m sorry, I currently do not know ",
            "RECIPE_NOT_FOUND_WITH_ITEM_NAME": "the recipe for %s. ",
            "RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME": "that recipe. ",
            "RECIPE_NOT_FOUND_REPROMPT": "What else can I help with?"
        }
    },
    "en-US": {
        "translation": {
            "SKILL_NAME": "Travis Perkins",
        }
    },
    "en-GB": {
        "translation": {
          "SKILL_NAME": "Travis Perkins",
        }
    },
};
