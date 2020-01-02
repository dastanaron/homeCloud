const { exec, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');


function convertToBrowserSupportedFormat(inputFilePath, outputFilePathFolder) {
	const pathInfo = path.parse(inputFilePath);
	const resolvedOutputPath = path.resolve(outputFilePathFolder);

	if(!fs.existsSync(resolvedOutputPath)) {
		fs.mkdirSync(resolvedOutputPath, { recursive: true });
	}

	return new Promise((resolve, reject) => {
	    exec(`ffmpeg -y -i ${inputFilePath} -vcodec libx264 -acodec mp3 ${resolvedOutputPath}/${pathInfo.name}.mp4`, (error, stdout, stderr) => {
			if (error !== null) {
				reject({
					error: error,
					stderr: stderr,
				});
			}
			resolve(true);
		});
	});
};


module.exports = {
	convertToBrowserSupportedFormat,
}