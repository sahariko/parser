const path = require('path')
const Converter = require('csvtojson').Converter
const csvConverter = new Converter({})
const nodeXJ = require('xls-to-json')

const EXTENSIONS = ['csv', 'xls', 'xlsx']

/**
 * Filters an array of table rows by a column name or index.
 * @param  {Object[]}      table  An array of rows, where the key is the column, and the value is the cell.
 * @param  {String|Number} column The column to filter by.
 * @return {[type]} [description]
 */
const filter = (table, column) => table.map((line) => isNaN(column) ? line[column] : Object.values(line)[column])

/**
 * Parses a data table file.
 * @param  {String} 			 filePath The file's path
 * @param  {String|Number} column 	The column to filter by.
 * @return {Array}  The filtered rows.
 */
const parseFile = (filePath, column) => {
	const extension = path.extname(filePath).substring(1)

	if (EXTENSIONS.includes(extension)) {
		return new Promise((resolve) => {
			/**
			 * File reading callback function.
			 * @param  {String} [error]
			 * @param  {Object[]} result
			 */
			const handleFile = (error, result) => {
				if (error) {
					throw new Error(error)
				}

				resolve(filter(result, column))
			}

			switch (extension) {
				case 'csv':
					csvConverter.fromFile(filePath, handleFile)
					break

				default:
					nodeXJ({
						input: filePath,
						output: null
					}, handleFile)
			}
		})
	} else {
		throw new Error(`File with incorrect extension passed: ${filePath}. Supported extensions: ${EXTENSIONS.join(', ')}`)
	}
}

module.exports = parseFile
