// This file is where access keys are generated
// Access keys are generated every 29 minutes (they last for 30 minutes)
// kroger.js must import this file in order to use the access key.

const oauth = require("axios-oauth-client");
const Axios = require("axios");

async function getKey() {
    const getClientCredentials = oauth.client(Axios.create(), {
        url: process.env.KROGER_TOKENURL,
        grant_type: 'client_credentials',
        client_id: process.env.KROGER_CLIENTID,
        client_secret: process.env.KROGER_CLIENTSECRET,
        scope: process.env.KROGER_PRODUCT_SCOPE
    })
    const {access_token} = await getClientCredentials()
    return access_token
}

module.exports = getKey