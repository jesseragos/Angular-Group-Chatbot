# Angular Group Chatbot

An Angular 7 group chat application with chatbot feature using [Pusher](http://pusher.com/) and [Dialogflow](https://dialogflow.com) respectively.

## Requirements for local installation:
1. Node.js/npm

## Instructions:
1. Run `npm install` in root directory to install dependencies.
2. Create accounts for both Pusher (then create a channel) and Dialogflow (then create an agent). You will need the generated API credentials here for the next step. You can just search in Google or their docs in how to proceed the steps to get the API key values.
3. Create a `.env` file in the root directory and copy the contents with values from your account setup in Pusher and Dialogflow:
```
PUSHER_APP_ID="APP_ID_FROM_PUSHER"
PUSHER_APP_KEY="APP_KEY_FROM_PUSHER"
PUSHER_APP_SECRET="APP_SECRET_FROM_PUSHER"
CLUSTER="CLUSTER_FROM_PUSHER"
DIALOG_ACCESS_TOKEN="CLIENT_ACCESS_TOKEN_FROM_DIALOGFLOW"
BOT_CALLNAME="JessBot"
NG_ENV=""
```
Note that BOT_CALLNAME is loosely also reflected from a property value in the Angular codebase so you might need to update there if you are going to change the value for this environment variable. Also NG_ENV is blank as it is manually set as production if deployed to cloud hosting services like Heroku.

4. Run `npm run dev` to start both API server and development server for the Angular app.
5. This will open a browser automatically in `https://localhost:4200`
