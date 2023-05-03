
import {
  format
} from "util";
import path from 'path';
import 
  store
from "@google-cloud/storage";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
let bucketName=process.env.BUCKET_NAME;
const {Storage}= store;
const storage = new Storage();
const fileBucket = storage.bucket(bucketName);
const makeId = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
const fromArrayBuffer = function(array){
	var buffer = new Buffer(array.byteLength);
	var view = new Uint8Array(array);

	for (var i = 0; i < buffer.length; i++)
	{
		buffer[i] = view[i];
	}

	return buffer;
};
const uploadBufferAudio = async (fileBuffer) => {
    try {
      const buffer=fileBuffer;
      let bufferData= fromArrayBuffer(buffer);
      const fileName= `${makeId(16)}.mp3`
      let buildFileName=`factify-files/${fileName}`;
      console.log(buildFileName);
      const webBuild = fileBucket.file(buildFileName);
      let webFileResponse= await webBuild.save(bufferData);
      console.log(webFileResponse);
      const url = `https://storage.googleapis.com/${fileBucket.name}/${buildFileName}`;

     return url
      
    } catch (err) {
        console.log(err,"error in uploading file")
      return err
    }
};
const uploadRSSXML = async (rss) => {
  try {
    // let bufferData= fromArrayBuffer(buffer);
    const fileName= `feed.xml`
    let buildFileName=`factify-external-files${fileName}`
    const webBuild = fileBucket.file(buildFileName);
    let webFileResponse= await webBuild.save(rss);
    let url =`https://storage.googleapis.com/${fileBucket.name}/${buildFileName}`;
    return url;

    
  } catch (err) {
    console.log(err);
    return err
  }
};


  export default {uploadBufferAudio,uploadRSSXML}