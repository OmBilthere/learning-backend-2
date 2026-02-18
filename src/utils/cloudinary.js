import { v2 as cloudinary} from "cloudinary";
import fs from "fs";


    cloudinary.config({ 

     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

     api_key: process.env.CLOUDINARY_API_KEY,

     api_secret: process.env.CLOUDINARY_API_SECRET 
    
    });

    const uploadCloudinary = async (localFilepath)=> {
    
      try {
     
        if(!localFilepath) return null

         const response = await cloudinary.uploader

        .upload( localFilepath, { 

        resource_type: "auto"

      })
       
      // console.log("file is uploaded on clodinary !!!!" , response.url)
      
      fs.unlinkSync(localFilepath)
      return response;

    }

     catch(error) {
           
        if (fs.existsSync(localFilepath)) {
      
        fs.unlinkSync(localFilepath);
     
       }
           
           console.log(error);

           return null;

     }
    
  };

   const deleteFromCloudinary = async (oldimageUrl) => {

     try {
      
    if(!oldimageUrl) return null
      
     const parts = oldimageUrl.split("/")

     const fileName = parts.pop().split(".")[0]

     const folderPath = parts.slice(parts.indexOf("upload")+1).join("/")
     
     const publicId = `${folderPath}/${fileName}`
   
     await cloudinary.uploader.destroy(publicId)

     }
     catch (error) {

       console.log('Error while deleting from cloudinary' , error)

     }



   }
   
 export {uploadCloudinary , deleteFromCloudinary};
