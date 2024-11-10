import { NuxtAuthHandler } from "#auth";
import { User } from "~/models/user.model";
import { verifyPassword } from "~/server/utils/auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  providers: [
    CredentialsProvider.default({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Missing credentials");
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        );
        if (!isValid) return null;

        return {
          name: user.firstName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session && session.user) {
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
