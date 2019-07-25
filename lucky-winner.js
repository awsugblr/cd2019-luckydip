const Alexa = require('ask-sdk');

const GetNewLuckyWinnerHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewLuckyWinnerIntent');
  },
  handle(handlerInput) {
    const nameArr = name;
    const emailArr = email;
    const luckyWinnerIndex = Math.floor(Math.random() * nameArr.length);
    const randomName = nameArr[luckyWinnerIndex];
    const randomEmail = emailArr[luckyWinnerIndex]
    const speechOutput = GET_LUCKYWINNERNAME_MESSAGE + randomName + " ...with " + GET_LUCKYWINNEREMAIL_MESSAGE + randomEmail;
    console.log(speechOutput);

    return handlerInput.responseBuilderd
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomName)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Lucky Winner';
const GET_LUCKYWINNERNAME_MESSAGE = 'Lucky winner of AWS Community Day, Bangalore 2019 is...';
const GET_LUCKYWINNEREMAIL_MESSAGE = 'registered email address...';
const HELP_MESSAGE = 'You can say pick a lucky winner, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const name = [
  'Participant 1',
  'Participant 2',
  'Participant 3',
  'Participant 4',
];

const email = [
    'participant1@example.com',
    'participant2@example.com',
    'participant3@example.com',
    'participant4@example.com',
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewLuckyWinnerHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
