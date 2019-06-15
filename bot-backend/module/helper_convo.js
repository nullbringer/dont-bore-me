const constants = require('./../data/constant.js');
import { gql } from 'apollo-boost';

var self = {
    
    preText: function(convo, client) {

        convo.ask({
                    text: `Are you bored?`,
                    quickReplies: ['Yes 😐', 'Nope']
                }, (payload, convo) => {
                const text = payload.message.text;

                if(text == 'Nope'){
                    convo.say(`Great. Have a great day`);
                    convo.end();

                } else{
                    self.askForActivityType(convo, client);
                }
                
            });
    },


    askForActivityType: function(convo, client) {

            convo.ask({
                text: `What type of activity would you like to do?`,
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
            quickReplies: ['I like it!','No, That\'s boring 😒']
        }, (payload, convo) => {
            
            const text = payload.message.text;
            if(text=='I like it!'){

                convo.say(`Great. See you!`);
                convo.end();


            } else{

                convo.say(`Okay!`).then(() => self.askForActivityType(convo, client));

            }
            
            
        });


    });






    }
    
};

module.exports = self;