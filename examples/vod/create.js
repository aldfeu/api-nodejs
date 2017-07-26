var http = require('http');
var multiparty = require('multiparty');
var dacast = require('dacast')('YOUR_API_KEY');

http.createServer(function(req, res) {
  /*
   * Upload a file to Video On Demand
   */
  if (req.url === '/upload' && req.method === 'POST') {
    // Parse a file upload
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, file) {
      dacast.vod.create(
        {
          file: {
            originalFilename: file.upload[0]['originalFilename'],
            path: file.upload[0]['path'],
          } //Required
        },
        function success() {
          console.log('success');
        },
        function(error) {
          console.log('error', error);
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
