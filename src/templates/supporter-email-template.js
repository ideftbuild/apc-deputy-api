const createSupporterEmailTemplate = () =>
  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Reaching Out</title>
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
                              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 600; letter-spacing: -0.5px;">
                                  Thank You for Reaching Out
                              </h1>
                          </td>
                      </tr>

                      <!-- Content -->
                      <tr>
                          <td style="padding: 40px;">
                              <p style="margin: 0 0 20px; color: #444444; font-size: 16px; line-height: 1.6;">
                                  Hello,
                              </p>

                              <p style="margin: 0 0 30px; color: #555555; font-size: 16px; line-height: 1.6;">
                                  Thank you for getting in touch with <strong>Ibrahim Komkanda Bangura’s campaign</strong>.
                                  We appreciate your message and the time you took to reach out.
                                  Your support means a lot to us as we work towards building a better future for our community.
                              </p>

                              <p style="margin: 0; color: #555555; font-size: 15px; line-height: 1.6;">
                                  Our team will review your message and get back to you soon if a response is needed.
                              </p>
                          </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                          <td style="padding: 30px 40px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 12px 12px; border-top: 1px solid #e9ecef;">
                              <p style="margin: 0; color: #6c757d; font-size: 13px; line-height: 1.5;">
                              <span style="color: #adb5bd;">Together, we can make a difference.</span><br>
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

export default createSupporterEmailTemplate;
