const router = require("express").Router()
const Cart = require("../db/items")
const User = require("../db/username")

const Axios = require("axios")
const oauth = require("axios-oauth-client")
const getKey = require("./keyGenerator/getKey")
const url = require("url");

// Oauth2 Key Generation Every 29 Minutes. Updates across modules.
/////////////////////////////////////////////////////////////////////
let token

Promise.resolve(getKey()).then(res => token = res)

setInterval(async function() {
        token = await getKey()
}, 1740000)


router.get('/', async(req, res) => {
    res.status(200).json(token)
})
/////////////////////////////////////////////////////////////////////


router.get('/products', async(req, res) => {
    try {
        console.log(req.query)

        let endpoint = "https://api.kroger.com/v1/products?"

        for (const query in req.query) {
            endpoint += `${query}=${req.query[query]}&`
        }

        const Authorization = `Bearer ${token}`

        const response = await Axios.get(endpoint, {
            headers: {
                "Accept": "application/json",
                Authorization
            }
        })

        res.status(200).send({
            endpointRequested: endpoint,
            data: response.data
        })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router