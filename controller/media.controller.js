import service from "../services/index.js";
import ttsHelper from "../utils/textToMp3Converter.js"
import uploadHandler from "../utils/cloudHelper/gCloudHelper.js"
import nodeHtmlToImage from 'node-html-to-image';
import fileController from './file.controller.js'
const { uploadBufferImage } = fileController;
import axios from 'axios';
const { uploadBufferAudio } = uploadHandler;
const { convertTextMp3 } = ttsHelper;
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const RENDERER_SERVER = process.env.RENDERER_URL;
import constant from '../config/constant.config.js'

// import  editly from 'editly';
const { mediaService } = service

const getAllMedias = async (req, res) => {
  try {
    const medias = await mediaService.getAllMedias();
    res.json({ data: medias, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const convertTTSToAudio = async (req, res) => {
  let { audio, duration } = await convertTextMp3(req.body.ttsText, req.body.languageCode);
  console.log(audio, "audio file")
  let audioFilePath = await uploadBufferAudio(audio)
  res.json({ data: audioFilePath, duration, status: "success" });;
}
const renderVideo = async (req, res) => {
  req.body.videoStatus = 1;
  await mediaService.updateMedia(req.body._id, req.body);
  let response = await axios({
    method: 'post',
    url: `${RENDERER_SERVER}/render`,
    data: req.body.metaData.videoJson
  });
  req.body.videoUrl = response.data.url;
  req.body.videoStatus = 2;
  const updateMedia = await mediaService.updateMedia(req.body._id, req.body);
  const media = await mediaService.getMediaById(req.body._id);
  if (media.audioStatus == 2) {
    response = await axios({
      method: 'post',
      url: `${RENDERER_SERVER}/merge-audio-video`,
      data: {
        audioUrl: media.audioUrl,
        videoUrl: media.videoUrl
      }
    });
    req.body.videoUrl = response.data.url;
    req.body.videoStatus = 2;
    const updateMedia = await mediaService.updateMedia(req.body._id, req.body);
    res.send({ data: req.body.videoUrl = response.data.url, status: "success" })
  }
  else {
    res.send({ data: req.body.videoUrl = response.data.url, status: "success" })
  }
}
const _renderVideo = async (req) => {
  req.body.videoStatus = 1;
  await mediaService.updateMedia(req.body._id, req.body);
  let response = await axios({
    method: 'post',
    url: `${RENDERER_SERVER}/render`,
    data: req.body.metaData.videoJson
  });
  req.body.videoUrl = response.data.url;
  req.body.videoStatus = 2;
  const updateMedia = await mediaService.updateMedia(req.body._id, req.body);
  const media = await mediaService.getMediaById(req.body._id);
  if (media.audioStatus == 2) {
    response = await axios({
      method: 'post',
      url: `${RENDERER_SERVER}/merge-audio-video`,
      data: {
        audioUrl: media.audioUrl,
        videoUrl: media.videoUrl
      }
    });
    req.body.videoUrl = response.data.url;
    req.body.videoStatus = 2;
    const updateMedia = await mediaService.updateMedia(req.body._id, req.body);
    return true
    // res.send({ data: req.body.videoUrl = response.data.url, status: "success" })
  }
  else {
    return true;
    // res.send({ data: req.body.videoUrl = response.data.url, status: "success" })
  }
}
const renderAudio = async (req, res) => {
  req.body.audioStatus = 1;
  await mediaService.updateMedia(req.body._id, req.body);
  let response = await axios({
    method: 'post',
    url: `${RENDERER_SERVER}/render-audio`,
    data: req.body.metaData.videoJson
  });
  req.body.audioUrl = response.data.url;
  req.body.audioStatus = 2;
  const updateMedia = await mediaService.updateMedia(req.body._id, req.body);
  res.send({ data: req.body.audioUrl, status: "success" })
}
const _renderAudio = async (req) => {
  req.body.audioStatus = 1;
  await mediaService.updateMedia(req.body._id, req.body);
  let response = await axios({
    method: 'post',
    url: `${RENDERER_SERVER}/render-audio`,
    data: req.body.metaData.videoJson
  });
  req.body.audioUrl = response.data.url;
  req.body.audioStatus = 2;
  const updateMedia = await mediaService.updateMedia(req.body._id, req.body);
  return true
  // res.send({ data: req.body.audioUrl, status: "success" })
}
const renderImage = async (req, res) => {
  const image = await nodeHtmlToImage({
    html: req.body.html,
    content: req.body,
    puppeteerArgs: { args: ["--no-sandbox"] },
    output: './image.png'
  });
  // let imageUrl = await uploadBufferImage(image);
  // req.body.imageUrl = imageUrl;
  // req.body.imageStatus = 2;
  // const updateMedia = await mediaService.updateMedia(req.body._id, req.body);
  res.send(image)
}
const renderAudioVideo = async (media) => {
  media.body.audioStatus = 1;
  media.body.videoStatus = 1;
  await _renderAudio(media);
  await _renderVideo(media);
  return true;
}
const createMedia = async (req, res) => {
  try {
    let creatorId = req.userId;
    req.body.creator = creatorId;
    console.log(creatorId)
    const media = await mediaService.createMedia(req.body);
    renderAudioVideo({body:media});
    res.json({ data: media, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getMediaById = async (req, res) => {
  try {
    const media = await mediaService.getMediaById(req.params.id);
    res.json({ data: media, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateMedia = async (req, res) => {
  try {
    const media = await mediaService.updateMedia(req.params.id, req.body);
    res.json({ data: media, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteMedia = async (req, res) => {
  try {
    const media = await mediaService.deleteMedia(req.params.id);
    res.json({ data: media, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getAllMedias,
  createMedia,
  updateMedia,
  deleteMedia,
  getMediaById,
  renderVideo,
  renderAudio,
  convertTTSToAudio,
  renderImage,
  renderAudioVideo
}