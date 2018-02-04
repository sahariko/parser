const fs = require('fs-extra')
const path = require('path')
const yargs = require('yargs')

if (require.main !== module) {
	throw new Error('Please use this program from the command line')
}

yargs
	.command('$0 <source>', 'Filters a data table file by a column')
	.option('column', {
		alias: 'c',
		describe: 'The column to filter by.'
	})
	.option('output', {
		alias: 'o',
		describe: 'An output file. Default output is console.'
	})
	.demandOption(['column'], 'Please specify a column')

const filter = require('.')
const { argv } = yargs
const filePath = path.resolve(argv.source)

filter(filePath, argv.column)
	.then((result) => {
		if (argv.output) {
			try {
				fs.writeFileSync(argv.output, result.join('\n'), 'utf8')
			} catch (e) {
				throw new Error('There was an error: ', e)
			}
		} else {
			console.log(result)
		}
	})
