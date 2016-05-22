# nightmare-upload
Grants the ability to add files to file inputs for Nightmare 2.x, just like the good ol' days of Nightmare 1.x.

## Usage
Require the library, passing Nightmare as a reference to add the plugin actions:

```js
var Nightmare = require('nightmare');
require('nightmare-upload')(Nightmare);
```
### .upload(selector, files)
Specify the `files` to add to a `selector` file input.  The `files` parameter can be a single string (for a single file) or an array of strings (for multiple files).

## Important note about setting file upload inputs
This plugin will not work if the Chromium devtools panel is open as Chromium allows only one attachment to the debugger at a time.

## Example

```js
var Nightmare = require('nightmare');
require('nightmare-upload')(Nightmare);
var nightmare = Nightmare();
nightmare
 .goto('http://some-url.tld')
 .upload('#some_file_input', '/path/to/my/upload.ext')
 .click('#button_that_submits_form_for_upload')
 ...
```

## References/Credits

  * @Zn4rk for [bringing this method to my attention](https://github.com/segmentio/nightmare/issues/235#issuecomment-214226205)
  * @svbatalov for the [original implementation](https://github.com/electron/electron/issues/749#issuecomment-213822739)
