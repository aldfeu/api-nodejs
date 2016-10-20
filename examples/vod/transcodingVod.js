
var dacast = require('dacast')('YOUR_API_KEY');

  /*
   * List all transcoding options from your file
   * Returns a list of your transcoding options.
   */
  dacast.vod.transcoding.encode({
    id : 'YOUR_VOD_ID' // Required - Please set your own vod id ,
    template_id : '5' // Required - you need to get the list of transcoding availables
  },function(success){
    console.log('success',success);
  },function(error){
    console.log('error',error);
  });
