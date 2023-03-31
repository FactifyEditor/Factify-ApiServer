// import  editly from 'editly';
// import  nodeHtmlToImage from "node-html-to-image";
// import { Storage }  from '@google-cloud/storage';
// const gcs = new Storage();

const processVideos=async (editSpec)=>{
// await editly(editSpec);
// const bucket = gcs.bucket('fact_checker');
let response={success:true}// =await bucket.upload('./assets/audio3.mp4');
return response ;
}
const processImages=async (html)=>{
    // const image = await nodeHtmlToImage({
    //     output: './image.png',
    //     html,
    //     content: { name: 'you' }
    //   });
}
const processAudios=()=>{

}

export default  {
    processVideos,
    processAudios,
    processImages
}