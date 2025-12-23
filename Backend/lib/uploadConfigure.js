import multer from 'multer'
import path from 'node:path'

//declaro una configuración de almacenamiento

const storage = multer.diskStorage({
    destination: function(req,file,callback){

        let folder;

        switch (file.fieldname)
        {
            case "carousel":
                folder = "photoCarousel";
            break;
            
            case "poster":
                folder ="photoPoster";
                break;
            case "avatar":
                folder ="AvatarUser"
                break;    
        }
        
        const rutaFinal = path.join(import.meta.dirname, '..', 'public', folder)
        callback(null, rutaFinal)
    },
    filename: function(req,file , callback){
        const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`
        callback(null,filename )
    }
})

//declaro una configuración de upload

const upload = multer({ storage})

export default upload