// Imports the Google Cloud client library
import textToSpeech from '@google-cloud/text-to-speech';
import mp3Duration from 'mp3-duration';

const client = new textToSpeech.TextToSpeechClient();
async function convertTextMp3(text,languageCode) {
  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode, ssmlGender: 'NEUTRAL'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };
  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  console.log(response);
  // Write the binary audio content to a local file
  let duration = await mp3Duration(response.audioContent)
  return {
    audio:response.audioContent,
    duration
  } 
}

export default {convertTextMp3}

