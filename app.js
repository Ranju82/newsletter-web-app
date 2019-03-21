//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running at port 3000");
});

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var firstName=req.body.First;
  var lastName=req.body.Last;
  var email=req.body.Email;

  var data={
    members:[
      {email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }
    ]
  };

  var jsonData=JSON.stringify(data);

  var options={
    url:"https://us20.api.mailchimp.com/3.0/lists/dfe15c235a",
    method:"POST",
    headers:{
      "Authorization":"ranju 48c870573c3ad9a39e99e53703f84368-us20"
    },
    body:jsonData
  };

  request(options,function(error,response,body){
    if(error){
        res.sendFile(__dirname+"/failure.html");
    }else{
       if(response.statusCode===200){
         res.sendFile(__dirname+"/success.html");
       }else{
         res.sendFile(__dirname+"/failure.html");
       }
    }
  });
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

//API key
//48c870573c3ad9a39e99e53703f84368-us20

//list id
//dfe15c235a
