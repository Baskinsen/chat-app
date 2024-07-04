import { createError, eventHandler, readBody } from "h3";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../models/index";

interface LoginRequest {
  username: string;
  password: string;
}
interface LoginResponse {
  status: number;
  statusText: string;
  statusMessage: string;
}
export default eventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const body = (await readBody(event)) as LoginRequest;
  const credentials = {
    username: body?.username,
    password: body?.password,
  };

  if (!credentials?.username || credentials?.username.length === 0) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized, username is required",
    });
  }

  if(credentials.password.length < 8) {
    throw createError({
        statusCode: 403,
        statusMessage: "Password must be at least 8 characters",
    }) 
  }

  if (!credentials?.password || credentials?.password.length === 0) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized, password is required",
    });
  }

  const user = await User.findOne({ username: credentials?.username });

  if (!user) {
    throw createError({
      statusCode: 403,
      statusMessage: "Invalid username or password",
    });
  }
  if (user?.isVerifiedEmail === false) {
    throw createError({
      statusCode: 403,
      statusMessage: "User not Verified",
    });
  }

  const passwordMatch = await bcrypt.compare(
    credentials?.password,
    user?.password
  );

  if (!passwordMatch) {
    throw createError({
      statusCode: 403,
      statusMessage: "Invalid username or password",
    });
  }

  if (!credentials?.username || credentials?.username.length === 0) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized, username is required",
    });
  }

  try {

    const newUserData = {
      _id: user?._id,
      username: user?.username,
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
    };

    const accessToken = sign({ ...newUserData }, runtimeConfig.JWT_Access_Secret, {
      expiresIn: 60 * 15,
    });
    const refreshToken = sign({ ...newUserData }, runtimeConfig.JWT_Refresh_Secret, {
      expiresIn: 60 * 60 * 24,
    });

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    if (
      user.accessToken === accessToken &&
      user.refreshToken === refreshToken
    ) {
      user?.save();
      setCookie(event, 'Authorization', accessToken, { maxAge: 60 * 15, httpOnly: true, path: '/',})
      setCookie(event, "refresh_token", refreshToken, {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        path: "/",
      });
    }

    const response: LoginResponse = {
      status: 200,
      statusText: "Success",
      statusMessage: "Login Successful",
    };
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
});
