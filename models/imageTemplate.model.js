import  mongoose from 'mongoose';

const ImageTemplate = mongoose.model(
  "ImageTemplate",
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
    image: String,
    isEnabled:{
      required: false,
      type: Boolean,
      default: false
    }
  }],
  status:{
    required:false,
    type:Number,
    default: 0
  }
  })
);

export default  ImageTemplate;