const fs = require('fs-extra')
const path = require('path')
const Converter = require('csvtojson').Converter
const csvConverter = new Converter({})
const node_xj = require('xls-to-json')
const argv = require('yargs').argv

const config = {
	extensions: ['csv', 'xls', 'xlsx'],
	filesPath: path.join(path.resolve(__dirname), 'files'),
	column: argv.col,
	decode: argv.decode
}

const parser = new function() {
	const _write = (path, result) => {
		try {
			const name = path.substr(0, path.indexOf('.'))
			const writePath = `${config.filesPath}/${name}.txt`

			for (let i = 0; i < result.length; i++) {
				const line = result[i]
				const string = config.decode ? new Buffer(line[Object.keys(line)[config.column]], 'base64') : line[Object.keys(line)[config.column]]
				fs.appendFileSync(writePath, `${string}\n`)
			}
		} catch (e) {throw new Error('There was an error: ', e)}
	}

	return {
		csv: (file) => {
			const filePath = path.join(config.filesPath, file)
			csvConverter.fromFile(filePath, (err, result) => {
				_write(file, result)
			})
		},

		xls: (file) => {
			const filePath = path.join(config.filesPath, file)
			node_xj({
				input: filePath,
				output: null
			}, (err, result) => {
				if (err) {
					throw new Error(err)
				} else {
					_write(file, result)
				}
			})
		}
	}
}

const files = fs.readdirSync(config.filesPath)

for (let i = 0; i < files.length; i++) {
	const extension = files[i].substr(files[i].lastIndexOf('.') + 1)
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
