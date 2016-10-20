var dacast = require('dacast')('YOUR_API_KEY');

  /*
   * List all playlists
   * Returns a list of your playlists. The channels are returned sorted by creation date, with the most recent playlists appearing first.
   */
  dacast.playlist.all({
    perpage : 10, // Optional - Default : 25 
    page : 2 // Optional - Default : 1
  },function(success){
    console.log('success',success);
  },function(error){
    console.log('error',error);
  });
