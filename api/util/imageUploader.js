const multer = require("multer");
const {handleError} = require("./Errorhandler")


const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            //Push image on the basis type inside different folder
                cb(null, 'images/Employee');
        },
        filename(req, file, cb) {
            cb(null, `${new Date().getTime()}_${file.originalname}`);
        }
    }),
    limits: {
        fileSize: 2000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
        // if (!file.originalname.match(/\.(jpeg|jpg|pdf|doc|docx|xlsx|xls)$/)) {
            return cb(
                handleError(404,"only upload files with jpg, jpeg, png")
                // new Error(
                //     'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
                // )
            );
        }
        cb(undefined, true); // continue with upload
    }
});


module.exports = upload;