"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
//import * as mongoose from 'mongoose';
const path = require("path");
//import config from './config';
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
//import * as http from 'http';
const email_router_1 = require("./routes/email.router");
class App {
    constructor() {
        this.app = express();
        //this.mongoose = mongoose;
        //this.db = this.mongoose.connection;
        this.router = express.Router();
        this.config();
        this.routes();
        this.onError();
    }
    /*
    * Methode for establish connection with Mongo DB
    */
    /*private dbConnect(): void {
      //this.mongoose.connect(config.mongo)
  
      this.db.on('error', console.error.bind(console, 'connection error:'))
      this.db.once('open', () => console.log('Connected to db'))
    }*/
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
        //this.dbConnect()
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
            res.render('index');
        });
        this.router.get('/blog/:item', (req, res) => {
            console.log("BLOG ITEM");
            const pageNum = req.params.item.indexOf("1") > -1 ?
                1 : (req.params.item.indexOf("2") > -1 ?
                2 :
                (req.params.item.indexOf("3") > -1 ?
                    3 : 1));
            res.render('blog-item', { page: 'blog', blogId: pageNum });
        });
        this.router.get('/blog', (req, res) => {
            res.render('blog-list', { page: 'blog' });
        });
        this.app.use(email_router_1.default);
        this.app.use(this.router);
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map