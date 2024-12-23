import * as crypto from 'crypto';
import * as multer from 'multer';

export const multerStorage = (dest: string="uploads") => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, dest)
        },
        filename: (req, file, cb) => {
            const randomId = crypto.randomBytes(16).toString('hex');
            cb(null, `${randomId}.${file.originalname}`)
        }
    })
}