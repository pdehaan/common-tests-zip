# common-tests-zip

## Why? BUT WHY?

We need to download `*.common.tests.zip` files for specific channels and OSes. This seemed like a ~~good~~ solution.

## Installation:

```sh
$ npm install common-tests-zip -g
```

## Usage:

```sh
Usage: common-tests-zip [options]

  --help, -h
    Displays help information about this script
    'common-tests-zip -h' or 'common-tests-zip --help'

  --channel, -c
    Release channel. Valid values are "release" and "nightly". Required.
    'common-tests-zip --channel=release' or 'common-tests-zip -c nightly'

  --os, -o
    Operating system. Valid values are "linux" and "mac". Required.
    'common-tests-zip --os=mac' or 'common-tests-zip -o linux'

  --verify, -v
    Verifies the link and returns the result as a JSON object. Optional.
    'common-tests-zip --verify' or 'common-tests-zip -v'

  --version
    Displays version info
    common-tests-zip --version
```

### Examples:

#### Basic:

The following example returns a link to the Mac OS X Firefox Nightly channel *.common.tests.zip:

```sh
$ common-tests-zip -c nightly -o mac
```

**Output:**
```
https://ftp.mozilla.org/pub/mozilla.org/firefox/nightly/latest-trunk/firefox-43.0a1.en-US.mac.common.tests.zip
```

#### Mega advanced:
The following example returns a JSON object to the Linux Firefox Release channel *.common.tests.zip file:

```sh
$ common-tests-zip --channel=release --os=linux --verify
```

**Output:**
```json
{
  "href": "https://ftp.mozilla.org/pub/mozilla.org/firefox/tinderbox-builds/mozilla-release-linux64/latest/firefox-40.0.2.en-US.linux-x86_64.common.tests.zip",
  "statusCode": 200,
  "contentLength": 23670401
}
```
