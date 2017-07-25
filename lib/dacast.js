var rest;

function Dacast(apiKey) {
  if (!(this instanceof Dacast)) return new Dacast(apiKey);
  rest = require('./rest.js')(apiKey);
};

Dacast.prototype = {
  channel: {
    all: function(params, callbackSuccess, callbackError) {
      if(!params.perpage){
        params.perpage = 25;
      };
      if(!params.page){
        params.page = 1;
      };
      rest.get('/channel', params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    create: function(params, callbackSuccess, callbackError) {
      if (!params.flash) {
        params.flash = 0;
      };
      rest.post('/channel', params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
     get: function(params, callbackSuccess, callbackError) {
      rest.put('/channel/' + params.id, params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    modify: function(params, callbackSuccess, callbackError) {
      rest.put('/channel/' + params.id, params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    delete: function(params, callbackSuccess, callbackError) {
      if (!params.force) {
        params.force = 0;
      };
      rest.delete('/channel/' + params.id, params, function() {
        return callbackSuccess();
      }, function(error) {
        return callbackError(error);
      });
    },
    thumbnail: {
      upload: function(params, callbackSuccess, callbackError) {
        rest.upload({
          id: params.id,
          file: params.file,
          type: 'thumbnail'
        }, function(success) {
          return callbackSuccess(success);
        }, function(error) {
          return callbackError(error);
        });
      }
    },
    splashscreen: {
      upload: function(params, callbackSuccess, callbackError) {
        rest.upload({
          id: params.id,
          file: params.file,
          type: 'splash'
        }, function(success) {
          return callbackSuccess(success);
        }, function(error) {
          return callbackError(error);
        });
      }
    }
  },
  vod: {
    all: function(params, callbackSuccess, callbackError) {
      if(!params.perpage){
        params.perpage = 25;
      };
      if(!params.page){
        params.page = 1;
      };
      rest.get('/vod', params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    create: function(params, callbackSuccess, callbackError) {
      rest.upload({
        file: params.file
      }, function(success) {
        console.log(success);
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    get: function(params, callbackSuccess, callbackError) {
      rest.put('/vod/' + params.id, params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    modify: function(params, callbackSuccess, callbackError) {
      rest.put('/vod/' + params.id, params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    delete: function(params, callbackSuccess, callbackError) {
      rest.delete('/vod/' + params.id, params, function() {
        return callbackSuccess();
      }, function(error) {
        return callbackError(error);
      });
    },
    upload : function(params, callbackProgress, callbackSuccess, callbackError){
      params['file'].forEach(function(file){
        rest.upload({
          file: file
        }, function(progress) {
          return callbackProgress(progress);
        },function(success) {
          return callbackSuccess(success);
        }, function(error) {
          return callbackError(error);
        });
      });
    },
    transcoding : {
      list : function(params,callbackSuccess,callbackError){
        rest.get('/vod/'+ params.id +'/transcoding', params, function(success){
          return callbackSuccess(success);
        },function(error){
          return callbackError(error);
        });
      },
      encode : function(params, callbackSuccess, callbackError){
        rest.post('/vod/'+ params.id +'/transcoding', params, function(success){
          return callbackSuccess(success);
        },function(error){
          return callbackError(error);
        });
      }
    },
    thumbnail: {
      upload: function(params, callbackSuccess, callbackError) {
        rest.upload({
          id: params.id,
          file: params.file,
          type: 'thumbnail'
        }, function(success) {
          return callbackSuccess(success);
        }, function(error) {
          return callbackError(error);
        });
      }
    },
    splashscreen: {
      upload: function(params, callbackSuccess, callbackError) {
        rest.upload({
          id: params.id,
          file: params.file,
          type: 'splash'
        }, function(success) {
          return callbackSuccess(success);
        }, function(error) {
          return callbackError(error);
        });
      }
    },

  },
  package: {
    all: function(params, callbackSuccess, callbackError) {
      rest.get('/package', params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    get: function(params, callbackSuccess, callbackError) {
      rest.put('/package/' + params.id, params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    create: function(params, callbackSuccess, callbackError) {
      rest.post('/package', params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    modify: function(params, callbackSuccess, callbackError) {
      rest.put('/package/' + params.id, params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    delete: function(params, callbackSuccess, callbackError) {
      rest.delete('/package/' + params.id, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    thumbnail: {
      upload: function(params, callbackSuccess, callbackError) {
        rest.upload({
          id: params.id,
          file: params[0].file,
          type: 'thumbnail'
        }, function(success) {
          return callbackSuccess(success);
        }, function(error) {
          return callbackError(error);
        });
      }
    },
    splashscreen: {
      upload: function(params, callbackSuccess, callbackError) {
        rest.upload({
          id: params.id,
          file: params[0].file,
          type: 'splash'
        }, function(success) {
          return callbackSuccess(success);
        }, function(error) {
          return callbackError(error);
        });
      }
    }
  },
  playlist: {
    all: function(params, callbackSuccess, callbackError) {
      rest.get('/playlist', params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    get: function(params, callbackSuccess, callbackError) {
      rest.put('/playlist/' + params.id, params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    create: function(params, callbackSuccess, callbackError) {
      rest.post('/playlist', params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    modify: function(params, callbackSuccess, callbackError) {
      rest.put('/playlist/' + params.id, params, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    delete: function(params, callbackSuccess, callbackError) {
      rest.delete('/playlist/' + params.id, function(success) {
        return callbackSuccess(success);
      }, function(error) {
        return callbackError(error);
      });
    },
    thumbnail: {
      upload: function(params, callbackSuccess, callbackError) {
        rest.upload({
          id: params.id,
          file: params.file,
          type: 'thumbnail'
        }, function(success) {
          return callbackSuccess(success);
        }, function(error) {
          return callbackError(error);
        });
      }
    },
    splashscreen: {
      upload: function(params, callbackSuccess, callbackError) {
        rest.upload({
          id: params.id,
          file: params.file,
          type: 'splash'
        }, function(success) {
          return callbackSuccess(success);
        }, function(error) {
          return callbackError(error);
        });
      }
    }
  }
};

module.exports = Dacast;
