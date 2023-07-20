import {
    format
} from "util";
import path from 'path';
import
store
from "@google-cloud/storage";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
let bucketName = process.env.BUCKET_NAME;
const { Storage } = store;
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
const fromArrayBuffer = function(array) {
    var buffer = new Buffer(array.byteLength);
    var view = new Uint8Array(array);

    for (var i = 0; i < buffer.length; i++) {
        buffer[i] = view[i];
    }

    return buffer;
};
const uploadBufferAudio = async(fileBuffer) => {
    try {
        const buffer = fileBuffer;
        let bufferData = fromArrayBuffer(buffer);
        const fileName = `${makeId(16)}.mp3`
        let buildFileName = `factify-files/${fileName}`;
        console.log(buildFileName);
        const webBuild = fileBucket.file(buildFileName);
        let webFileResponse = await webBuild.save(bufferData);
        console.log(webFileResponse);
        const url = `https://storage.googleapis.com/${fileBucket.name}/${buildFileName}`;

        return url

    } catch (err) {
        console.log(err, "error in uploading file")
        return err
    }
};
const uploadRSSXML = async(rss) => {
    try {
        const fileName = `rssfeed.xml`
        const manifestFile = fileBucket.file(fileName);
        let manifestFileTextResponse = await manifestFile.save(rss);
        let url = `https://storage.googleapis.com/${fileBucket.name}/${fileName}`;
        return url;

    } catch (err) {
        console.log(err);
        return err
    }
};
// const uploadRSSFeeds = async(rssFeeds) => {
//     const uploadedURLs = {};

//     for (const language in rssFeeds) {
//         const rssFeed = `<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
//       <channel>
//         <title>Factify</title>
//         <link>https://storage.googleapis.com/factify/rssfeed.xml</link>
//         <description>Factify RSS Feed</description>
//         <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
//         <language>${language}</language>
//         <managingEditor>test@test.com (editors)</managingEditor>
//         ${rssFeeds[language]}
//       </channel>
//     </rss>`;

//         try {
//             const fileName = `rssfeed_${language}.xml`;
//             const manifestFile = fileBucket.file(fileName);
//             await manifestFile.save(rssFeed);
//             const url = `https://storage.googleapis.com/${fileBucket.name}/${fileName}`;
//             uploadedURLs[language] = url;
//         } catch (err) {
//             console.log(`Error uploading RSS feed for ${language}:`, err);
//             uploadedURLs[language] = null;
//         }
//     }

//     return uploadedURLs;
// };
const uploadRSSFeeds = async(rssFeeds) => {
    const uploadedURLs = {};

    for (const language in rssFeeds) {
        const feedTypes = ['audio', 'video', 'image'];

        for (const feedType of feedTypes) {
            const rssFeed = `<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
          <channel>
            <title>Factify</title>
            <link>https://storage.googleapis.com/factify/rssfeed_${language}_${feedType}.xml</link>
            <description>Factify ${feedType.toUpperCase()} RSS Feed (${language})</description>
            <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
            <language>${language}</language>
            <managingEditor>test@test.com (editors)</managingEditor>
            ${rssFeeds[language][feedType]}
          </channel>
        </rss>`;

            try {
                const fileName = `rssfeed_${language}_${feedType}.xml`;
                const manifestFile = fileBucket.file(fileName);
                await manifestFile.save(rssFeed);
                const url = `https://storage.googleapis.com/${fileBucket.name}/${fileName}`;
                uploadedURLs[`${language}_${feedType}`] = url;
            } catch (err) {
                console.log(`Error uploading ${feedType} RSS feed for ${language}:`, err);
                uploadedURLs[`${language}_${feedType}`] = null;
            }
        }
    }

    return uploadedURLs;
};



export default { uploadBufferAudio, uploadRSSXML, uploadRSSFeeds }