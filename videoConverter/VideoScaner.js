const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

function checkVideoByMimeType(pathToFile) {
	return new Promise((resolve, reject) => {
	    exec(`mimetype -M --output-format %m ${pathToFile}`, (error, stdout, stderr) => {
			if (error === null) {
				resolve(stdout.toString().search(/video/) > -1);
			} else {
				reject(stderr);
			}
		});
	});
};

async function getVideoFiles(target) {
    target = path.resolve(__dirname, target);

    const dirents = fs.readdirSync(target, {
        withFileTypes: true
    });

    let listFiles = [];

    for (const item of dirents) {

        const filePath = path.resolve(target, item.name);

        if (item.isFile()) {
            if (await checkVideoByMimeType(filePath)) {
                listFiles.push(filePath);
            }
        }

        if (item.isDirectory()) {

            listFiles = [
                ...listFiles,
                ...await getVideoFiles(filePath),
            ];

        }

    }
    return listFiles;
};


module.exports = {
	checkVideoByMimeType,
	getVideoFiles,
}