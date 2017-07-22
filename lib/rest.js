var request = require('request');

function Rest(apiKey) {
  if (!(this instanceof Rest)) {
    return new Rest(apiKey);
  };
  this.API_CONFIG = {
    base: 'https://api.dacast.com/v2',
    upload_path: 'http://upload.dacast.com',
    pollingInterval: 3000,
    maxRetry: 20
  };
  this.token = apiKey;
  this.async_call = false;
  this.progress = function(result){
    console.log('je suis la', result.message);
  };
  this.longPolling = function(status, url, iter, callbackSuccess, callbackError, callbackProgress, type) {
    var self = this;
    if (iter <= this.API_CONFIG.maxRetry) {
      request({
        method: 'GET',
        params: {
          apikey: this.token
        },
        url: url
      }, function(error, response, result) {
        if (result) {
          result = JSON.parse(result);
        };
        if (error || result && result.errors) {
          return self.responseError(response.statusCode, result, callbackSuccess, callbackError);
        } else {
          var status = result.status ? result.status : response.statusCode
          if(type){
            callbackProgress(result);
          };
          return self.responseSuccess(status, result, iter, callbackSuccess, callbackError, callbackProgress, type);
        }
      });
    } else {
      return self.responseError(status, {}, callbackSuccess, callbackError);
    }
  };
  this.responseSuccess = function(status, response, iter, callbackSuccess, callbackError, callbackProgress, type) {
    var self = this;
    if (status == 202) {
      setTimeout(function() {
        iter++;
        var url = response.data && !type ? response.data.url : response.url;

        self.longPolling(status, url, iter, callbackSuccess, callbackError, callbackProgress, type);
      }, self.API_CONFIG.pollingInterval);
    } else {
      if (response.data && response.data.paging) {
        if (response.data.paging.next) {
          response.data.paging.next = response.data.paging.next.replace('/v2', '');
        }
        if (response.data.paging.previous) {
          response.data.paging.previous = response.data.paging.previous.replace('/v2', '');
        }
        if (response.data.paging.last) {
          response.data.paging.last = response.data.paging.last.replace('/v2', '');
        }
        if (response.data.paging.self) {
          response.data.paging.self = response.data.paging.self.replace('/v2', '');
        }
      }
      var result = response.data && !type ? response.data : response;
      callbackSuccess(result);
    }
  };
  this.rightErrorFormat = function(error) {
    if (error) {
      var msg = {};
      error.errors.forEach(function(err, key) {
        if (typeof err.message == 'array') {
          err.message.forEach(function(errdetail, key) {
            msg.property = errdetail.property;
            msg.message = errdetail.message;
            msg.value = errdetail.value;
          });
        } else {
          msg.message = err.message;
        }
      });
      return msg;
    } else {
      return 'We\'ve got an issue, please try again';
    }
  };
  this.responseError = function(status, response, callbackSuccess, callbackError) {
    if (status == 403) {
      return "You\'re not authorized to do that";
    } else {
      callbackError(this.rightErrorFormat(response));
    }
  };
};

Rest.prototype.get = function(url, params, callbackSuccess, callbackError) {
  var self = this;
  if (this.token) {
    params.apikey = this.token;
  };
  if (this.async_call) {
    params.async_call = false;
  };

  var options = {
    method: 'GET',
    url: this.API_CONFIG.base + url,
    qs: params
  };

  request(options, function(error, response, result) {
    if (result) {
      result = JSON.parse(result);
    };
    if (error || result.errors) {
      return self.responseError(response.statusCode, result, callbackSuccess, callbackError);
    } else {
      return self.responseSuccess(response.statusCode, result, 0, callbackSuccess, callbackError);
    }
  });
};

Rest.prototype.upload = function(params, callbackProgress, callbackSuccess, callbackError) {
  var self = this;
  var fs = require('fs');
  var qs = {};
  if (self.token) {
    params.apikey = self.token;
  };
  if (self.async_call) {
    params.async_call = false;
  };
  var getToken = function(file, callback) {
    var postData = {};
    var obj = {};
    obj.source = file.originalFilename;
    obj.auto_encoding = params.auto_encoding;
    obj.callback_url = 'http://dacast.com';
    obj.token_js = true;
    obj.upload_type = 'ajax';

    postData.url = params.type ? self.API_CONFIG.base + '/' + params.endpoint + '/' + params.id + '/' + params.type : self.API_CONFIG.base + '/' + params.endpoint;
    postData.method = 'POST';
    postData.qs = {
      apikey: params.apikey
    };
    postData.body = JSON.stringify(obj);

    request(postData, function(error, response, result) {
      if (error) {
        return callback(error, null);
      } else {
        //result.file = file;
        //console.log('result', JSON.stringify(result));
        return callback(error, JSON.parse(result));
      };
    });
  };

  getToken(params.file, function(error, response) {
    var formData = {};
    formData = response.data;
    formData.file = fs.createReadStream(params.file.path);

    request.post({
      url: self.API_CONFIG.upload_path,
      formData: formData
    }, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return self.responseError(err, callbackSuccess, callbackError);
      } else {
        //console.log('Upload successful!  Server responded with:', body);
        return self.responseSuccess(response.status, response, 0, callbackSuccess, callbackError, function(progress){
          callbackProgress(progress);
        }, 'upload');
      }
    });
  });
};

Rest.prototype.post = function(url, obj, callbackSuccess, callbackError) {
  var self = this;
  var params = {};
  if (this.token) {
    params.apikey = this.token;
  };
  if (this.async_call) {
    params.async_call = false;
  };

  var options = {
    method: 'POST',
    url: this.API_CONFIG.base + url,
    qs: params,
    body: JSON.stringify(obj)
  };
  request(options, function(error, response, result) {
    if (result) {
      result = JSON.parse(result);
    };
    if (error || result.errors) {
      return self.responseError(response.statusCode, result, callbackSuccess, callbackError);
    } else {
      return self.responseSuccess(response.statusCode, result, 0, callbackSuccess, callbackError);
    };
  });
};

Rest.prototype.put = function(url, obj, callbackSuccess, callbackError) {
  var self = this;
  var params = {};
  if (this.token) {
    params.apikey = this.token;
  };
  if (this.async_call) {
    params.async_call = false;
  };

  var options = {
    method: 'PUT',
    url: this.API_CONFIG.base + url,
    qs: params,
    body: JSON.stringify(obj)
  };

  request(options, function(error, response, result) {
    if (result) {
      result = JSON.parse(result);
    };
    if (error || result.errors) {
      return self.responseError(response.statusCode, result, callbackSuccess, callbackError);
    } else {
      return self.responseSuccess(response.statusCode, result, 0, callbackSuccess, callbackError);
    };
  });
};

Rest.prototype.delete = function(url, obj, callbackSuccess, callbackError) {
  var self = this;
  var params = {};
  if (this.token) {
    params.apikey = this.token;
  };
  if (this.async_call) {
    params.async_call = false;
  };
  if(obj.force){
    params.force = obj.force;
  };

  var options = {
    method: 'DELETE',
    url: this.API_CONFIG.base + url,
    qs: params
  };

  request(options, function(error, response, result) {
    if (result) {
      result = JSON.parse(result);
    };
    if (error || result.errors) {
      return self.responseError(response.statusCode, result, callbackSuccess, callbackError);
    } else {
      return self.responseSuccess(response.statusCode, result, 0, callbackSuccess, callbackError);
    };
  });
};

module.exports = Rest;
