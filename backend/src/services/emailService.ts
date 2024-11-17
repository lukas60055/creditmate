import nodemailer from 'nodemailer';

export const sendEmail = async (subject: string, text: string) => {
  try {
    if (
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD ||
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT
    ) {
      throw new Error(
        'Missing required environment variables for SMTP configuration.'
      );
    }

    if (!process.env.EMAIL_RECIPIENT) {
      throw new Error('Missing EMAIL_RECIPIENT environment variable.');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const mailOptions = {
      from: `CreditMate <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_RECIPIENT,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);

    if (process.env.NODE_ENV !== 'production') {
      console.log(`Email sent successfully. Message ID: ${info.messageId}`);
    }
  } catch (error) {
    console.error('Error occurred while sending email:', error);
    throw error;
  }
};
