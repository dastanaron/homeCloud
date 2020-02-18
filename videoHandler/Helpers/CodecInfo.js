const { exec } = require('child_process');


function buildCommand(pathToFile) {
	return `ffprobe -v error -show_entries stream=codec_name,duration ${pathToFile}`;
}

function parseCodecInfo(stdout)
{
	const steamsCount = stdout.toString().match(/stream/gi).length / 2; //[STREAM]...[/STREAM]
	const streamCodecs = stdout.toString().match(/codec_name=(.*)/gi).map((currentValue, index, array) => {
		return currentValue.replace(/codec_name=/, '');
	});
	const durations = stdout.toString().match(/duration=(.*)/gi).map((currentValue, index, array) => {
		return currentValue.replace(/duration=/, '');
	});

	const info = {
		streamsCount: steamsCount,
		streams: [],
	};

	for (const key in streamCodecs) {
		let stream = {};
		stream.codec = streamCodecs[key];
		stream.duration = durations[key];

		info.streams.push(stream);
	}

	return info;
}

function getCodecInfo(pathToFile) {
	const promise = new Promise((resolve, reject) => {
		exec(buildCommand(pathToFile), (error, stdout, stderr) => {
		  if (error) {
		    reject(error);
		  } else {
		  	resolve(parseCodecInfo(stdout));
		  }

		});
	});
	return promise;
}

async function getMaxDuration(pathToFile) {
	const codecInfo = await getCodecInfo(pathToFile);
	let maxDuration = 0;
	for (const streamInfo of codecInfo.streams) {
		if (streamInfo.duration > maxDuration) {
			maxDuration = streamInfo.duration;
		}
	}

	return Math.round(maxDuration);
}

module.exports = {
	getCodecInfo,
	getMaxDuration,
};
