import { User } from "~/models/user.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { firstName, lastName, email, password } = body;
  if (!firstName || !lastName || !email || !password) {
    throw createError({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: "User already exists",
    });
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,
  });

  await user.save();
  return {
    success: true,
  };
});
