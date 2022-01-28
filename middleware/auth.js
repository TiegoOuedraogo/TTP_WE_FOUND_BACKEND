const jwt = require("jsonwebtoken")
const WeFoundUser = require("../db/weFoundUsers")

const auth = async (req, res, next) => {
    try {
        console.log(req.header("Authorization"))
        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, "ihopethisworks")
        const user = await WeFoundUser.findOne({
            where: {
                superId: decoded.superId,
            }
        })

        if(!user) {
            throw new Error("User not found")
        }

        let login = false
        for (const liveToken of user.tokens) {
            if (liveToken.token === token) {
                login = true
                break
            }
        }

        if(!login) {
            throw new Error("User token not found")
        }

        req.token = token
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({
            error: "Please authenticate with a valid token"
        })
    }
}

module.exports = auth