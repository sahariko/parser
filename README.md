Data Table Decoder
--------------------
This is a data parser for table-oriented files (csv, xls, xlsx).
Used for getting the data from a single column in the data-table, and outputting it to a `.txt` file. 
### Dependencies
--------------------
   - [csvtojson](https://github.com/Keyang/node-csvtojson)
   - [fs-extra](https://github.com/jprichardson/node-fs-extra)
   - [xls-to-json](https://github.com/DataGarage/node-xls-json)
   - [yargs](https://github.com/yargs/yargs)

### Installation
--------------------
    `$ npm install`    

### Usage
--------------------
    Put any file with the extension 'csv', 'xls' or 'xlsx' into the 'files' directory.
	Run the decoder by typing 'node parser'
	Options:
		--col #column number#: Mandatory argument, choosing column number
		--decode: Optional, for decoding from base64
