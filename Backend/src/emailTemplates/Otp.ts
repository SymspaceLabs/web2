export const otpEmailTemplate = ( otp: string ) => `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <!--[if gte mso 15]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta charset="UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
  <!--[if !mso]><!-->
    <link rel="stylesheet" type="text/css" id="newGoogleFontsStatic"
          href="https://fonts.googleapis.com/css?family=ABeeZee:400,400i,700,700i,900,900i"/>
  <!--<![endif]-->
  <style>
    /* … your existing CSS (unchanged) … */
    img{-ms-interpolation-mode:bicubic;}
    table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;}
    /* rest of your inlined styles… */
  </style>
</head>
<body style="margin:0; padding:0; background:#ffffff;">
  <div style="display:none;max-height:0;overflow:hidden;">͏­</div>
  <center>
    <table id="bodyTable" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
      <tr>
        <td class="bodyCell" align="center" valign="top">
          <table id="root" width="100%" border="0" cellpadding="0" cellspacing="0">

            <!-- HEADER -->
            <tbody data-block-id="9" class="mceWrapper">
              <tr>
                <td class="mceSectionHeader" align="center" valign="top" style="background-color:#000000;">
                  <!--[if (gte mso 9)|(IE)]>
                    <table width="660" align="center" cellpadding="0" cellspacing="0" style="width:660px;">
                      <tr><td><![endif]-->
                  <table role="presentation" width="100%" style="max-width:660px;" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="mceWrapperInner"
                          style="background-color:#000000; padding:50px 0;"
                          align="center" valign="middle">
                        <img data-block-id="1"
                             src="https://mcusercontent.com/a62685d4d57a50fca81707ed2/images/9015c1ea-e196-88c6-580b-d75eb3024af7.png"
                             width="300"
                             alt="Symspace Logo"
                             style="display:block; margin:0 auto;"/>
                      </td>
                    </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>

            <!-- VERIFY / MIDDLE SECTION -->
            <tbody data-block-id="12" class="mceWrapper">
              <tr>
                <td class="mceSectionBody" align="center" valign="top" style="background-color:transparent;">
                  <!--[if (gte mso 9)|(IE)]>
                    <table width="660" align="center" cellpadding="0" cellspacing="0" style="width:660px;">
                      <tr><td><![endif]-->
                  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="mceWrapperInner"
                          style="
                            background: linear-gradient(
                              135deg,
                              #e8cff5 0%,
                              #ffffff 50%,
                              #cef5ff 100%
                            );
                            width:100%;
                            padding:150px 30px;
                          ">
                        <h1 style="
                              font-family:'Helvetica Neue',Arial,sans-serif;
                              font-size:32px;
                              line-height:1.25;
                              color:#1a1a1a;
                              text-align:center;
                              margin:0 0 16px;">
                          Verify Your Account
                        </h1>
                        <p style="
                              font-family:'Helvetica Neue',Arial,sans-serif;
                              font-size:18px;
                              line-height:1.4;
                              color:#707070;
                              text-align:center;
                              margin:0 0 24px;">
                          Your Verification Code is:
                        </p>
                        <h2 style="
                              font-family:'Helvetica Neue',Arial,sans-serif;
                              font-size:40px;
                              line-height:1;
                              color:#000000;
                              text-align:center;
                              margin:0;">
                          ${otp}
                        </h2>
                      </td>
                    </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>

            <!-- FOOTER WITH SOCIAL ICONS + LINKS -->
            <tbody data-block-id="18" class="mceWrapper">
              <tr>
                <td class="mceSectionFooter" align="center" valign="top" style="background-color:#000000; padding:50px 0;">
                  <!--[if (gte mso 9)|(IE)]>
                    <table width="660" align="center" cellpadding="0" cellspacing="0" style="width:660px;">
                      <tr><td><![endif]-->
                  <table role="presentation" style="max-width:660px;" border="0" cellpadding="0" cellspacing="0">

                    <!-- icons row, padded same 20px as the links below -->
                    <tr>
                      <td align="center" style="padding:0 20px 30px;">
                        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="20%" align="left">
                              <a href="https://www.instagram.com/symspacelabs/" target="_blank">
                                <img src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/instagram-icon-light-40.png"
                                     width="24" alt="Instagram"/>
                              </a>
                            </td>
                            <td width="20%" align="center">
                              <a href="https://www.linkedin.com/company/symspace" target="_blank">
                                <img src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/linkedin-icon-light-40.png"
                                     width="24" alt="LinkedIn"/>
                              </a>
                            </td>
                            <td width="20%" align="center">
                              <a href="https://www.youtube.com/@SymspaceLabs" target="_blank">
                                <img src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/youtube-icon-light-40.png"
                                     width="24" alt="YouTube"/>
                              </a>
                            </td>
                            <td width="20%" align="center">
                              <a href="https://www.symspacelabs.com/" target="_blank">
                                <img src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/website-icon-light-40.png"
                                     width="24" alt="Website"/>
                              </a>
                            </td>
                            <td width="20%" align="right">
                              <a href="mailto:contact@symspacelabs.com" target="_blank">
                                <img src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/email-icon-light-40.png"
                                     width="24" alt="Email"/>
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- links + copyright -->
                    <tr>
                      <td align="center" style="padding:0 20px;">
                        <p style="
                              font-family:ABeeZee,Arial,sans-serif;
                              font-size:14px;
                              color:#ffffff;
                              margin:0 0 12px;"
                        >
                          <a href="${process.env.BUYER_URL}/register" style="color:#ffffff; text-decoration:underline;">Seller Signup</a> 
                          |
                          <a href="${process.env.BUYER_URL}/marketplace" style="color:#ffffff; text-decoration:underline;">Shop in AR Marketplace</a>
                          |
                          <a href="${process.env.BUYER_URL}/terms-and-conditions#privacy" style="color:#ffffff; text-decoration:underline;">Privacy Policy</a>
                        </p>
                        <p style="
                              font-family:ABeeZee,Arial,sans-serif;
                              font-size:14px;
                              color:#ffffff;
                              margin:0 0 12px;">
                          © Symspace Labs Inc. All rights reserved.
                        </p>
                        <p style="
                              font-family:ABeeZee,Arial,sans-serif;
                              font-size:14px;
                              color:#ffffff;
                              margin:0;">
                          New York City, NY 10012
                        </p>
                      </td>
                    </tr>

                  </table>
                  <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>

          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;
