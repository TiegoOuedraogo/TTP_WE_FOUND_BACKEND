require('dotenv').config();
const express = require("express")
const cors = require("cors")
const morgan = require("morgan");
const { db } = require('./db/index')

const passport = require("passport"); //auth implementation
const authRouter = require("./auth/authen"); //auth implementation
const apiRouter = require("./api"); //auth implementation
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new SequelizeStore({ db });

const app = express()
/*const PORT = 8080*/

passport.serializeUser((Username, done) => done(null, Username.id)); //auth implementation
passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.models.user.findByPk(id);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
}); //auth implementation


const syncDb = async () => {
    await db.sync({ force: true });
}

/*/!*app.use(cors())
app.use(morgan("dev"))*!/
app.use(express.json())
app.use(express.urlencoded({ extended: true }))*/

/*app.use('/api', require('./api'))*/


/*db.sync({force: true}).then(() => {
    console.log("Database synced")
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})*/


const configureApp = () => { //auth implementation
    app.use(cors())
    app.use(morgan("dev"))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))


    app.use(
        session({
            secret: "a super secretive secret key string to encrypt and sign the cookie",
            store: sessionStore,
            resave: false,
            saveUninitialized: false
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/auth", authRouter);
    app.use("/api", apiRouter);
}

const startListening = () => {
    const PORT = 8080;
    console.log("Database synced");
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
}

const bootApp = async () => {
    await sessionStore.sync();
    await syncDb();
    await configureApp();
    await startListening();
}

bootApp().then(); //auth implementation