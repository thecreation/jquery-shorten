# [jQuery shorten](https://github.com/amazingSurge/jquery-shorten) ![bower][bower-image] [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![prs-welcome]](#contributing)

> A jquery plugin that automatically add more link to the text if its lenght is greater then the limit.

## Table of contents
- [Main files](#main-files)
- [Quick start](#quick-start)
- [Requirements](#requirements)
- [Usage](#usage)
- [Examples](#examples)
- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [No conflict](#no-conflict)
- [Browser support](#browser-support)
- [Contributing](#contributing)
- [Development](#development)
- [Changelog](#changelog)
- [Copyright and license](#copyright-and-license)

## Main files
```
dist/
├── jquery-shorten.js
├── jquery-shorten.es.js
├── jquery-shorten.min.js
└── css/
    ├── shorten.css
    └── shorten.min.css
```

## Quick start
Several quick start options are available:
#### Download the latest build

 * [Development](https://raw.githubusercontent.com/amazingSurge/jquery-shorten/master/dist/jquery-shorten.js) - unminified
 * [Production](https://raw.githubusercontent.com/amazingSurge/jquery-shorten/master/dist/jquery-shorten.min.js) - minified

#### Install From Bower
```sh
bower install jquery-shorten-js --save
```

#### Install From Npm
```sh
npm install jquery-shorten --save
```

#### Install From Yarn
```sh
yarn add jquery-shorten
```

#### Build From Source
If you want build from source:

```sh
git clone git@github.com:amazingSurge/jquery-shorten.git
cd jquery-shorten
npm install
npm install -g gulp-cli babel-cli
gulp build
```

Done!

## Requirements
`jquery-shorten` requires the latest version of [`jQuery`](https://jquery.com/download/).

## Usage
#### Including files:

```html
<link rel="stylesheet" href="/path/to/shorten.css">
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery-shorten.js"></script>
```

#### Required HTML structure

```html
<div class="example">
  Long content here
</div>
```

#### Initialization
All you need to do is call the plugin on the element:

```javascript
jQuery(function($) {
  $('.example').shorten(); 
});
```

## Examples
There are some example usages that you can look at to get started. They can be found in the
[examples folder](https://github.com/amazingSurge/jquery-shorten/tree/master/examples).

## Options
`jquery-shorten` can accept an options object to alter the way it behaves. You can see the default options by call `$.shorten.setDefaults()`. The structure of an options object is as follows:

```
{
  namespace: 'shorten',
  chars: 100,
  ellipses: '...',
  more: 'more',
  less: 'less'
}
```

## Methods
Methods are called on shorten instances through the shorten method itself.
You can also save the instances to variable for further use.

```javascript
// call directly
$().shorten('destroy');

// or
var api = $().data('shorten');
api.destroy();
```

#### text()
Get the text.
```javascript
$().shorten('text');
```

#### expand()
Expand to see full text.
```javascript
$().shorten('expand');
```

#### collapse()
Collapse the text to limited length.
```javascript
$().shorten('collapse');
```

#### update()
Update the container's text with new one.
```javascript
$().shorten('update', 'new content');
```

#### destroy()
Destroy the shorten instance.
```javascript
$().shorten('destroy');
```

## Events
`jquery-shorten` provides custom events for the plugin’s unique actions. 

```javascript
$('.the-element').on('shorten::ready', function (e) {
  // on instance ready
});

```

Event   | Description
------- | -----------
init    | Fires when the instance is setup for the first time.
ready   | Fires when the instance is ready for API use.
expand  | Fired when expand the content.
collapse| Fired when collapse the content.
update  | Fired when the `update` instance method has been called.
destroy | Fires when an instance is destroyed. 

## No conflict
If you have to use other plugin with the same namespace, just call the `$.shorten.noConflict` method to revert to it.

```html
<script src="other-plugin.js"></script>
<script src="jquery-shorten.js"></script>
<script>
  $.shorten.noConflict();
  // Code that uses other plugin's "$().shorten" can follow here.
</script>
```

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_32x32.png" alt="IE"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | 9-11 ✓ | Latest ✓ |

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).

## Contributing
Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md). Make sure you're using the latest version of `jquery-shorten` before submitting an issue. There are several ways to help out:

* [Bug reports](CONTRIBUTING.md#bug-reports)
* [Feature requests](CONTRIBUTING.md#feature-requests)
* [Pull requests](CONTRIBUTING.md#pull-requests)
* Write test cases for open bug issues
* Contribute to the documentation

## Development
`jquery-shorten` is built modularly and uses Gulp as a build system to build its distributable files. To install the necessary dependencies for the build system, please run:

```sh
npm install -g gulp
npm install -g babel-cli
npm install
```

Then you can generate new distributable files from the sources, using:
```
gulp build
```

More gulp tasks can be found [here](CONTRIBUTING.md#available-tasks).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/amazingSurge/jquery-shorten/releases).

## Copyright and license
Copyright (C) 2016 amazingSurge.

Licensed under [the LGPL license](LICENSE).

[⬆ back to top](#table-of-contents)

[bower-image]: https://img.shields.io/bower/v/jquery-shorten-js.svg?style=flat
[bower-link]: https://david-dm.org/amazingSurge/jquery-shorten/dev-status.svg
[npm-image]: https://badge.fury.io/js/jquery-shorten.svg?style=flat
[npm-url]: https://npmjs.org/package/jquery-shorten
[license]: https://img.shields.io/npm/l/jquery-shorten.svg?style=flat
[prs-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[daviddm-image]: https://david-dm.org/amazingSurge/jquery-shorten.svg?style=flat
[daviddm-url]: https://david-dm.org/amazingSurge/jquery-shorten