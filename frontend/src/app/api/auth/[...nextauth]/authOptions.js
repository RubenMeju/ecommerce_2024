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
      console.log("--------JWT USER-------: ", user);
      console.log("--------JWT TOKEN-------: ", token);
      console.log("el rol", user?.role);
      if (account && account.provider === "google") {
        token.id_token = account.id_token;
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/social_auth/google/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ auth_token: token.id_token }),
            }
          );
          if (response.ok) {
            const token = await response.json();
            return token;

            // Si la autenticación fue exitosa en el servidor, retornar el token
          } else {
            // Si la autenticación falló, retornar null para evitar la creación de la sesión
            console.error("Request failed:", response.statusText);
            return null;
          }
        } catch (error) {
          console.error("Error:", error);
        }

        try {
          const response = await fetch("http://127.0.0.1:8000/auth/users/me/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "JWT " + token.id_token,
            },
          });

          if (response.ok) {
            const user = await response.json();
            if (user.is_active === true) {
              // Asignamos los tokens si están disponibles en el objeto user
              if (user && user.id_token) {
                token.access = user.id_token;
              }
              return token;
            }
          } else {
            // Si la autenticación falló, retornar null para evitar la creación de la sesión
            console.error("Request failed:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
      // Asignamos los tokens si están disponibles en el objeto user
      if (user && user.access) {
        token.access = user.access;
        token.role = user.role;
      }
      if (user && user.refresh) {
        token.refresh = user.refresh;
      }
      return token;
    },
    async session({ session, user, token }) {
      console.log("--------SESSION USER-------: ", user);
      console.log("--------SESSION TOKEN-------: ", token);
      console.log("-------- SESSION SESSION -------: ", session);

      if (token && token.tokens?.access) {
        session.user.access = token.tokens.access;
        session.user.refresh = token.tokens.refresh;
        session.user.role = user.role;
      }
      // Agregamos los tokens a la sesión si están disponibles
      if (token && token.access) {
        session.user.id = token.sub;
        session.user.access = token.access;
      }
      if (token && token.refresh) {
        session.user.refresh = token.refresh;
      }

      // Si no hay token, borramos la sesión
      if (!token) {
        return null;
      }
      //  console.log('--------------SESSION USER-----------: ', user)
      //   console.log('--------------SESSION TOKEN-----------n: ', token)

      return session;
    },
  },
};
