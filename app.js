var helpers = require('./helpers');

var request = require('tinyreq');
var cheerio = require('cheerio');

// see https://stackoverflow.com/a/5767589
var args = process.argv.slice(2);
var url = "";

if (args.length == 0) {
	throw new Error('No parameters provided');
} else if (args.length > 1) {
	throw new Error('Maximum amount of parameters is 1');
} else if (!helpers.isValidUrl(args[0])) {
	throw new Error('URL not valid');
} else {
	url = args[0];
}

request(url)
	.then((html) => {
		var $ = cheerio.load(html);
		var imageUrlString = $('#vip-carousel').attr('data-images-xxl');
		var title = $('title').text();

		var images = imageUrlString.split('&').map((item) => {
			return item.replace('//', 'http://');
		});

		helpers.downloadImages(images, title)
	})
	.catch((err) => {
		console.log(err);
	});