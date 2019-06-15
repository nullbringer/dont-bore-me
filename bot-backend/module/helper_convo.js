const constants = require('./../data/constant.js');
import { gql } from 'apollo-boost';

const fetch = require('node-fetch');
const GIPHY_URL = `https://api.giphy.com/v1/gifs/search?api_key=Ky0tspF0p3JZsGCSt5D25iD11Q4rX0oB&limit=25&offset=0&rating=G&lang=en&q=`;

var self = {
    
    preText: function(convo, client) {




        convo.ask({
                    text: `Bored?`,
                    quickReplies: ['Yes 😐', 'Hell no!']
                }, (payload, convo) => {
                const text = payload.message.text;

                if(text == 'Nope'){
                    convo.say(`My job here is done! May the force be with you!`);
                    convo.end();

                } else{
                    self.askForActivityType(convo, client);
                }
                
            });
    },


    askForActivityType: function(convo, client) {

            convo.ask({
                text: `What would you like to do?`,
                quickReplies: constants.ACTIVITY_TYPES
            }, (payload, convo) => {
                const text = payload.message.text;
                convo.set('actType', text);

                self.suggestNewActivity(convo, client);

                
            });
        },


    suggestNewActivity: function(convo, client) {

        //call graphql and provide an activity

    const GET_BORED_BY_ID = gql`
        query getBoredById($atype: String!   ) {
         activity(type: $atype) {
           activity
           type
           price

         }
        }
    `;

    client
      .query({
        query: GET_BORED_BY_ID,
        variables: {
          atype: convo.get('actType'),
        }
      })
      .then((returnedData) => {

        console.log(returnedData);
      

              convo.ask({
            text: returnedData.data.activity.activity,
            quickReplies: ['I like it!','You\'ve got to be kidding?! 😒']
        }, (payload, convo) => {
            
            const text = payload.message.text;
            if(text=='I like it!'){

                // convo.say(`Great. See you!`);


              fetch(GIPHY_URL + 'thumbs')
                .then(res => res.json())
                .then(json => {
                  convo.say({
                    attachment: 'image',
                    url: json.data[0].images.original.url
                  }, {
                    typing: true
                  });
                });


                convo.end();


            } else{

                convo.say(`Okay!`).then(() => self.askForActivityType(convo, client));

            }
            
            
        });


    });






    }
    
};

module.exports = self;