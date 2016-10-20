var dacast = require('dacast')('YOUR_API_KEY');

   /*
   * Permanently deletes a vod. It cannot be undone. 
   * Delete a vod object.
   */
  dacast.vod.delete({
    id : 'YOUR_VOD_ID', // Required - Set your own vod id
  },function success(){
    console.log('success');
  },function fail(error){
    console.log('error',error);
  });