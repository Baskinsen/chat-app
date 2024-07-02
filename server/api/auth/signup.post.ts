import { createError, eventHandler, readBody } from "h3";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "../../models/index";
import { mailer } from "../../utils/mailer";

const SECRET = process.env.JWT_SECRET;

interface SignUpRequest {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  isVerifiedEmail: string;
  emailToken: string;
}

export default eventHandler(async (event) => {
  const body = (await readBody(event)) as SignUpRequest;
  const { sendMail } = useNodeMailer();
  const emailToken = crypto.randomBytes(64).toString("hex");
  if (!body) {
    throw createError({
      status: 400,
      statusMessage: "Provide Credentials",
    });
  }
  const user = {
    email: body?.email,
    username: body?.username,
    first_name: body?.first_name,
    last_name: body?.last_name,
    password: await bcrypt.hash(body?.password, 10),
    isVerifiedEmail: false,
    emailToken: emailToken,
  };
  let newUser;
  const findUser = await User.findOne({ email: user?.email });
  if (findUser) {
    throw createError({
      status: 400,
      statusText: "Failed",
      statusMessage: "User Already Exists",
    });
  }

  try {
    console.log(user.first_name, user.last_name);
    newUser = await User.create(user);
    console.log(newUser.emailToken);
    newUser.save();
    const response = mailer(newUser?.email, newUser?.emailToken);
    if (!response) {
      console.log(response);
    }
    console.log("mailsent");
    return {
      status: 200,
      statusText: "Success",
      statusMessage: "Account Created Successfully, Verify Email to Login",
    }
  } catch (err: any) {
    console.log(err);
    throw createError({
      status: 500,
      statusText: "Failed",
      statusMessage: err.message,
    });
  }
});
