
var dacast = require('dacast')('YOUR_API_KEY');

   /*
   * Permanently delete a package. It cannot be undone. 
   * Delete a package object.
   */
  dacast.package.modify({
    id : 'YOUR_PACKAGE_ID', // Required - Set your own package id
    title : 'An other title' // Optional - See the documentation to get parameters list
  },function success(){
    console.log('success');
  },function fail(error){
    console.log('error',error);
  });