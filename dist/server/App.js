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
        this.app.set('views', path.join(__dirname, '../views'));
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
            res.render('index', { pageLevel: 1, pageTitle: "Codebrothers - Špecialisti na rýchle webové riešenia" });
        });
        this.router.get('/blog/:item', (req, res) => {
            const pageItem = req.params.item;
            const pageNum = pageItem.indexOf("1") > -1 ?
                1 : (pageItem.indexOf("2") > -1 ?
                2 :
                (pageItem.indexOf("3") > -1 ?
                    3 : 1));
            const parsedTitle = pageItem ? pageItem.split('-blog-')[0].replace(/\-/g, ' ') : null;
            const pageTitle = parsedTitle ? parsedTitle.charAt(0).toUpperCase() + parsedTitle.substring(1, parsedTitle.length) + ' - ' : '';
            res.render('blog-item', { pageLevel: 3, page: 'blog', blogId: pageNum, pageTitle: `${pageTitle}Blog - Codebrothers - Špecialisti na rýchle webové riešenia` });
        });
        this.router.get('/blog', (req, res) => {
            res.render('blog-list', { pageLevel: 2, page: 'blog', pageTitle: 'Blog - Codebrothers - Špecialisti na rýchle webové riešenia' });
        });
        this.router.get('/zasady-ochrany-osobnych-udajov', (req, res) => {
            res.render('gdpr', { pageLevel: 1, pageTitle: 'Zásady ochrany osobných údajov - Codebrothers - Špecialisti na rýchle webové riešenia' });
        });
        this.app.use(email_router_1.default);
        this.app.use(this.router);
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map