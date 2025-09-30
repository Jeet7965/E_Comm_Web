import mongoose, { Types } from "mongoose";

const BannerSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    image:
    {
        type:String,
        require:false,
        
    },
    imageposition:{
        enum:["top","center","bottom"]
    }


    
},{Timestamp:true})

export default mongoose.model("Banner",BannerSchema);