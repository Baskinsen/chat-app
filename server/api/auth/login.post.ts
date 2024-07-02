import { createError, eventHandler, readBody } from "h3";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../models/index";

const ACCESS_SECRET: any = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET: any = process.env.JWT_REFRESH_SECRET;
interface LoginRequest {
  username: string;
  password: string;
}
interface LoginResponse {
  status: number;
  statusText: string;
  statusMessage: string;
  data: {
    _id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    isVerifiedEmail: boolean;
    tokens: {
      accessToken: {
        token: string;
        expiresIn: number;
      };
      refreshToken: {
        token: string;
        expiresIn: number;
      };
    };
  };
}
export default eventHandler(async (event) => {
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
    const accessToken = sign({ ...newUserData }, ACCESS_SECRET, {
      expiresIn: 60 * 15,
    });
    const refreshToken = sign({ ...newUserData }, REFRESH_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    console.log(user?._id, user?.username);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    if (
      user.accessToken === accessToken &&
      user.refreshToken === refreshToken
    ) {
      user?.save();
    }

    const response: LoginResponse = {
      status: 200,
      statusText: "Success",
      statusMessage: "Login Successful",
      data: {
        _id: user?._id.toString(),
        username: user?.username,
        email: user?.email,
        first_name: user?.first_name,
        last_name: user?.last_name,
        isVerifiedEmail: user?.isVerifiedEmail,
        tokens: {
          accessToken: {
            token: user?.accessToken,
            expiresIn: 60 * 15,
          },
          refreshToken: {
            token: user?.refreshToken,
            expiresIn: 60 * 60 * 730,
          },
        },
      },
    };
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
});
