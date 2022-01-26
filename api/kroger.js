const router = require("express").Router()
const Cart = require("../db/items")
const User = require("../db/username")

const Axios = require("axios")
const oauth = require("axios-oauth-client")

// Function to get key from Kroger

router.get('/getKey', async(req, res) => {
    try {
        async function getKey() {
            const getClientCredentials = oauth.client(Axios.create(), {
                url: process.env.KROGER_TOKENURL,
                grant_type: 'client_credentials',
                client_id: process.env.KROGER_CLIENTID,
                client_secret: process.env.KROGER_CLIENTSECRET,
                scope: process.env.KROGER_PRODUCT_SCOPE
            })

            const auth = await getClientCredentials()
            res.status(200).send(auth)
        }

        await getKey()

    } catch(e) {
        console.log(e)
        res.status(404).send(e)
    }
})

module.exports = router