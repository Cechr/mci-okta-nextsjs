import NextAuth from "next-auth";
import { identityProvider } from "../../../lib/identityProvider";
import { serviceProvider } from "../../../lib/serviceProvider";

export default NextAuth({
    providers: [{
            id: "saml",
            name: "SAML",
            authorize: async ({ samlBody }) => {
                console.log("Entramos")
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
        },
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt: async (token, user) => {
            console.log("entramos 1")
            if (user) {
                return {
                    user,
                };
            }

            return token;
        },
        session: async (session, { user }) => {
            console.log("entramos 2")
            return {
                ...session,
                user,
            };
        },
    },
});
