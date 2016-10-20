var dacast = require('dacast')('YOUR_API_KEY');

  /*
   * Create a package
   * Creates a new package object.
   */
  dacast.package.create({
    title:"Package One", // Required
    description:"This is my first package", // Required
  },function(success){
    console.log('success',success);
  },function(error){
    console.log('error',error);
  });
