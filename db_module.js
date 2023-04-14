var MongoClient=require('mongodb').MongoClient;
var url='mongodb://localhost:27017/';
console.log("MongoDB");

exports.saveData= function (name, email,mobile,city,gender, response) {
	
	MongoClient.connect(url,function(err,db){ 
	if(err) throw err;
	var dbcon=db.db('demo');  
	var msg="";
	var myobj = {"name":name,"email":email,"mobile":mobile,"city":city,"gender":gender}; 
	dbcon.collection("cc").insertOne(myobj,function(err,res){
		if (err)
		{
			console.log(err);
			msg="Data Not inserted";
		}
		else
		{
			msg="Name:"+name + "Email:"+email +"mobile:"+mobile+"gender:"+gender+"city:"+city+" ***Inserted***";
			console.log("Document inserted");
		}
	
		response.write(msg);
		response.end();
		db.close();
	});
	
	});
		
  }; 


  exports.showData= function (email,mobile,city,gender,name, response) {
	MongoClient.connect(url,function(err,db){ 
	if(err) throw err;
	var dbcon=db.db('demo'); 
	var msg="";
	
	dbcon.collection("cc").find({}).toArray(function(err, result) {
		if (err)
		{
			console.log(err);
			msg="Error!!!";
		}
		else
		{
			console.log(result);
	 
			var Length = result.length;
			console.log("Length:"+Length);
			msg="<table border='2'><tr><td>S.No</td><td>name</td><td>Mobile</td><td>City</td><td>Gender</td><td>Mail</td></tr>";
			for(var i=0; i<Length; i++)
			{
				msg+="<tr><td>"+(i+1)+"</td><td>"+result[i].name+"</td><td>"+result[i].mobile+"</td><td>"+result[i].city+"</td><td>"+result[i].gender+"</td><td>"+result[i].email+"</td></tr>";
				 
			}
			msg+="</table>";
			console.log(msg);
		}
		response.write(msg);
		response.end();
		db.close();
	 
	  });
      
	
	});
		
  }; 
  exports.updateData=function(name,email,mobile, response){
	MongoClient.connect(url,function(err,db){ //Connection to server
		if(err) throw err;
		var dbo = db.db("demo");
		var msg='';
		  var myquery = {"name":name};
		  var newvalues = {$set: {"name":name,"email":email,"mobile":mobile } };
		  dbo.collection("cc").update(myquery, newvalues,{upsert:true}, function(err, res) {
			if (err){
				console.log(err);
				msg="data not updated";
			}
			else{
				msg=("updated email:"+email+"updated mobileno:"+mobile)
				
				console.log(" document updated");
			}
			
			response.write(msg);
			response.end();
			db.close();
		  });
		
		});
  };
  exports.deleteData=function(name,email,mobile,city,gender,response){
	  MongoClient.connect(url,function(err,db){
		  if(err)throw err;
		  var dbo=db.db("demo");
		  var msg='';
		  var myobj={"name":name};
		  dbo.collection("cc").deleteOne(myobj,function(err,res){
			  if(err)
			  {
			
				  msg="Document not deleted!!";
			  }
			  else{
				  msg=("document of"+name+"deleted successfully!!");
			  }
			  response.write(msg);
			  response.end();
			  db.close();
		  });
	  });
  };
  
 