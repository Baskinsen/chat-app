import { User } from "../../models/index";

export default defineEventHandler(async (event) => {
  console.log("GET /api/users");
  try {
    const allUsers = await User.find();
    return allUsers.map((user) => ({
      ...user,
    }));
  } catch (err) {
    console.log(err);
  }
});
