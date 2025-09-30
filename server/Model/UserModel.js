import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true,
        enum: ["male", "female", "other"]
    },
    email: {
    type: String,
    required: true,
    unique: true,  // ✅ prevent duplicate emails
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"] // basic validation
  },
  password: {
    type: String,
    required: true,
    minlength: 8 // optional: enforce password length
  },
  role: {
    type: String,
    enum: ["user","admin","superAdmin","vendor"], 
    default: "user" // ✅ default role
  },
  profile:{
    type:String,
    require:null
  }
  

},{ timestamps: true })

export default mongoose.model("users",UserSchema)