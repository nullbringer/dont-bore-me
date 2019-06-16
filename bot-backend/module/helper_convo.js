const constants = require('./../data/constant.js');
import { gql } from 'apollo-boost';

const GET_GIPHY_BY_KEYWORD = gql`
  query getGifById($kw: String!) {
    gifById(search: $kw) {
      image_url
    }
  }
  `;



var self = {
    
    preText: function(convo, client) {
        convo.ask({
                    text: `Bored?`,
                    quickReplies: ['Yes 😐', 'Hell no!']
                }, (payload, convo) => {
                const text = payload.message.text;

                if(text.includes('no')){
                    convo.say(`My job here is done! `);

                    client
                      .query({
                        query: GET_GIPHY_BY_KEYWORD,
                        variables: {
                          kw: 'May the force be with you!',
                        }
                      })
                      .then((returnedData) => {
                          convo.say({
                            attachment: 'image',
                            url: returnedData.data.gifById.image_url
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
                self.makeDecision(convo,client, returnedData);
        });
    },

    suggestNewActivityPriceLimit: function(convo, client, maxPrice) {

        //call graphql and provide an activity

        if(maxPrice>=0.6)maxPrice = 0.5
        else maxPrice = 0.3

        const GET_ACTIVITY_BY_PRICE = gql`
          query getActivityByPrice($price: Float!) {
            activityByPrice(price: $price) {
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
            query: GET_ACTIVITY_BY_PRICE,
            variables: {
              price: maxPrice,
            }
          })
          .then((returnedData) => {
                self.makeDecision(convo,client, returnedData);
        });
    },

    makeDecision: function(convo, client, returnedData) {

        convo.set('activityKey', returnedData.data.activity.key);

        const actPrice = returnedData.data.activity.price; 
        const priceIndicator ="";
        if(actPrice>0.3 && actPrice<0.6)priceIndicator = "$$"
        else if(actPrice>=0.6)priceIndicator = "$$$"


        const textToAsk = returnedData.data.activity.activity + `
          Price - ` + priceIndicator;

        const qrOptions =  ['Sounds good','Never!!!! 😒'];

        if(priceIndicator)qrOptions.push('Too Pricey!')



        convo.ask({
            text: returnedData.data.activity.activity,
            quickReplies: qrOptions
        }, (payload, convo) => {
            
            const text = payload.message.text;
            if(text=='Sounds good'){

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

                      client
                      .query({
                            query: GET_GIPHY_BY_KEYWORD,
                            variables: {
                              kw: 'thumb',
                            }
                          })
                          .then((returnedData) => {
                              convo.say({
                                attachment: 'image',
                                url: returnedData.data.gifById.image_url
                              }, {
                                typing: true
                              });
                        });
                        convo.end();
                  });


            } else if(text=='Too Pricey!'){

                self.suggestNewActivityPriceLimit(convo, client, actPrice);

            }else{

                convo.say(`Okay!`).then(() => self.askForActivityType(convo, client));

            }
            
            
        });

    }
    
};

module.exports = self;