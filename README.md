# Welcome!
### This is the home page of 'DONT-BORE-ME'
This is a chat bot app that integrates with Facebook Messenger and provides prompts for things to do when you're bored, based on data from the BoredAPI.

### Tech
* Node.js
* GraphQL
* Apollo Client
* Apollo Server
* SQLite DB

### Data Sources ( queried using GraphQL )
* BoredAPI
* GIPHY
* SQLite

### What to expect?

Picture this. You're bored. Mind-numbingly bored. So bored, you can't even begin to fathom what you might want to do with your time. Fret not! Boredom-Disintegration in progress with DON'T-BORE-ME. As a user, you interact with the chatbot on messenger. After some basic inquiries on what you might what to do to alleviate your boredom, the bot queries the BoredAPI to suggest ways to liberate you from your current bored state of existence. It stores it's suggestions in a local DB and on subsequent visits enquires about your previous experience and makes new suggestions accordingly.

### Features
* Tracks users by ID 
* Stores activity history
* Accepts feedback on prior recommendations and tailors suggestions accordingly
* Can filter by price if the idea is too expensive.
* Integrates GIFs to make conversation more entertaining using Giphy's public API
* Leverages GraphQL to limit the number of queries made, and the effort needed to parse unnneccesary json



### Installation Instructions
* Create a Facebook developer app and generate tokens. take a look at Facebook's [Quick Start Guide](https://developers.facebook.com/docs/messenger-platform/guides/quick-start) 
* Use _deploy/server_ branch as a Heroku App
* Use _deploy/bot-backend_ branch as another Heroku App
  * Change the target of Apollo client to your apollo-server url in index.js before deploying
  * Use the tokens of your facebook developer app




### Link to Demo

[https://youtu.be/WsWP3us_-j8](https://youtu.be/WsWP3us_-j8)
