import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

interface IEmailOptions {
  email: string;
  subject: string;
  link: string;
  template: 'email-confirmation' | 'password-reset';
}

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: +process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const viewsPath = path.join(__dirname, '../views');

transporter.use(
  'compile',
  hbs({
    viewEngine: {
      extname: '.hbs',
      partialsDir: viewsPath,
      layoutsDir: viewsPath,
      defaultLayout: false,
    },
    viewPath: viewsPath,
    extName: '.hbs',
  }),
);

export const sendEmail = async (options: IEmailOptions) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    template: options.template,
    context: {
      link: options.link,
    },
  };
  await transporter.sendMail(mailOptions);
};
