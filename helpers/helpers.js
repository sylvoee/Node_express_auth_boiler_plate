// // send mail
//     var nodemailer = require('nodemailer');
    
//      module.exports = sendMail = (receiver, subject, HTMLmsg)=>{
//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: 'glareminds@gmail.com',
//               pass: 'sylvicglareminds88'
//             }
//           });
          
//           var mailOptions = {
//             from: 'glareminds@gmail.com',
//             to: receiver,
//             subject: subject,
//             html: HTMLmsg
//           };
          
//           transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//               console.log(error + " Unable to send email");
//             } else {
//               console.log('Email sent: ' + info.response);
//             }
//           });
//      }