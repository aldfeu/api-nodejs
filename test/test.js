  // On lance le serveur node à tester
  var dacast = require('../lib/dacast.js')('65041_5e0e9cca5dcda8e8b36a');
  var chai = require('chai');
  var expect = chai.expect;
  var Test = function() {
    this.elementCreated = null;
    this.list = function(type, callbackSuccess, callbackError) {
      var self = this;
      dacast['' + type + ''].all({
        perpage: 10, // Optional - Default : 25
        page: 2 // Optional - Default : 1
      }, function(success) {
        if (type == 'vod') {
          self.elementCreated = success[0].id;
        };
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    };
    this.create = function(type, callbackSuccess, callbackError) {
      var self = this;
      dacast['' + type + ''].create({
        title: 'First channel', // Optional - Default : 25
        description: 'Enjoy my channel dude' // Optional - Default : 1
      }, function(success) {
        self.elementCreated = success.id;
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    };
    this.modify = function(type, callbackSuccess, callbackError) {
      //var elementCreated = (type == 'vod') ? this.elementPreSelected : this.elementCreated;
      dacast['' + type + ''].modify({
        id: this.elementCreated,
        title: 'Title modified'
      }, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    };
    this.delete = function(type, callbackSuccess, callbackError) {
      dacast['' + type + ''].delete({
        id: this.elementCreated
      }, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    };
    this.upload = function(type, callbackSuccess, callbackError) {
      dacast['' + type + ''].splashscreen.upload({
        id: this.elementCreated,
        file: {
          fieldName: 'test',
          originalFilename: 'test.jpg',
          path: './test/test.jpg',
          headers: {
            'content-disposition': 'form-data; name="test"; filename="test.jpg"',
            'content-type': 'image/jpeg'
          },
          size: 61129
        }
      }, function success() {
        console.log('element uploadé');
        return callbackSuccess();
      }, function(error) {
        return callbackError(error);
      });
    };
    this.transcodingList = function(callbackSuccess, callbackError) {
      var self = this;
      dacast.vod.transcoding.list({
        id: this.elementCreated
      }, function(success) {
        self.templateId = success[0].id
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    }
    this.transcodingEncode = function(callbackSuccess, callbackError) {
      dacast.vod.transcoding.encode({
        id: this.elementCreated,
        template_id: this.templateId
      }, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    }

  };

  var test = new Test();
  var timeout = 30000;

  describe('Test backend API ', function() {

    // ****************** Channel methods ******************
    describe('Test Channel methods ', function() {
      describe('Test list method', function() {
        it('return 200 when i get list of all channel', function(done) {
          this.timeout(timeout);
          test.list('channel', function(success) {
            done();
          }, function(error) {
            done(error);
          })
        });
      });

      describe('Test create method', function() {
        it('return 200 when i create a channel', function(done) {
          this.timeout(timeout);
          test.create('channel', function(success) {
            done();
          }, function(error) {
            done(error);
          })
        });
      });

      describe('Test modify method', function() {
        it('return 200 when i modify a channel', function(done) {
          this.timeout(timeout);
          test.modify('channel', function(success) {
            done();
          }, function(error) {
            done(error);
          })
        });
      });

      describe('Test delete method', function() {
        it('return 200 when i delete a channel', function(done) {
          this.timeout(timeout);
          test.delete('channel', function(success) {
            done();
          }, function(error) {
            done(error);
          })
        });
      });
    });

    // ****************** Package methods ******************
    describe('Test package methods ', function() {
      describe('Test list method', function() {
        it('return 200 when i get list of all package', function(done) {
          this.timeout(timeout);
          test.list('package', function(success) {
            done();
          }, function(error) {
            done(error);
          })
        });
      });

      describe('Test create method', function() {
        it('return 200 when i create a package', function(done) {
          this.timeout(timeout);
          test.create('package', function(success) {
            done();
          }, function(error) {
            done(error);
          })
        });
      });

      describe('Test modify method', function() {
        it('return 200 when i modify a package', function(done) {
          this.timeout(timeout);
          test.modify('package', function(success) {
            done();
          }, function(error) {
            done(error);
          })
        });
      });

      describe('Test delete method', function() {
        it('return 200 when i delete a package', function(done) {
          this.timeout(timeout);
          test.delete('package', function(success) {
            done();
          }, function(error) {
            done(error);
          })
        });
      });
    });

    // ****************** Playlist methods ******************
    describe('Test playlist methods ', function() {
      describe('Test list method', function() {
        it('return 200 when i get list of all playlist', function(done) {
          this.timeout(timeout);
          test.list('playlist', function(success) {
            done();
          }, function(error) {
            done(error);
          })
        });
      });

      describe('Test create method', function() {
        it('return 200 when i create a playlist', function(done) {
          this.timeout(timeout);
          test.create('playlist', function(success) {
            done();
          }, function(error) {
            done(error);
          })
        });
      });

      describe('Test modify method', function() {
        it('return 200 when i modify a playlist', function(done) {
          this.timeout(timeout);
          test.modify('playlist', function(success) {
            done();
          }, function(error) {
            done(error);
          })
        });
      });

      describe('Test delete method', function() {
        it('return 200 when i delete a playlist', function(done) {
          this.timeout(timeout);
          test.delete('playlist', function(success) {
            done();
          }, function(error) {
            done(error);
          })
        });
      });
    });

    // ****************** Vod methods ******************
    describe('Test vod methods ', function() {
      describe('Test list method', function() {
        it('return 200 when i get list of all vod', function(done) {
          this.timeout(timeout);
          test.list('vod', function(success) {
            done();
          }, function(error) {
            done(error);
          })
        });
      });

      describe('Test transcoding method', function() {
        it('return 200 when i get list of all bitrates availables', function(done) {
          this.timeout(timeout);
          test.transcodingList(function(success) {
            done();
          }, function(error) {
            done(error);
          })
        });
      });

    });
  });
