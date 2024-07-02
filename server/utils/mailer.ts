export const mailer = (email: string, emailToken: string) => {
  const { transport } = useNodeMailer();

  const mailOptions = {
    from: '"Your company" noreply@gmail.com',
    to: `${email}`,
    subject: "Please verify your email...",
    html: `<p>Hello, verify your email address by clicking on this</p>
        <br>
        <a href="http://localhost:3000/verify-email?emailToken=${emailToken}">Click here to verify</a>
        `,
  };

  return transport.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
      return error
    } else {
      console.log("Email sent: " + info.response);
      return info.response
    }
  });
};
