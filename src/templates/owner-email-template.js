const createOwnerEmailTemplate = ({ recipientEmail, name, message }) =>
  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Campaign Message</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
                <td align="center" style="padding: 40px 20px;">
                    <!-- Main Container -->
                    <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="padding: 40px 40px 30px; text-align: center; background-color: #ef4444; border-radius: 12px 12px 0 0;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">New Campaign Message</h1>
                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px;">
                                <p style="margin: 0 0 20px; color: #666666; font-size: 16px; line-height: 1.6;">
                                    Hello,
                                </p>

                                <p style="margin: 0 0 30px; color: #666666; font-size: 16px; line-height: 1.6;">
                                    You've received a new message from your campaign landing page:
                                </p>

                                <!-- Message Details -->
                                <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                    <tr>
                                        <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef;">
                                            <p style="margin: 0; color: #495057; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                                            <p style="margin: 8px 0 0; color: #212529; font-size: 16px; font-weight: 500;">${name}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef;">
                                            <p style="margin: 0; color: #495057; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                                            <p style="margin: 8px 0 0; color: #212529; font-size: 16px; font-weight: 500;">
                                                <a href="mailto:${recipientEmail}" style="color: #667eea; text-decoration: none;">${recipientEmail}</a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 20px;">
                                            <p style="margin: 0; color: #495057; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                                            <p style="margin: 8px 0 0; color: #212529; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                                        </td>
                                    </tr>
                                </table>

                                <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">
                                    Please respond to this inquiry at your earliest convenience.
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding: 30px 40px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 12px 12px; border-top: 1px solid #e9ecef;">
                                <p style="margin: 0; color: #6c757d; font-size: 13px; line-height: 1.5;">
                                    This email was sent from your campaign landing page<br>
                                    <span style="color: #adb5bd;">Ibrahim Komkanda Bangura © 2025</span>
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

export default createOwnerEmailTemplate;
