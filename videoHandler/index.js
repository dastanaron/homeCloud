const path = require('path');

const CodecInfo = require('./Helpers/CodecInfo');
const PreviewCreator = require('./Helpers/PreviewCreator');
const Converter = require('./videoConverter/VideoConverter');

const userArgs = process.argv.slice(2);
const pathInputFile = path.resolve(userArgs[0]);
const pathOutput = path.resolve(userArgs[1]);
const fileName   = userArgs[2];

async function createPreview() {
	const codecInfo = await CodecInfo.getCodecInfo(pathInputFile);
	const outputFileInfo = path.parse(pathOutput);
	PreviewCreator.createMiddleFramePreview(codecInfo, pathInputFile, outputFileInfo.dir, outputFileInfo.name);
}

(async () => {
	Converter.convertWithProgress(pathInputFile, pathOutput, fileName, (progress) => {
		console.log(progress);
	});
})();
