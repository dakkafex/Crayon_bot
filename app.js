const Botmaster = require('botmaster');

const botmaster = new Botmaster();

const MessengerBot = require('botmaster-messenger');
// you can also use: import MessengerBot from 'botmaster-messenger' if  using ES6 modules via Babel
const TwitterBot = require('botmaster-twitter-dm');

const messengerSettings = {
  credentials: {
    verifyToken: 'YOUR verifyToken',
    pageToken: 'YOUR pageToken',
    fbAppSecret: 'YOUR fbAppSecret',
  },
  webhookEndpoint: 'webhook1234', // botmaster will mount this webhook on https://Your_Domain_Name/messenger/webhook1234
};

const twitterSettings = {
  credentials: {
    consumerKey: '3mIwrxAiXHaIFBYqgRu4asrBn',
    consumerSecret: 'Z8q4zc3sjboF1rLdG2md4u2zmI07qKjqEGYEZNYLOajgloNUxn',
    accessToken: '2766067813-L7Ts6SSVxCK6UdTtpl6Xg4ykmPa1JKSAZWzjxAh',
    accessTokenSecret: 'PfGjUN3TIuX0PZv6bl7CiBh3d43oIuN6soncf7pnxlmmC',
  }
}

const messengerBot = new MessengerBot(messengerSettings);
const twitterBot = new TwitterBot(twitterSettings);

botmaster.addBot(messengerBot);
botmaster.addBot(twitterBot);

myIncomingMiddlewareController = (bot, update) => {
  if (update.message.text === 'hi' ||
      update.message.text === 'Hi' ||
      update.message.text === 'hello' ||
      update.message.text === 'Hello') {
    return bot.reply(update, 'well hi right back at you');
  } else if (update.message.text.indexOf('weather') > -1) {
    return bot.sendTextMessageTo('It is currently sunny in Philadelphia', update.sender.id);
  } else {
    const messages = ['I\'m sorry about this.',
                      'But it seems like I couldn\'t understand your message.',
                      'Could you try reformulating it?']
    return bot.sendTextCascadeTo(messages, update.sender.id)
  }
};

botmaster.use({
  type: 'incoming',
  name: 'My incoming middleware',
  controller: myIncomingMiddlewareController,
});