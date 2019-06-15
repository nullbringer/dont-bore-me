const constants = require('./../data/constant.js');

var self = {
    
    preText: function(convo) {

        convo.ask({
                    text: `Are you bored?`,
                    quickReplies: ['Yes 😐', 'Nope']
                }, (payload, convo) => {
                const text = payload.message.text;

                if(text == 'Nope'){
                    convo.say(`Great. Have a great day`);
                    convo.end();

                } else{
                    self.askForActivityType(convo);
                }


                // convo.set('name', text);
                
            });
    },


    askForActivityType: function(convo) {

            convo.ask({
                text: `What type of activity would you like to do?`,
                quickReplies: constants.ACTIVITY_TYPES
            }, (payload, convo) => {
                const text = payload.message.text;

                self.suggestNewActivity(convo);

                
            });
        },


    suggestNewActivity: function(convo) {

        //call graphql and provide an activity

        convo.ask({
            text: `Explore the nightlife of your city`,
            quickReplies: ['I like it!','No, That\'s boring 😒']
        }, (payload, convo) => {
            
            const text = payload.message.text;
            if(text=='I like it!'){

                convo.say(`Great. See you!`);
                convo.end();


            } else{
                self.suggestNewActivity(convo);

            }
            
            
        });


    }
    
};

module.exports = self;