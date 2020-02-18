const { exec, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const CodecInfo = require('../Helpers/CodecInfo');

const moment = require('moment');

const CODEC_COPY = 'copy';
const POSSIBLE_VIDEO_CODEC = 'libx264';
const POSSIBLE_AUDIO_CODEC = 'mp3';

function buildCommand(inputFilePath, outputFilePathFolder, videoCodec, audioCodec)
{
  const pathInfo = path.parse(inputFilePath);
  const resolvedOutputPath = path.resolve(outputFilePathFolder);

  if (!fs.existsSync(resolvedOutputPath)) {
    fs.mkdirSync(resolvedOutputPath, { recursive: true });
  }

  return `ffmpeg -y -i '${inputFilePath}' -vcodec ${videoCodec} -acodec ${audioCodec} '${resolvedOutputPath}/${pathInfo.name}.mp4'`;
}

function buildSpawnCommand(inputFilePath, outputFilePathFolder, filename, videoCodec, audioCodec) {
  return spawn('ffmpeg', ['-y', '-i', inputFilePath, '-vcodec',  videoCodec, '-acodec', audioCodec, `${outputFilePathFolder}/${filename}`])
}

function convertSilent(inputFilePath, outputFilePathFolder, videoCodec = POSSIBLE_VIDEO_CODEC, audioCodec = POSSIBLE_AUDIO_CODEC) {
  return exec(buildCommand(inputFilePath, outputFilePathFolder, videoCodec, audioCodec));
}

async function convertWithProgress(inputFilePath, outputFilePathFolder, filename, callback = null, videoCodec = POSSIBLE_VIDEO_CODEC, audioCodec = POSSIBLE_AUDIO_CODEC) {

  const totalDuration = await CodecInfo.getMaxDuration(inputFilePath);

  const convert = buildSpawnCommand(inputFilePath, outputFilePathFolder, filename,  videoCodec, audioCodec);

  convert.stdout.on('data', (data) => {
    if (data.toString().search(/frame=/) > -1) {
      console.log(data.toString());
    }
  });

  convert.stderr.on('data', (data) => {
    if (data.toString().search(/frame=/) > -1) {
      let matchedTime = data.toString().match(/time=(.*)\s*bitrate/);
      let duration = timeToDuration(matchedTime[1]).asSeconds();
      let percent = Math.round(duration * 100 / totalDuration);
      if (typeof callback === 'function') {
        callback(percent);
      }
    }
  });

  convert.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

function timeToDuration(stringTime) {
  let parsedUnits = stringTime.replace(/\.[\d]*/, '').split(':');
  return moment.duration({
    seconds: parsedUnits[2],
    minutes: parsedUnits[1],
    hours: parsedUnits[0],
  })
}


module.exports = {
  convertSilent,
  convertWithProgress,
  CODEC_COPY,
  POSSIBLE_AUDIO_CODEC,
  POSSIBLE_VIDEO_CODEC,
};
