# Family Butler
An alexa skill to handle programmable tasks. Initially only handles checking Wunderlist shopping list for items.

Current intents are:

- "Ask Alfred is {item} are in my shopping list"
- "Ask Alfred to list items in my shopping list"

## Requirements

This code is intended for AWS Lambda.  In addition, you'll need to get an access key and client id from Wunderlist (https://developer.wunderlist.com/)

## Setup

1. Read the quickstart guide for setting up an Alexa skill and Lambda on AWS (https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/alexa-skill-nodejs-quick-start)
2. Clone the repo
3. Run `npm install`
4. Compress all files in the directory, including the `node_modules` directory
5. Upload the .zip file to the Lambda function
6. Set the function as `index.handler`
7. Add the following Lambda environment variables for Wunderlist: `WUNDERLIST_ACCESS_TOKEN`, `WUNDERLIST_CLIENT_ID`, `WUNDERLIST_LIST_ID`

