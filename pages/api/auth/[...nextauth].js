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
            // Setting the new baseUrl
            baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
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
    },
});
