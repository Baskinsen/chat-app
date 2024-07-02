import bcrypt from "bcrypt";
import { User } from "../../models/index";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const emailToken = body?.emailToken;
  console.log(body, emailToken)
    if(!emailToken) {
        throw createError({
            statusCode: 400,
            statusText: 'Failed',
            statusMessage: "empty request"
        })
    }

  const user = await User.findOne({emailToken: emailToken})
  console.log(user?.emailToken, user?.isVerifiedEmail)

  if(!user) {
    throw createError({
        statusCode: 404,
        statusText: 'Failed',
        statusMessage: 'User Not Found'
    })
  }
  const newUser = await User.updateMany({isVerifiedEmail: true, emailToken: null})
  if(!newUser) {
    throw createError({
        status: 403,
        statusText: "Failed",
        statusMessage: "Failed to Verify"
    })
  }
  
  return {success: true, message: "Email Verified"}
});
