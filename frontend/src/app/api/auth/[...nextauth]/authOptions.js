import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    GoogleProvider({
      clientId:
        "414672085273-u1o044273icdd2p88ijiar5oeeqv60rl.apps.googleusercontent.com",
      clientSecret: "y9-Z1TUaFdJHMFwwck7iUYkb",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Ingrese su email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/jwt/create/`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        //   console.log('user: ', user)
        if (!res.ok) {
          // console.log('res no ok', user)
          throw new Error(user.detail);
        }

        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/users/me/`,
          {
            headers: { Authorization: `JWT ${user.access}` },
          }
        );

        if (!userRes.ok) {
          throw new Error(`Error on /auth/users/me/: ${userRes.statusText}`);
        }

        const userData = await userRes.json();
        console.log("------USERDATA------: ", userData);
        // If no error and we have user data, return it
        if (res.ok && user) {
          user.id = userData.id;
          user.name = userData.username;
          user.email = credentials.email;
          user.image = userData.picture;
          user.role = userData.role;

          return user;
        }
        //  //console.log('Soy el user: ', user)
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("JWT, token: ", token);
      console.log("JWT, user: ", user);
      console.log("JWT, account: ", account);

      if (account && account.provider === "credentials") {
        if (user && user.access) {
          token.access = user.access;
          token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, user, token }) {
      console.log("SESSION, session: ", session);
      console.log("SESSION, user: ", user);
      console.log("SESSION, token: ", token);
      if (token && token?.access) {
        session.user.access = token.access;
        session.user.refresh = token.refresh;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
