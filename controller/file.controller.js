import uploadHandler from "../middleware/uploadMultiFile.js";
import {
  format
} from "util";
import path from 'path';
import 
  store
from "@google-cloud/storage";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
let bucketName=process.env.BUCKET_NAME ||'factify';
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
const uploadMultipleFiles = async (req, res) => {
  try {
    // return new Promise(async (mainResolve, mainReject) => {
      await uploadHandler(req, res);
      if (!req.files) {
        res.status(400).send("No file uploaded.");
        return;
      }
   
      let promises = [];
      req.files.forEach((file) => {
        const blob = fileBucket.file(
          makeId(16) + Date.now() + path.extname(file.originalname)
        );
        const newPromise = new Promise((resolve, reject) => {
          blob
            .createWriteStream({
              metadata: {
                contentType: file.mimetype
              },
              resumable: false, //Good for small files
            })
            .on("finish", () => {
              const Url = `https://storage.googleapis.com/${fileBucket.name}/${blob.name}`;
              resolve({
                name: file.fieldname,
                url: Url
              });
            })
            .on("error", (err) => {
              console.log(err)
              reject("upload error: ", err);
            })
            .end(file.buffer);
        });
        promises.push(newPromise);
      });
      Promise.all(promises)
        .then((response) => {
          res.json({ data: response, status: "success" });
        })
        .catch((err) => {
          console.log(err)
          res.json({ data: err, status: "failed" });
        });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Could not upload the file: . ${err}`,
    });
  }

}

const uploadBufferAudio = async (fileBuffer) => {
  try {
    const buffer=fileBuffer;
    let bufferData= fromArrayBuffer(buffer);
    const fileName= `${makeId(16)}.mp3`
    let buildFileName=`factify-external-files`
    const webBuild = baseBucket.file(buildFileName);
    let webFileResponse= await webBuild.save(bufferData);
   
   return webFileResponse
    
  } catch (err) {
    return err
  }
};
const uploadBufferImage = async (fileBuffer) => {
  try {
    const bufferData=fileBuffer;
    // let bufferData= fromArrayBuffer(buffer);
    const fileName= `${makeId(16)}.jpg`
    let buildFileName=`factify-external-files${fileName}`
    const webBuild = fileBucket.file(buildFileName);
    let webFileResponse= await webBuild.save(bufferData);
    let url =`https://storage.googleapis.com/${fileBucket.name}/${buildFileName}`;
    return url;

    
  } catch (err) {
    console.log(err);
    return err
  }
};

export default{
  uploadMultipleFiles,
  uploadBufferImage
}
