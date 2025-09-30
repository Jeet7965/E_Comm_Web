import mongoose, { Types } from "mongoose";

const CategorySchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    }
    
})

export default mongoose.model("Category",CategorySchema);