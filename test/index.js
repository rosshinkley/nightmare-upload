/**
 * Module dependencies.
 */

require('mocha-generators')
  .install();

var Nightmare = require('nightmare');
var should = require('chai')
  .should();
var url = require('url');
var server = require('./server');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var rimraf = require('rimraf');

/**
 * Temporary directory
 */

var tmp_dir = path.join(__dirname, 'tmp')

/**
 * Get rid of a warning.
 */

process.setMaxListeners(0);

/**
 * Locals.
 */

var base = 'http://localhost:7500/';

describe('Nightmare Upload', function() {
  before(function(done) {
    require('../nightmare-upload')(Nightmare);
    server.listen(7500, done);
  });

  it('should be constructable', function * () {
    var nightmare = Nightmare();
    nightmare.should.be.ok;
    yield nightmare.end();
  });

  describe('upload', function() {
    it('should upload a single file', function * () {
      var nightmare = new Nightmare();
      var files = yield nightmare.goto(fixture('upload'))
        .upload('input[type=file]', path.resolve(__dirname, 'files', 'upload.txt'))
        .click('button[type=submit]')
        .wait(1000)
        .evaluate(function() {
          return JSON.parse(document.body.querySelector('pre')
            .innerHTML)
        });
      files[0].originalname.should.equal('upload.txt');
      yield nightmare.end();
    });

    it('should upload more than one file', function * () {
      var nightmare = new Nightmare();
      var files = yield nightmare.goto(fixture('upload'))
        .upload('input[type=file]', [
          path.resolve(__dirname, 'files', 'upload.txt'),
          path.resolve(__dirname, 'files', 'upload-again.txt')
        ])
        .click('button[type=submit]')
        .wait(1000)
        .evaluate(function() {
          return JSON.parse(document.body.querySelector('pre')
            .innerHTML)
        });
      files.length.should.equal(2);
      files[0].originalname.should.equal('upload.txt');
      files[1].originalname.should.equal('upload-again.txt');
      yield nightmare.end();
    });

    it('should verify a file exists before upload', function(done) {
      new Nightmare()
        .goto(fixture('upload'))
        .upload('#uploaded_file', 'nope.jpg')
        .run(function(err) {
          err.should.exist;
          done();
        });
    });
  });
});

/**
 * Generate a URL to a specific fixture.
 * @param {String} path
 * @returns {String}
 */

function fixture(path) {
  return url.resolve(base, path);
}
