const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//using passport local mongoose
const passportLocalMongoose = require('passport-local-mongoose');


const User = new Schema({
    admin:   {
        type: Boolean,
        default: false
    }
});

exports.updateUser = async (req, res, next) => {
    try {
        const updated = await User.update(req.body, {
            where : { id : req.body.id },
            returning : true
        });
        res.status(200).json({
            message: `User with id ${req.body.id} (${updated[1][0].dataValues.lastName},
                 ${updated[1][0].dataValues.firstName}) updated. Full data:`,
            user: updated[1][0].dataValues
        });
        console.log(updated[1][0].dataValues);
    } catch (err) {
        res.status(404).json({ error : err });
    }
}

exports.deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
        await User.destroy({where : { id : userId }});
        res.status(200).json({ outcome: `User with id ${userId} deleted.`});
    } catch(err) {
        console.log(err);
        res.status(404).json({ error : err });
    }
}



//the plugin goes here to support the username and password
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);