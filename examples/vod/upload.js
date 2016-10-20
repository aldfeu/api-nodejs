var http = require('http');
var multiparty = require('multiparty');
var dacast = require('dacast')('YOUR_API_KEY');

http.createServer(function(req, res) {
  /*
   * Upload a splashscreen for a channel
   */
  if (req.url === '/upload' && req.method === 'POST') {
    // Parse a file upload
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
      dacast.vod.upload({
        file: files.upload // Required - Array of files
      }, function progress(result) {
        console.log('progress ', result);
      }, function success(success) {
        console.log('success ',success);
      },function(error) {
        console.log('error ',error);
      });
    });
    return;
  };

  res.writeHead(200, {
    'content-type': 'text/html'
  });
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="file" name="upload" multiple="multiple"><br>' +
    '<input type="submit" value="Upload">' +
    '</form>'
  );


}).listen(8080);