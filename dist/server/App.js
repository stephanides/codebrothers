"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config_1 = require("./config");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
class App {
    constructor() {
        this.app = express();
        this.mongoose = mongoose;
        this.db = this.mongoose.connection;
        this.router = express.Router();
        this.config();
        this.routes();
        this.onError();
    }
    /*
    * Methode for establish connection with Mongo DB
    */
    dbConnect() {
        this.mongoose.connect(config_1.default.mongo);
        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', () => console.log('Connected to db'));
    }
    /*
   * Basic configuraiton of the application
   */
    config() {
        this.app.use(helmet());
        //Morgan should be off in production
        this.app.use(morgan('dev'));
        //Compression should be managed by nginx server in production
        this.app.use(bodyParser.json({ limit: '5mb' }));
        this.app.use(bodyParser.urlencoded({ parameterLimit: 10000, limit: '5mb', extended: false }));
        //Serve static files from imaginary /assets directory
        //Should be managed by nginx server in production
        this.app.use('/assets', express.static(__dirname + '/../public/'));
        this.app.set('views', path.join(__dirname, '/../views'));
        // Set pug as default template engine
        this.app.set('view engine', 'pug');
        //this.app.locals.pretty = false; //False in production
        // Connect to DB
        this.dbConnect();
    }
    /*
    * Methode for catch all errors from application
    */
    onError() {
        this.app.use((err, req, res, next) => {
            if (err) {
                res.status(err.status || 500).json({ message: err.message, success: false });
            }
            next();
        });
    }
    /*
    * Methode listing all routes of the application
    */
    routes() {
        this.router.get('/', (req, res) => {
            console.log("GET INDEX");
            res.render('index');
        });
        this.app.use(this.router);
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map