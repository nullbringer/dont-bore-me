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
                    fetch(GIPHY_URL + 'Get out of here!')
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



    askForActivityType: function(convo, client) {

        
            convo.ask({
            //     text: `What would you like to do?`,
            //     quickReplies: constants.ACTIVITY_TYPES
            // }, (payload, convo) => {
            //     const text = payload.message.text;
            //     convo.set('actType', text);

            //     self.suggestNewActivity(convo, client);

              
            text: `Did you enjoy my last suggestion, " "?`,
            quickReplies: ['Yup', 'Not at all!']
        }, (payload, convo) => {
        const text = payload.message.text
        // const userId = convo.get('userId')
        if(text=="Yup"){
            const GET_LAST_ACTIVIT_BY_USER_ID = gql`
            query getUser {
                user(userId: $userId) {
                userId
                activities{
                activity
                accessibility
                type
                price
                }
                }
                }
                `;
            client
            .query({
                query: GET_LAST_ACTIVIT_BY_USER_ID,
                variables: {
                userId: convo.get('userId'),
                }
            })
            .then((returnedData) => {
                // TO DO - Get returned data activity type query HERE!
                convo.set('activityKey', returnedData.data.activity[0].type)
       
            });

        } else{
            self.askForActivityType(convo, client);
        }

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
                                thumbs         key
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