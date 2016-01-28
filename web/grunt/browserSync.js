var fs = require("fs"),
path = require('path'),
url = require("url");

module.exports = {
	dev: {
		options: {
			files: [
				'<%= config.dist.root %>**/*'
			],
			server: {
				baseDir: "dist"
			},
			watchTask: true,
			middleware: function(req, res, next) {
				var fileName = url.parse(req.url);
                fileName = fileName.href.split(fileName.search).join("");
                var fileExists = fs.existsSync("dist/" + fileName);
                if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
                    req.url = "/index.html";
                }

				next();
			}
		}
	}
};
