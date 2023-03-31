import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors'
import indexRouter from './routes/index.js';
import mediaRouter from './routes/media.js';
import fileRouter from './routes/file.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import ratingRouter from './routes/rating.js';
import templateRouter from './routes/template.js';
import roleRouter from './routes/role.js'

import languageRouter from './routes/language.js';
import  multer from 'multer';
import serveIndex  from 'serve-index';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import dbConfig from './config/db.config.js';

import db from './models/index.js';
const Role = db.roleModel;

const username = encodeURIComponent(process.env.MONGO_USER);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const databaseIp= process.env.MONGO_DATABASE_IP;
const dbName= process.env.DATABASE_NAME
db.mongoose.set('strictQuery', false);
let url=`mongodb+srv://${username}:${password}@${databaseIp}/${dbName}?retryWrites=true&w=majority`
db.mongoose
  .connect(`${url}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

var app = express();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
global.__basedir = __dirname;
var corsOptions = {
  origin: "*"
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './assets')
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
});
//will be using this for uplading
const upload = multer({ storage: storage });

app.use(cors(corsOptions));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(logger('dev'));
// app.use(express.json());

app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.static('assets'));
// app.use(express.static(path.join(__dirname, 'assets')));
import responseFormatter from "./middleware/responseFormatter.js";

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
//app.use(express.static('public'));
app.use('/ftp', express.static('assets'), serveIndex('assets', {'icons': true}));
app.post('/api/v1/upload', upload.single('file'), function(req,res) {
  // debug(req.file);
  console.log('storage location is ', req.hostname +'/' + req.file.path);
  return res.send(req.file);
})
app.use(responseFormatter);


app.use('/api/v1/', indexRouter);
app.use('/api/v1/media', mediaRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/ratings',ratingRouter);
app.use('/api/v1/language',languageRouter);
app.use('/api/v1/template', templateRouter);
app.use('/api/v1/roles', roleRouter);
app.use('/api/v1/file',fileRouter)

async function initial() {
 
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "FactChecker"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "Editor"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "Admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
export default  app;

