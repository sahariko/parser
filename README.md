Data Table Decoder
--------------------
##### Dependencies

   csvtojson
   fs-extra
   xls-to-json
   yargs

##### Installation

    $ npm install    

##### Usage

    Put any file with the extension 'csv', 'xls' or 'xlsx' into the 'files' directory.
	Run the decoder by typing 'node parser'
	Options:
		--col #column number#: Mandatory argument, choosing column number
		--decode: Optional, for decoding from base64