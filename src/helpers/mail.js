import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "10.1.1.67",
  port: 25,
  secure: false,
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
const SENDMAIL = async (mailDetails, callback) => {
  try {
    const info = await transporter.sendMail(mailDetails);
    callback(info, null);
  } catch (error) {
    callback(null, error);
    console.log("\n ----- SENDMAIL ------ error \n ", error);
  }
};
export const HTML_TEMPLATE = (text) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>ООО «Пост Модерн Текнолоджи»</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .email-header {
              background-color: ##f4f4f4;
              color: #333;
              padding: 10px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: ##f4f4f4;
              color: #333;
              padding: 10px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email">
              <div class="email-header">
                <h1>PMT Support</h1>
              </div>
              <div class="email-body">
                <p>${text}</p>
              </div>
              <div class="email-footer">
                <p>ООО «Пост Модерн Текнолоджи» email: pmt@pmtech.ru</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
};
export default SENDMAIL;
