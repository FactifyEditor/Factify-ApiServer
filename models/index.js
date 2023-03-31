import  mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

import user from "./user.model.js";
import role  from "./role.model.js";
import language from "./language.model.js";
import rating from "./rating.model.js";
import imageTemplate from "./imageTemplate.model.js";
import audioTemplate from "./audioTemplate.model.js";
import videoTemplate from "./videoTemplate.model.js";

import media from "./media.model.js"

db.userModel=user;
db.roleModel=role;
db.ratingModel=rating;
db.languageModel=language;
db.imageTemplateModel=imageTemplate;
db.audioTemplateModel=audioTemplate;
db.videoTemplateModel=videoTemplate;
db.mediaModel=media;
db.ROLES = ["Editor", "Admin", "FactChecker"];

export default  db;