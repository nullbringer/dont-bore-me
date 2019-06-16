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
  accessToken: 'EAAERy6fChI8BADRZABscfQ3hA0Jf5VHYSaU2x31D1ZAX8NEInKGzDuEhXtwC5M9uOFnAJ5RcMoWKU3chC4E0ZCsRJVhHuc1zqEwlvFf6ispfX6SzUv5xHaVv3tafXRaWVFk5qDH1DRGrR56ZBflzPBGBNsqZCGnHWorprTnVe5QZDZD',
  verifyToken: 'team11',
  appSecret: 'c973318f19e3ed341f94a6d6097aa17f'
});

bot.on('message', (payload, chat) => {

	console.log(payload);


});


bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {

	// console.log(payload);

	chat.conversation((convo) => {

		chat.getUserProfile().then((user) => {
		    
		    chat.say(`Hello, ${user.first_name}!`).then(()  => {

	    	    const GET_USER_DETAILS = gql`
					query getUser($userId: String!) {
						user(userId: $userId) {
							activities{
								activity
								accessibility
								type
								participants
								price
								key
							}
						}
					}
			    `;


				client.query({
				    query: GET_USER_DETAILS,
				    variables: {
				      userId: user.id,
				    }
				  })
				  .then((returnedData) => {

				  	console.log(returnedData.data.user.activities);

				  	convo.set('userId', user.id);

			  		if (returnedData.data.user.activities === undefined || returnedData.data.user.activities.length == 0) {
					    //if new user
						newUserModule.haveConversion(convo, client);

					} else {

						console.log("this is an old user!!");
						oldUserModule.haveConversion(convo, client, returnedData.data.user.activities[0]);

					}

				  });
		    });

		  });

	});
});

bot.start(process.env.PORT || 3000);