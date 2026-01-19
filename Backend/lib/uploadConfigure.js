import multer from 'multer'
import path from 'node:path'


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

const fileFilter = (req, file, cb) => {
const allowedExtensions = ['.jpg', '.jpeg', '.png']
const allowedMimeTypes = ['image/jpeg', 'image/png']
const ext = path.extname(file.originalname).toLowerCase()

  if (!allowedExtensions.includes(ext))  {
    return cb(
      new Error('Solo se permiten imágenes .jpg, .jpeg o .png'),
      false
    )
  }
   if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Tipo MIME no permitido'), false)
  }

  cb(null, true)
}

// Upload final
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5* 1024 * 1024
  }
})

export default upload