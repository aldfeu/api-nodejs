var dacast = require('dacast')('YOUR_API_KEY');

  /*
   * Create a package
   * Creates a new package object.
   */
  dacast.playlist.create({
    title:"Playlist One", // Required
    description:"This is my first playlist", // Required
  },function(success){
    console.log('success',success);
  },function(error){
    console.log('error',error);
  });