var dacast = require('dacast')('YOUR_API_KEY');

   /*
   * Permanently delete a package. It cannot be undone. 
   * Delete a package object.
   */
  dacast.package.delete({
    id : 'YOUR_PACKAGE_ID', // Required - Set your own package id
  },function success(){
    console.log('success');
  },function fail(error){
    console.log('error',error);
  });
