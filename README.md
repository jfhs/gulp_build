That's sample gulp build file for one page landings.

It concats all scripts and styles mentioned in html, minifies them, adds fingerprint, rewrites html so it links to
final js/css and finally minifies html.

To use it, you need npm and gulp. Install npm yourself.

Install gulp
```
npm i gulp-cli --global
```
Install dependencies (while in project folder)
```
npm i
```
To build
```
gulp
```
To clean
```
gulp clean
```
Output will be in dist folder
