
var dacast = require('dacast')('YOUR_API_KEY');

  /*
   * Edit a channel
   */
 dacast.channel.modify({
    id : 'YOUR_CHANNEL_ID', // Required - Set your own channel id
    title : 'An other title' // Optional - See the documentation to get parameters list
  },function(success){
    console.log('success',success);
  },function(error){
    console.log('error',error);
  });

