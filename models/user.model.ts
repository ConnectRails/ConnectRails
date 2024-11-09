import { defineMongooseModel } from "#nuxt/mongoose";
import { hashPassword, verifyPassword } from "~/server/utils/auth";

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const User = defineMongooseModel<User>({
  name: "User",
  schema: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  hooks(schema) {
    schema.pre("save", async function (next) {
      if (!this.isModified("password")) return next();

      try {
        this.password = await hashPassword(this.password);
        next();
      } catch (error: any) {
        next(error);
      }
    });
    schema.methods.comparePassword = async function (password: string) {
      return await verifyPassword(password, this.password);
    };
  },
});
