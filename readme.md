# set-input-files

[![gzip size](http://img.badgesize.io/https://unpkg.com/set-input-files/dist/set-input-files.min.mjs?compression=gzip&label=gzip%20size&style=flat-square)](https://unpkg.com/set-input-files/dist/)
[![downloads](https://img.shields.io/npm/dm/set-input-files.svg?style=flat-square)](https://www.npmtrends.com/set-input-files)
[![module formats: umd, cjs, and es](https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square)](https://unpkg.com/set-input-files/dist/)
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/set-input-files/badge)](https://www.jsdelivr.com/package/npm/set-input-files)

[![Build Status](https://img.shields.io/travis/fisker/set-input-files.svg?style=flat-square)](https://travis-ci.org/fisker/set-input-files)
[![Code Coverage](https://img.shields.io/codecov/c/github/fisker/set-input-files.svg?style=flat-square)](https://codecov.io/github/fisker/set-input-files)
[![MIT License](https://img.shields.io/npm/l/set-input-files.svg?style=flat-square)](https://github.com/fisker/set-input-files/blob/master/license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> set HTMLInputElement files

## Install

```sh
yarn add set-input-files
```

## Usage

```html
<script type="module">
  import setInputFiles from 'https://unpkg.com/set-input-files?module'

  setInputFiles(input, [file])
</script>

<!-- legacy browsers -->
<script nomodule src="https://unpkg.com/set-input-files"></script>
<script nomodule>
  setInputFiles(input, [file])
</script>
```

## API

setInputFiles(input[, files])

### input

`HTMLInputElement`[type="file"]

### files

Array&lt;file&gt;
