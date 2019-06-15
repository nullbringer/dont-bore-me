const constants = require('./../data/constant.js');

module.exports = {
    
    haveConversion: function(convo) {

        


        const askName = (convo) => {
            convo.ask({
                    text: `Are you bored?`,
                    quickReplies: ['Yes 😐', 'Nope']
                }, (payload, convo) => {
                const text = payload.message.text;

                if(text == 'Nope'){
                    convo.say(`Great. Have a great day`);
                    convo.end();

                } else{
                    askForActivityType(convo);
                }


                convo.set('name', text);
                
            });
        };

        const askForActivityType = (convo) => {  

            convo.ask({
                text: `What type of activity would you like to do?`,
                quickReplies: constants.ACTIVITY_TYPES
            }, (payload, convo) => {
                const text = payload.message.text;

                suggestNewActivity(convo);

                
            });
        };

        const suggestNewActivity = (convo) => {

            //call graphql and provide an activity

            convo.ask({
                text: `Explore the nightlife of your city`,
                quickReplies: ['I like it!','No, That\'s boring 😒']
            }, (payload, convo) => {
                
                const text = payload.message.text;

                convo.say(`Great. See you!`);

                convo.end();

                
            });


        };

        askName(convo);


                    

    }
    
};