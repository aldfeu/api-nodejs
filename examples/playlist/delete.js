var dacast = require('dacast')('YOUR_API_KEY');

   /*
   * Permanently delete a playlist. It cannot be undone. 
   * Delete a playlist object.
   */
  dacast.playlist.delete({
    id : 'YOUR_PLAYLIST_ID', // Required - Set your own playlist id
  },function success(){
    console.log('success');
  },function fail(error){
    console.log('error',error);
  });
