'use strict';
const BootBot = require('bootbot');

const newUserModule = require('./module/new_user_driver.js');
const oldUserModule = require('./module/old_user_driver.js');

const bot = new BootBot({
  accessToken: 'EAAEfVjbvWdUBAFNDB04dVvHbGvUOebvKnQqUFLriYzUpjQCzyqLMjFQF9ldTAYyZA6UGKF1F6kozVffumhxlvGkluwe6OMpidD8k3CcEVDasXqVXH1DL0fisEqN3Bk8kZBPOTcSZCKXYY8RdXG4CdUuQ94IKPfufrxWOPlfcQZDZD',
  verifyToken: 'team11',
  appSecret: '2c0ee0cd40a73013cf18e0cc4ebd066a'
});

bot.on('message', (payload, chat) => {

	chat.conversation((convo) => {

		console.log(payload);

		//Send greetings.
		
		//call graphql

		//if new user

		newUserModule.haveConversion(convo);



		//else if old user

		// oldUserModule.haveConversion(convo);


	});
});

// bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
// 	// Send a text message followed by another text message that contains a typing indicator
// 	chat.say('Hello, human friend!').then(() => {
// 		chat.say('How are you today?', { typing: true });
// 	});
// });

// bot.hear(['food', 'hungry'], (payload, chat) => {
// 	// Send a text message with quick replies
// 	chat.say({
// 		text: 'What do you want to eat today?',
// 		quickReplies: ['Mexican', 'Italian', 'American', 'Argentine']
// 	});
// });

// bot.hear(['help'], (payload, chat) => {
// 	// Send a text message with buttons
// 	chat.say({
// 		text: 'What do you need help with?',
// 		buttons: [
// 			{ type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
// 			{ type: 'postback', title: 'FAQ', payload: 'HELP_FAQ' },
// 			{ type: 'postback', title: 'Talk to a human', payload: 'HELP_HUMAN' }
// 		]
// 	});
// });

// bot.hear('image', (payload, chat) => {
// 	// Send an attachment
// 	chat.say({
// 		attachment: 'image',
// 		url: 'http://example.com/image.png'
// 	});
// });

// bot.hear('ask me something', (payload, chat) => {

// 	const askName = (convo) => {
// 		convo.ask(`What's your name?`, (payload, convo) => {
// 			const text = payload.message.text;
// 			convo.set('name', text);
// 			convo.say(`Oh, your name is ${text}`).then(() => askFavoriteFood(convo));
// 		});
// 	};

// 	const askFavoriteFood = (convo) => {
// 		convo.ask(`What's your favorite food?`, (payload, convo) => {
// 			const text = payload.message.text;
// 			convo.set('food', text);
// 			convo.say(`Got it, your favorite food is ${text}`).then(() => sendSummary(convo));
// 		});
// 	};

// 	const sendSummary = (convo) => {
// 		convo.say(`Ok, here's what you told me about you:
// 	      - Name: ${convo.get('name')}
// 	      - Favorite Food: ${convo.get('food')}`);
//       convo.end();
// 	};

// 	chat.conversation((convo) => {
// 		askName(convo);
// 	});
// });

bot.start();