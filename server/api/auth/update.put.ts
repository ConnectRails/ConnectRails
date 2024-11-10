import { User } from "~/models/user.model";
import { verifyPassword } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { firstName, lastName, email, password, newPassword } = body;
  if (!firstName || !lastName || !email || !password) {
    throw createError({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  const user = await User.findOne<User>({
    email,
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      message: "User doesn't exist?",
    });
  }

  if (!(await verifyPassword(password, user.password))) {
    throw createError({
      statusCode: 401,
      message: "Invalid password!",
    });
  }

  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  if (newPassword) user.password = password;

  await user.save();

  return {
    success: true,
  };
});
