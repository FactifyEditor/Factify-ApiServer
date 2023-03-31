import  mongoose from 'mongoose';

const AudioTemplate = mongoose.model(
  "AudioTemplate",
  new mongoose.Schema({
    headline: {
      required: true,
      type: String
  },
    verificationMusic: {
      required: true,
      type: String
  },
    transition:{
      required: true,
      type: String
  },
  status:{
    required:false,
    type:Number,
    default: 0
  }
  })
);

export default  AudioTemplate;