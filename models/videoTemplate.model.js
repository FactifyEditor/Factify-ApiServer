import mongoose from 'mongoose';

const VideoTemplate = mongoose.model(
  "VideoTemplate",
  new mongoose.Schema({
    name: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    },
    image: {
      required: true,
      type: String
    },
    languages: [{
      language: String,
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language'
      },
      introTrack: String,
      outroTrack: String,
      verificationTrack: String,
      headlineTrack: String,
      isEnabled:{
        required: false,
        type: Boolean,
        default: false
      }
    }],
    status: {
      required: false,
      type: Number,
      default: 0
    },
    frame:{},
    scenes:[],
    type:String,
    fps:{},
    metadata:{},
    previews:{}
  })
);

export default VideoTemplate;
