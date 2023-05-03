import  mongoose from 'mongoose';

const Media = mongoose.model(
  "Media",
  new mongoose.Schema({
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Language'
    },
    link: {
      type:String,
      default:""
     },
    rating: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    },
    imageTemplate:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ImageTemplate'
    },
    videoTemplate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VideoTemplate'
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    metaData: {
     type: mongoose.Schema.Types.Mixed,
    },
    audioStatus:{
     type:Number,
     default:0
    },
    imageStatus:{
      type:Number,
      default:0
     },
    videoStatus:{
      type:Number,
      default:0
     },
     audioUrl:{
      type:String,
      default:""
     },
     imageUrl:{
      type:String,
      default:""
     },
     videoUrl:{
      type:String,
      default:""
     },
     draft:{
      type:Boolean,
      default:false
     },
     isPublished:{
      type:Boolean,
      default:false
     },
     publishedDate:{
      type:Date,
      default:""
     },
    created: {type: Date, default: Date.now}
  })
  );

export default  Media;