//Requires
let fs = require('fs-extra')
let path = require('path')
let Converter = require("csvtojson").Converter
let csvConverter = new Converter({})
let node_xj = require("xls-to-json")
let argv = require('yargs').argv

//Configuration
let config = {
	extensions: ['csv', 'xls', 'xlsx'],
	filesPath: path.join(path.resolve(__dirname), 'files'),
	column: argv.col,
	decode: argv.decode
}

//Parser functions
let parser = new function () {
	let _write = function (path, result) {
		try {
			let name = path.substr(0, path.indexOf('.'))
			let writePath = config.filesPath + '/' + name + '.txt'

			for (var i = 0; i < result.length; i++) {
				let line = result[i]
				let string = config.decode ? new Buffer(line[Object.keys(line)[config.column]], 'base64') : line[Object.keys(line)[config.column]]
				fs.appendFileSync(writePath, string + '\n')
			}
		} catch (e) {throw new Error('There was an error: ', e)}
	}
	
	return {
		csv: function (file) {
			let filePath = path.join(config.filesPath, file)
			csvConverter.fromFile(filePath, function (err, result) {
				_write(file, result)
			})
		},
		
		xls: function (file) {
			let filePath = path.join(config.filesPath, file)
			node_xj({
				input: filePath,
				output: null
			}, function (err, result) {
				if (err) {
					throw new Error(err)
				} else {
					_write(file, result)
				}
			})
		}
	}
}

//Getting the file list and sifting through it
let files = fs.readdirSync(config.filesPath)

for (let i = 0; i < files.length; i++) {
	let extension = files[i].substr(files[i].lastIndexOf(".") + 1)
	if (extension == 'txt') {
		fs.removeSync(path.join(config.filesPath, files[i]))
	}
	if (config.extensions.indexOf(extension) > -1) {
		switch (extension) {
			case 'csv':
				parser.csv(files[i])
				break
				
			default:
				parser.xls(files[i])
				break
		}
	}
}