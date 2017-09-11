var validUrl = require('valid-url');
var download = require('image-downloader');
var fs = require('fs');

var helpers = {};

helpers.isValidUrl = (url) => {
	return validUrl.isUri(url) && url.startsWith('https://www.marktplaats');
}

helpers.downloadImages = (images, title) => {

	var dir = process.env.USERPROFILE + '\\Desktop\\' + title;

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
		console.log('Created folder: ', dir);
	}

	for (var i = 0; i < images.length; i++) {

		var options = {
			url: images[i],
			dest: dir + '\\' + i + '.jpg'
		}

		download.image(options)
			.then(({ filename, image }) => {
				console.log('File saved to', filename)
			}).catch((err) => {
				throw err
			})
	}

};

module.exports = helpers;