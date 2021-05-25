// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import express from 'express';
import path from 'path';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) { cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) }
});

function checkFileType(file, cb) { 
    const filetypes = /jpg|jpeg|png/;
    const extension = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extension && mimetype) {
        return cb(null, true);
    } else {
        cb('File non supportato');
    }
}

const upload = multer({ storage, fileFilter: function(req, file, cb) {checkFileType(file, cb)} });

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});

export default router;