const constants = require('./../data/constant.js');
const helperConvo = require('./helper_convo.js');

module.exports = {
    
    haveConversion: function(convo, client, lastActivity) {

        helperConvo.feelbackLastIdea(convo, client, lastActivity);

                    
    }
    
};