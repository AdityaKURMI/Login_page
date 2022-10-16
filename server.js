const { resolveSoa } = require('dns/promises');
const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));

//mongoose connection

mongoose.connect("mongodb://localhost:27017/ilogin").then(()=>{
    console.log("connection established");
}).catch((err)=>{
    console.log(err);
});

const schemaUse=new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },
    email:String,
    password:String,
    number:String
}

)
const person=new mongoose.model("records",schemaUse);

app.post('/register',async (req,res)=>{
    
    try{  
       
        const details=new person({
       
        name :req.body.name,

        email :req.body.email,
       password :req.body.password,
      
       
       number:req.body.contact,
      
       })

       const result= await person.find({});
       
   
  for (let i = 0; i < result.length; i++) {
    var flag=0;
    if (result[i].email==req.body.email) {
        flag=+1;
        break;
    }
    
    
  }
  if(flag>=1){
    res.render('alreadyregistered.ejs')
  }else{
res.redirect('/login')
  const result=await person.create(details);
  console.log(result);
  }
 



      
       
    }catch(error){
console.log(error);
       }

})


app.set('view-engine','ejs');

var username;
var useremail;
app.post('/login',async (req,res)=>{
   username=req.body.name;
   useremail=req.body.email;
 const result=await person.find({}).sort({_id:-1})

   
try{
    for (let i = 0; i < result.length; i++) {
        
        if(req.body.email==result[i].email){
            console.log(result[i].name+','+result[i].email+','+result[i].password);
            console.log(i);
            // console.log(result);
            if(req.body.password==result[i].password){
            
            
             
             console.log('success');
            res.redirect('/entrypage')
                
    


                
                
            }else{
                return res.render('incorrectpass.ejs')
            }
            
            
        }
    
}
}
catch (error) {
        console.log(error);
    }



})

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

app.get('/register',(req,res)=>{
    res.render('register.ejs')
    console.log(req.body.name);
})

app.get('/login',(req,res)=>{
    res.render('login.ejs')
})
app.get('/entrypage',(req,res)=>{
    res.render('entrypage.ejs',{name:username})
})
app.listen(3200,()=>{
    console.log("connection established at port 3200");
})