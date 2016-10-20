
var dacast = require('dacast')('YOUR_API_KEY');

  /*
   * List all transcoding options from your file
   * Returns a list of your transcoding options.
   */
  dacast.vod.transcoding.list({
    id : 'YOUR_VOD_ID' // Required - Please set your own vod id 
  },function(success){
    console.log('success',success);
  },function(error){
    console.log('error',error);
  });
