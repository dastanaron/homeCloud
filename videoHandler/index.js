const path = require('path');
const cliProgress = require('cli-progress');

const CodecInfo = require('./Helpers/CodecInfo');
const PreviewCreator = require('./Helpers/PreviewCreator');
const Converter = require('./videoConverter/VideoConverter');

const userArgs = process.argv.slice(2);
const pathInputFile = path.resolve(userArgs[0]);
const pathOutput = path.resolve(userArgs[1]);
const fileName   = userArgs[2];

const progressBar = new cliProgress.SingleBar({
	format: 'Converting Progress |' + '\x1b[36m{bar}\x1b[0m' + '| {percentage}%',
	barCompleteChar: '\u2588',
	barIncompleteChar: '\u2591',
	hideCursor: true
});
progressBar.start(100, 0);

async function createPreview() {
	const codecInfo = await CodecInfo.getCodecInfo(pathInputFile);
	const outputFileInfo = path.parse(pathOutput);
	PreviewCreator.createMiddleFramePreview(codecInfo, pathInputFile, outputFileInfo.dir, outputFileInfo.name);
}

(async () => {
	await Converter.convertWithProgress(pathInputFile, pathOutput, fileName, (progress, isFinished) => {
		progressBar.update(progress);

		if (isFinished) {
			progressBar.stop();
		}
	});
})();
