# Data Table Filter

Filter data from a table-oriented file (csv, xls, xlsx) by a specified column.

## Module Version

### Installation
```shell
$ npm install @cocopina/table-parser
```

### Usage
```js
const filter = require('@cocopina/table-filter')
filter('path/to/file.csv', 1)
	.then((result) => {
		// Do something
	})
```

## CLI Version

### Installation

```shell
$ npm install -g @cocopina/table-parser
```

### Usage

```shell
$ table-filter <source>
```

#### Options
`--help`  Show help

`--version`     Show version number

`--column, -c`  The column to filter by.

`--output, -o`  An output file. Default output is console.
