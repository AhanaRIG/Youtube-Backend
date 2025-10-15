import multer from "multer";

// since we can get only files like json in "req" parameter and not some actual files like .mp4 .jpg etc ... we use the "file" paramter of multer to handle such files

// cb parameter stands for callback functions

const storage = multer.diskStorage(
    {
        destination: function (req,file,cb) {
            cb(null,"./public/temp") // this is temp storage for files
        },
        // filename: function (req,file,cb)  {
        //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        //     cb(null,file.fieldname + "-" + uniqueSuffix)

        filename: function (req,file,cb)  {
            cb(null,file.originalname)
            /// We should have added suffix using the above commented code to avoid two files with same name getting uploaded at the same time and cause confusion for the server
        }
    }
)

export const upload = multer ({storage : storage})


// from ES6, if the property name and variable names are same
// we can only write it once, as seen below
// export const upload = multer ({storage})