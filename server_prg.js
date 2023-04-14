var module = require('./db_module');
var url = require('url');
var querystring = require('querystring');
var http = require('http');

http.createServer(function(request, response) {
var data1 = '';

request.on('data', function(chunk) {
            data1 += chunk;
        });

request.on('end', function(){
var name = querystring.parse(data1)["username"];
console.log(name);
var email = querystring.parse(data1)["email"];
console.log(email);
var mobile = querystring.parse(data1)["mobile"];
console.log(mobile);
var city = querystring.parse(data1)["city"];
console.log(city);
var gender = querystring.parse(data1)["gender"];
console.log(gender);


if (request.url == '/show') {
      console.log('show')
module.showData(email,mobile,city,name,gender, response);
            } 
else if (request.url =='/save') {
      console.log("save");
module.saveData(name, email,mobile,city,gender, response);
            } 
else if(request.url=='/update'){
      console.log("update");
module.updateData(name, email,mobile, response);
            } 
else if(request.url=='/delete'){
      module.deleteData(name,email,mobile,city,gender,response);
      
}

      });
    
}).listen(3000);
console.log("Server started");