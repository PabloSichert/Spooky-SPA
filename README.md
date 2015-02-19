# Spooky SPA

Spooky SPA theme for [Ghost](http://github.com/tryghost/ghost/).

View this template in action at https://pablosichert.de!

## Installation

First, go and [set up](https://github.com/tryghost/ghost/#getting-started) your Ghost blog!

When you're done you need to get the files into your themes directory:

1. `:~$ cd your-installation/content/themes`
2. `:/your-installation/content/themes$ git clone https://github.com/PabloSichert/Spooky-SPA` - or - download files and copy them to `your-installation/content/themes/Spooky-SPA`
3. Compile assets: `~$/your-installation/content/themes grunt`
4. Head over to [https://your-blog.com/ghost/settings/general/](#) and select the Spooky-SPA theme
5. Done!

## Debugging and Editing Own Styles

`:/your-installation/content/themes$ grunt development`

This will output development css / js (not minified) and setting up a watchdog for autmatic live reloading and asset compiling when you change source files.

For more commands and further information inspect Gruntfile.js.

## Copyright & License

Copyright (c) 2015 Pablo Sichert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
