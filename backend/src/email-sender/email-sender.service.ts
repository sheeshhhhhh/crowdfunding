import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailSenderService {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async sendEmail(to: string, subject: string, title: string, content: string, img?: string) {
        const msg = {
            to: to,
            from: 'renatodsantosjr9@gmail.com',
            subject: subject,
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <style>
                    /* General Reset and Styling */
                    body {
                        font-family: 'Arial', sans-serif;
                        color: #000;
                        background-color: #fff;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 450px;
                        width: 100%;
                        margin: 0 auto;
                        padding: 20px;
                        box-sizing: border-box;
                        text-align: center;
                    }
                    .header {
                        font-size: 2.5rem;
                        margin-bottom: 20px;
                    }
                    .subheader {
                        font-size: 1.125rem;
                        margin-bottom: 20px;
                    }
                    .button {
                        display: block;
                        text-align: center;
                        padding: 12px 24px;
                        background-color: #1188E6;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 5px;
                        margin: 20px auto;
                        width: auto;
                    }
                    .image-container {
                        margin-bottom: 20px;
                    }
                    .image-container img {
                        max-width: 100%;
                        height: auto;
                        border-radius: 8px;
                    }
                    
                    /* Responsive Design */
                    @media (max-width: 768px) {
                        .header {
                        font-size: 2rem; /* Smaller text on tablets */
                        }
                        .subheader {
                        font-size: 1rem; /* Smaller text on tablets */
                        }
                        .button {
                        padding: 10px 20px; /* Adjust button padding for mobile devices */
                        }
                    }

                    @media (max-width: 480px) {
                        .header {
                        font-size: 1.8rem; /* Even smaller header on small screens */
                        }
                        .subheader {
                        font-size: 0.9rem; /* Smaller subheader text */
                        }
                        .button {
                        padding: 8px 18px; /* Adjust button padding for very small screens */
                        }
                    }
                    </style>
                    <title>Sign Up Confirmation</title>
                </head>
                    <body>
                        <div class="container">
                            <div class="image-container">
                                <img src="${img}" alt="Hero Image">
                            </div>
                            <div style="font-weight: bold" class="header">
                                ${title}
                            </div>
                            <div class="subheader">
                                ${content}
                            </div>
                            <footer style="background: #1f2937; height: 40px; padding: 40px 40px; display: flex; justify-content: center; color: #9ca3af;">
                                © 2024 CrowdFund, Inc. All rights reserved.
                            </footer>
                        </div>
                    </body>
                </html>
            `
        }

        try {
            const response = await sgMail.send(msg);
            return response
        } catch (error) {
            console.log(`Error sending email: ${error}`);
            throw new InternalServerErrorException('Error sending email');
        }
    }
}
