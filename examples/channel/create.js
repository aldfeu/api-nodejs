var dacast = require('dacast')('YOUR_API_KEY');

dacast.channel.create({
  title:"Channel One", // Required
  description:"This is my first channel", // Required
  flash : 0 // Optional - Only few accounts are able to set flash channel type (Default : 0)
},function(success){
  console.log('success',success);
},function(error){
  console.log('error',error);
});