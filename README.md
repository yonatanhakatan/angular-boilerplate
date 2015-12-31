# Angular Boilerplate
[![Build Status](https://travis-ci.org/yonatanhakatan/angular-boilerplate.svg?branch=master)](https://travis-ci.org/yonatanhakatan/angular-boilerplate)

Boilerplate for AngularJS projects

## Dependencies
Angular Boilerplate depends on AngularJS (v1.3.7 +) and AngularUI Router.

## Installation / Setup
**1) Clone the repo**

If you want to work on the actual boilerplate code:
```bash
git clone https://github.com/yonatanhakatan/angular-boilerplate.git
```

Or, if you want to use the boilerplate as the basis for a new project:
```bash
$ git clone --depth=1 https://github.com/yonatanhakatan/angular-boilerplate.git <new project name>
$ git remote rm origin
$ git remote add origin <new git repo url>
```

This will clone the repo with only the latest commit in the history. The next 2 commands removes the current remote and sets it to the new git repo.

**2) Install npm packages**

```bash
npm install
```

**3) Run gulp** (This will install bower dependencies amongst other things)

```bash
gulp
```

## Folder structure
Source files go in the `assets` folder. This is broken up into the following subfolders:

Folder  | Description
:----- | :-----------   
data  | Any data files e.g. JSON which are loaded externally by your app should go here.
fonts | Web fonts e.g. ttf, woff
img   | Image files e.g. png, jpeg
js    | Your project's javascript code
ng-partials | External html fragments
root | Anything that needs to go into your public folder e.g. favicon, robots.txt
sass | Sass source files

## Gulp tasks
There are various gulp tasks which you can use. The main ones are as follows:

Task  | Description
:----- | :-----------   
watch  | Run this to watch for changes in your code. Useful during development.
dev  | This is similar to the default task but it executes tests and doesn't run the vendor task each time. Make sure to run ```gulp vendor-scripts``` once before calling this. Useful during development.
default  | The default task. Runs everything except tests. Should be used on production.

## Testing
The boilerplate supports Karma and Protractor tests. Tests are run when you call `gulp dev`.

###### Unit tests
Unit tests are handled by Karma. An example of a unit test can be found in `assets/js/core/tests/unit/core.spec.js`.

The karma configuration is in `karma.conf.js`.

###### E2E tests
End-to-end tests are handled by protractor. An example of an end-to-end test can be found in `assets/js/samplefeature/tests/e2e/samplefeature.scenario.js`.

The protractor configuration is in `protractor.conf.js`.

**Important**: In order for the protractor tests to run correctly you must run superstatic (a static file server) first:
```bash
node_modules/superstatic/bin/server public --port 8000 --host localhost
```
