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

                if(text.includes('no')){
                    convo.say(`My job here is done! `);
                    fetch(GIPHY_URL + 'May the force be with you!')
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
                    self.askForActivityType(convo, client);
                }
                
            });
    },


    feelbackLastIdea: function(convo, client, lastActivity) {
        convo.ask({
                    text: `Did you enjoy my last suggestion,"`+lastActivity.activity+`" ?`,
                    quickReplies: ['Yup', 'Not at all!']
                }, (payload, convo) => {
                const text = payload.message.text;

                if(text == 'Yup'){
                  convo.set('actType', lastActivity.type);

                  convo.say(`Great! here's something similar! `).then(() => self.suggestNewActivity(convo, client));

                } else{
                  convo.say(`Ooops! `).then(() => self.askForActivityType(convo, client));
                    
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

    const GET_ACTIVITY_BY_TYPE = gql`
        query getActivityByType($atype: String!) {
         activity(type: $atype) {
           activity
           accessibility
           type
           participants
           price
           key
         }
        }
    `;

    client
      .query({
        query: GET_ACTIVITY_BY_TYPE,
        variables: {
          atype: convo.get('actType'),
        }
      })
      .then((returnedData) => {

        convo.set('activityKey', returnedData.data.activity.key)

        convo.ask({
            text: returnedData.data.activity.activity,
            quickReplies: ['I like it!','You\'ve got to be kidding?! 😒']
        }, (payload, convo) => {
            
            const text = payload.message.text;
            if(text=='I like it!'){



               //save this activity against user

               const SAVE_USER_ACTIVITY = gql`
                    mutation saveUser($userId: String!, $activityKey: String!) {
                        saveActivityForUser(userId: $userId, activityKey :$activityKey)
                        {
                            userId
                            activities {
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


                client.mutate({
                    mutation: SAVE_USER_ACTIVITY,
                    variables: {
                      userId: convo.get('userId'),
                      activityKey: convo.get('activityKey')
                    }
                  })
                  .then((returnedData) => {

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
                  });


            } else{

                convo.say(`Okay!`).then(() => self.askForActivityType(convo, client));

            }
            
            
        });


    });






    }
    
};

module.exports = self;