const router = require("express").Router()
const CartItem = require("../db/cartItems")
const WeFoundUser = require("../db/weFoundUsers")

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

        const validQueries = ["filter.term", "filter.locationId", "filter.productId", "filter.brand", "filter.fulfillment", "filter.start", "filter.limit"]

        for (const query in req.query) {
            if (validQueries.includes(query))
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
        res.status(500).send({
            error: "An error occurred attempting to communicate with the Kroger API. Check your request URL for errors. " +
                "If this takes you more than five minutes, contact your API technical support specialist."
        })
    }
})

router.get('/products/:id', async(req, res) => {
    try {
        console.log(req.query)
        console.log(req.params)
        let endpoint = `https://api.kroger.com/v1/products/${req.params.id}`

        location = req.query["filter.locationId"]

        if (req.query.hasOwnProperty("filter.locationId")) {
            endpoint += `?locationId=${location}`
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
        res.status(500).send({
            error: "An error occurred attempting to communicate with the Kroger API. Check your request URL for errors. " +
                "If this takes you more than five minutes, contact your API technical support specialist."
        })
    }
})

router.get('/locations', async(req, res) => {
    try {
        console.log(req.query)

        let endpoint = "https://api.kroger.com/v1/locations?"

        const mustIncludeOne = ["filter.zipCode.near", "filter.latLong.near", "filter.lat.near", "filter.lon.near"]
        let atLeastOne = false
        let moreThanOne = false

        for (const query in req.query) {
            console.log(query)
            endpoint += `${query}=${req.query[query]}&`
            if (mustIncludeOne.includes(query) && atLeastOne === true) {
                moreThanOne = true
            } else if (mustIncludeOne.includes(query)) {
                atLeastOne = true
            }


        }

        if (atLeastOne === false || moreThanOne === true)
            throw Error("You must include a zipcode, latlong, or latNear & lonNear as query parameters. " +
                "See the Kroger API documentation for more information: https://developer.kroger.com/reference/#operation/SearchLocations")


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
        res.status(500).send({
            error: "An error occurred attempting to communicate with the Kroger API. Check your request URL for errors. " +
                "If this takes you more than five minutes, contact your API technical support specialist. " +
                "Please note: You must include a zipcode, latlong, or latNear & lonNear as query parameters. "  +
                "See the Kroger API documentation for more information: https://developer.kroger.com/reference/#operation/SearchLocations",
        })
    }
})

router.get('/locations/:id', async(req, res) => {
    try {
        console.log(req.query)
        console.log(req.params)
        let endpoint = `https://api.kroger.com/v1/locations/${req.params.id}`

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
        res.status(500).send({
            error: "An error occurred attempting to communicate with the Kroger API. Check your request URL for errors. " +
                "If this takes you more than five minutes, contact your API technical support specialist."
        })
    }
})

module.exports = router