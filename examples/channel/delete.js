
var dacast = require('dacast')('YOUR_API_KEY');

   /*
   * Permanently deletes a channel. It cannot be undone. 
   * Delete a channel object.
   */
  dacast.channel.delete({
    id : 'YOUR_CHANNEL_ID', // Required - Set your own channel id
  },function success(){
    console.log('success');
  },function fail(error){
    console.log('error',error);
  });