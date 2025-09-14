const  cloudinary  = require ('cloudinary').v2;
const fs = require("fs")

   // Configuration
cloudinary.config({ 
     cloud_name: process.env.Cloud_Name, 
     api_key: process.env.Api_Key, 
     api_secret: process.env.Api_Secret // Click 'View API Keys' above to copy your API secret
 });

const uploadOnCloudinary = async(localFilePath)=> {
    
    try {
        if (!localFilePath) return null
        // Upload a file
        const Result = await cloudinary.uploader
        .upload(localFilePath, {   
            resource_type: "auto"
        })
        console.log(Result.url);
        return Result;
        
        } catch (error) {
            fs.unlinkSync(localFilePath) // remove the locally save temporary file as operation got failed
            return null;
    }
    
      
};

module.exports = uploadOnCloudinary