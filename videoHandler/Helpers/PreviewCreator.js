const { exec } = require('child_process');
const path = require('path');
const moment = require('moment');

function buildCommand(time, videoPath, outputPath, frameName) {
	return `ffmpeg -y -ss ${time} -i ${videoPath} -f apng -vframes 1 ${outputPath}${path.sep}${frameName}.png`;
}

function createPreview(time, videoPath, outputPath, frameName) {
  const command = buildCommand(time, videoPath, outputPath, frameName);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('success created');
    if (stderr) console.error(stderr);
  });
}

function createMiddleFramePreview(info, videoPath, outputPath, frameName) {
  const maxDuration = getMaxDuration(info.streams);
  const duration = moment.duration(Math.round(maxDuration/2), 'seconds');
  createPreview(`${duration.hours()}:${duration.minutes()}:${duration.seconds()}`, videoPath, outputPath, frameName)
}

function getMaxDuration(streams) {
  let maxDuration = 0;
  for (const streamInfo of streams) {
    if (streamInfo.duration > maxDuration) {
      maxDuration = streamInfo.duration;
    }
  }

  return Math.round(maxDuration);
}

module.exports = {
  createPreview: createPreview,
  createMiddleFramePreview: createMiddleFramePreview,
};

