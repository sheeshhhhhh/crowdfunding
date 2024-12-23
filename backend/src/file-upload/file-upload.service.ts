import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2, UploadApiOptions } from 'cloudinary'

@Injectable()
export class FileUploadService {
    constructor() {
        v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
    }

    async upload(file: Express.Multer.File, options?: UploadApiOptions) {
        const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
            const cloudnaryStream = v2.uploader.upload_stream(
                { resource_type: 'auto', ...options},
                (err, result) => {
                    if(err) {
                        console.log(err)
                        reject(err)
                    }

                    resolve(result as UploadApiResponse)
                }
            )

            cloudnaryStream.end(file.buffer)
        })

        return uploadResult
    }

    async deleteFile(fileUrl: string) {
        const publicId = fileUrl.split("/").pop().split(".")[0];
        const deleteResult = await v2.uploader.destroy(publicId).catch((err) => {
            throw new Error("file delete failed")
        })
        
        return deleteResult
    }
}
