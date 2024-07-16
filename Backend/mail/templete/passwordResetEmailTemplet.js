exports.passwordResetEmailTemplet = (url, email) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Reset Link</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="/">
            <img class="logo" src="https://res.cloudinary.com/dkbzscmmq/image/upload/v1713360202/Omkar/ftboxdmcitfvu8t41gd9.png" alt="Brainwave Academy Logo"></a>
            <div class="message">Password Reset Link</div>
            <div class="body">
                <p >Hey ${email}</p>
                <p>You've requested a password reset for your account. To reset your password, please click the following
                    link:</p>
                <p><a href="${url}" class="link">${url}</a></p>
                <p>If you did not request this password reset, you can safely ignore this email.</p>
            </div>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                at
                <a href="mailto:info@Brainwave Academy.com">info@Brainwave Academy.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>
    `;
};
