const mongoose = require('mongoose');

    const profileSchema = new mongoose.Schema({
        // _id : {type:mongoose.Schema.Types.ObjectId},
    // name: {type: String, lowercase: true}
  DOB : Date,
  place: String,
  nationality: String,
  maritalStatus: String,
  hobby:String,
  sex:String,

  institute:String,
  occupation: String,
  portfolioLink:String,
  linkedlnLink:String,
  profileImage: String,
  CV:String,

  qualification:String,
  workExperience: Array,

  user:{
      ref:'User',
      type:mongoose.Schema.Types.ObjectId, 
      unique:true
  },
    createdAt: {type: Date, default: Date.now}

});



const profileModel = mongoose.model('Profile', profileSchema);
module.exports = profileModel;

