

const multer  = require('multer')
module.exports= upload = multer({ dest: './uploads/' });


// index page
module.exports = index = (req, res)=>{
res.send( "USER "  + req.session.data[0].name + " This is home ok");
}