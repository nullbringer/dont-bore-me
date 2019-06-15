// 'use strict';
import 'cross-fetch/polyfill';
import ApolloClient, { gql } from 'apollo-boost';

const BootBot = require('bootbot');


const newUserModule = require('./module/new_user_driver.js');
const oldUserModule = require('./module/old_user_driver.js');

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

const bot = new BootBot({
  accessToken: 'EAAdIlEun0UsBADH6AT6nyTYyUZBxzbGo6KlCXIPVF4q3UFFgBbHvoyKFAb0t6FC3Ml1bKt5kcbDZC1kVlZCrPyl8dpaDU1BQOHfZC7pp33CvJxyuLaKboQRnHINLfM2sZC4hwJZAB9AIbM6ZBTVBaB1S6g8QcIhCvXJQUVEwIpZAsAZDZD',
  verifyToken: 'team11',
  appSecret: '2c0ee0cd40a73013cf18e0cc4ebd066a'
});

bot.on('message', (payload, chat) => {

	console.log(payload);

	// const GET_BORED_BY_ID = gql`
	// 	query getBoredById {
	// 	 activity(type: "recreational") {
	// 	   activity
	// 	   type
	// 	   price

	// 	 }
	// 	}
	// `;

	// client
	//   .query({
	//     query: GET_BORED_BY_ID,
	//   })
	//   .then(console.log);






});

bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {

	chat.conversation((convo) => {

		console.log(payload);

		//Send greetings.
		
		//call graphql

		//if new user

		newUserModule.haveConversion(convo,client);



		//else if old user

		// oldUserModule.haveConversion(convo);


	});


});

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