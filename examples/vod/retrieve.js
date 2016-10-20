
var dacast = require('dacast')('YOUR_API_KEY');

  /*
   * List all VOD
   * Returns a list of your videos. The videos are returned sorted by creation date, with the most recent videos appearing first.
   */
  dacast.vod.all({
    perpage : 10, // Optional - Default : 25 
    page : 2 // Optional - Default : 1
  },function(success){
    console.log('success',success);
  },function(error){
    console.log('error',error);
  });