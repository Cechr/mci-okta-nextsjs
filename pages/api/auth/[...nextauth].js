import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { identityProvider } from "../../../lib/identityProvider";
import { serviceProvider } from "../../../lib/serviceProvider";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: "saml",
            name: "SAML",
            credentials: {},
            authorize: async ({ samlBody }) => {
                samlBody = JSON.parse(decodeURIComponent(samlBody));

                const postAssert = (identityProvider, samlBody) =>
                    new Promise((resolve, reject) => {
                        serviceProvider.post_assert(
                            identityProvider,
                            {
                                request_body: samlBody,
                            },
                            (error, response) => {
                                if (error) {
                                    reject(error);
                                }

                                resolve(response);
                            }
                        );
                    });

                try {
                    const { user } = await postAssert(identityProvider, samlBody);
                    return user;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        redirect: async ({ url, baseUrl }) => {
            //console.log(process.env.NEXT_PUBLIC_BASE_URL)
            //console.log("redirect - url ", url, "baseUrl ", baseUrl); // This is what I was checking

            /*if(url.startsWith(baseUrl)) {
                console.log("Entro1")
                return url
            } else if(url.startsWith("/")) {
                console.log("Entro1")
                return new URL(url, baseUrl).toString();
            }*/

            baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            return baseUrl;
        },
        jwt: async ({ token, user }) => {
            if (user) {
                token.user=user
            }
            return Promise.resolve(token);
        },
        session: async ({ session, token }) => {
            session.user = token.user;
            return Promise.resolve(session)
        },
    }/*,
    events: {
        signOut: async ({session, token}) => {
            console.log("Entramos al signOut")

        }
    }*/
});
