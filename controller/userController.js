const userModel = require('../model/user');
const userController = require('../model/user');
const bcrypt = require('bcrypt');
// const { exists } = require('../model/article');
const helper = require('../helpers/helpers');


let saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);



// // send mail
// const { render } = require('ejs');
//      let sendMail = (receiver, subject, HTMLmsg)=>{
//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: process.env.EMAIL_ADDRESS,
//               pass: process.env.EMAIL_PASSWORD
//             }
//           });
          
//           var mailOptions = {
//             from: process.env.EMAIL_ADDRESS,
//             to: receiver,
//             subject: subject,
//             html: HTMLmsg
//           };
          
//           transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//               console.log(error);
//             } else {
//               console.log('Email sent: ' + info.response);
//             }
//           });
//      }



// global variable
let userLogin;

module.exports = confirmLogin =()=>{
if(typeof userLogin == 'undefined'){
 console.log("you are not yet login ok");
}else{
  console.log(userLogin[0].name + "is the new guy login");
}
}



// get sing up
module.exports = signUp = (req, res)=>{
  res.send("this is get sign up ok");
}  

// post sign Up
module.exports = signUp = (req, res)=>{
  let err = [];
    
    const{name, profileStatus, email, password} = req.body ;

    // validate user signup

    if(password.toString().length < 8){
      err.push({singUpErr : "You must enter atleast 8 character password"})
      console.log("You must enter atleast 8 character password");
      ;
    }

    if(name.toString().length < 1){
        err.push({nameErr : "name field can not be blank"});
        console.log("name field can not be blank");
      }

    if(email.toString().length < 5 || email.toString().includes('@') == false){
        err.push({emailErr : "email field must not be less than 5 characters and must contain @"});
        console.log("email field must not be less than 5 characters and must contain @");
        
      }

      if(email.toString().length > 5 && email.toString().includes('@') == true){

         // To check to see if username as already be used
    userModel.find({email : email}).exec((error, exist)=>{
      if(exist){
      //  console.log(" record aready exist");
       err.push(exist);
       err.push({duplicateErr: "username or email already used"});
      }
      
    });  
        
      }
      
  
    // if validation is passed ?
   if(err.length < 1 ){
   
    // hashing password
    let hasPassword = bcrypt.hashSync(password, salt);

    let aRecord = {name, email, password: hasPassword, status:'Sylvic@forum'}
    const record = new userModel(aRecord);
   record.save((docs, err)=>{
    if(docs){
      record.save()
     res.send(docs);
     
     // send mail
// sendMail('glareminds@gmail.com', 'WELCOME TO JOB-FIND', 
// '<div><h1>Job-find</h1><p>Thanks for signing up with JOB-FIND . Please click <a href = "localhost:3000/login"><b>HERE</b></a> to login</p></div>');

    }
    if(err){
    console.log(err)
    }
   });

   }

}

// get login
module.exports = login = (req, res)=>{
  res.send("this is get login ok");
}  

// post login
module.exports = login = (req, res, next)=>{
const {email, password} = req.body;

  userModel.find({email:email}).exec((err, docs)=>{
  if(err){
    console.log(err);
    console.log("no record found");
   }
  if(docs){
    // res.send(docs);

    // res.send(docs[0].password);
   
  bcrypt.compare(password, docs[0].password, (err, isMatch)=>{
    if(isMatch){

    req.session.data = docs;  
    userLogin = req.session.data;

    console.log(userLogin[0].name + " just login");
    res.send(userLogin);
    // res.redirect('/user');
    }
    if(!isMatch){
    res.send("user name or password does not match");
    }else if(err){
      console.log("You are not login");
    }

  });

   }
  });

  next();

}

// logout controller
module.exports = logOut = (req, res)=>{
  console.log(req.session.data + " just logged out");     
  req.session.destroy(()=>{
  res.cookie({maxAge: 0});
  
  }); 
}

// get forgetPassword
module.exports = confirmPassword = (req, res)=>{
  res.send("this is get forget password ok");
}  

// post Confirm password 
module.exports = confirmPassword = async(req, res) =>{

const{email} = req.body;
await userModel.find({email:email}).then((exist, notExist)=>{
  if(exist){
    res.send(exist[0].id);
  }
  if(notExist){
  res.send("Email does not exist");  
  }
  

});

}


// get forgetPassword
module.exports = changePassword = (req, res)=>{
  res.send("this is get forget password ok");
}  

// forget password 
module.exports = changePassword= async(req, res) =>{
console.log("All you do is forget password");

await userModel.find({email:email});
console.log(docs);

}