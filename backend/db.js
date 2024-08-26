const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
// connect to MongoDB:
mongoose.connect("mongodb+srv://ishanbahuguna:e7uQxz3Y1QEON3Fj@cluster0.pth1o34.mongodb.net/wallet");

// Define Schemas:
const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30
  },
  password: {
    type: String,
    required: true, 
    minLength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastName:{
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  }
}); 

// method to generate hash from plain text:
userSchema.methods.createHash = async (plainTextPassword) => {
  // Hashing users salt and password with 10 iterations
  const saltRounds = 10;

  // First method to generate a salt and then create hash:
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword , salt);
}

userSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword , this.password);
}

const accountSchema = new mongoose.Schema({
  userId: [{ 
    type: mongoose.Schema.Types.ObjectId,   
    ref: "User", // Joining tables in MongoDB with mongoose
    required:true
  }], 
  balance:{ 
    // Why not floay? : precision in DB and JS e.g: 88.868 saved as 88.87 which is wrong balance
                // we store int and remember the precisio  for 2 decimal places
                // e.g : 8888 === 88.88 , 888800 === 8888.00
    type: Number,
    required:true
  }

})

const User = mongoose.model("User" , userSchema);
const Account = mongoose.model("Account" , accountSchema);

module.exports = {
    User,
    Account
}