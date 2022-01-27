const { DataTypes } = require('sequelize')
const db = require("./database")
const crypto = require('crypto') //auth implementation


const Username = db.define('username', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'username',
            key: 'id'
        }
    },

    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            notNull: true,
            isEmail: true
        }
    },

    password: { //auth implementation
        type: DataTypes.STRING,
        get() {
            return () => this.getDataValue("password");
        }
    },

    salt: { //auth implementation
        type: DataTypes.STRING,
        get() {
            return () => this.getDataValue("salt");
        }
    },

    image: {
        type: DataTypes.STRING(2048),
        defaultValue: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },

    address: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    zipcode: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    city: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    country: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },

},
{
    freezeTableName: true
});

Username.generateSalt = function() {
    return crypto.randomBytes(16).toString("base64"); //auth implementation
};

Username.encryptPassword = function(plainText, salt) { //auth implementation
    return crypto
        .createHash("RSA-SHA256")
        .update(plainText)
        .update(salt)
        .digest("hex");
};

Username.prototype.correctPassword = function(candidatePwd) { //auth implementation
    return Username.encryptPassword(candidatePwd, this.salt()) === this.password();
};

const setSaltAndPassword = username => { //auth implementation
    if (username.changed("password")) {
        username.salt = Username.generateSalt();
        username.password = Username.encryptPassword(username.password(), username.salt());
    }
};

Username.beforeCreate(setSaltAndPassword); //auth implementation
Username.beforeUpdate(setSaltAndPassword); //auth implementation

module.exports = Username