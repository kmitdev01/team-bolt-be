const router = require("express").Router();
const categoryHandlers = require('../controllers/categoryController.js');
const authUser = require('../middleware/auth.js');

const path = require('path');
const multer = require('multer');

//const upload = multer({ dest: './uploads/' });

const imageStorage = multer.diskStorage({
    // Destination to store image     
    dest: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() +
                path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

/********** Main category Routes ******** */
router.post("/category", authUser.verifyUser, categoryHandlers.addCategory);
router.get("/category", authUser.verifyUser, categoryHandlers.getCategory);
router.delete("/category/:id", authUser.verifyUser, categoryHandlers.deleteCategory);
router.patch("/category/:id", authUser.verifyUser, categoryHandlers.updateCategory);

/********** Sub category Routes ******** */
router.post("/sub-category", authUser.verifyUser, categoryHandlers.addSubCategory);
router.post("/upload-image/:id", authUser.verifyUser, imageUpload.single('catImg'), categoryHandlers.uploadImageCat);
router.get("/sub-category", authUser.verifyUser, categoryHandlers.getSubCategory);
router.delete("/sub-category/:id", authUser.verifyUser, categoryHandlers.deleteSubCategory);
router.patch("/sub-category/:id", authUser.verifyUser, categoryHandlers.updateSubCategory);



module.exports = router;