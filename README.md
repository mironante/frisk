# Frisk - CLI tool to search for text in a folder


[![npm version](https://badge.fury.io/js/@mironante%2Ffrisk.svg)](https://www.npmjs.com/package/@mironante/frisk)

## Prerequisites

- Install [Node.js] which includes [Node Package Manager][npm]

## Installation
```
npm install -g @mironante/frisk
```

## Usage
```
frisk <dir> <keyword> [options]
```

### Arguments:
|Argument|Description|
|--------|-----------|
|dir|Folder path|
|keyword|Search word|

### Options:
|Option|Shortcat|Description|
|------|--------|-----------|
|--version|-V|Output the version number|
|--recursively|-r|Search recursively|
|--exclude <char...>|-ex|Exclude files or directories|
|--encoding <char>|-e|Supported encodings (https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings)|
|--help|-h|Display help for command|

### Example:
```
frisk ./project 名前 -e Shift_JIS -r -ex node_modules *.js
```