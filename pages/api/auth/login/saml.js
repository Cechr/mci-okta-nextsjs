import axios from "axios";
import {identityProvider} from "../../../../lib/identityProvider";
import {serviceProvider} from "../../../../lib/serviceProvider";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default async (req, res) => {
    if (req.method === "POST") {
        const {data, headers} = await axios.get("/api/auth/csrf", {
            baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        });

        const {csrfToken} = data;

        const encodedSAMLBody = encodeURIComponent(JSON.stringify(req.body));

        res.setHeader("set-cookie", headers["set-cookie"] ?? "");
        return res.send(
            `<html>
                <body>
                  <form action="/mci/api/auth/callback/saml" method="POST">
                    <input type="hidden" name="csrfToken" defaultValue="${csrfToken}" value="${csrfToken}"/>
                    <input type="hidden" name="samlBody" defaultValue="${encodedSAMLBody}" value="${encodedSAMLBody}"/>
                  </form>
                  <script>
                    document.forms[0].submit();
                  </script>
                </body>
             </html>`
        );
    }

    const createLoginRequestUrl = (identityProvider, options = {}) =>
        new Promise((resolve, reject) => {
            serviceProvider.create_login_request_url(
                identityProvider,
                options,
                (error, loginUrl) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(loginUrl);
                }
            );
        });

    try {
        const loginUrl = await createLoginRequestUrl(identityProvider);
        return res.redirect(loginUrl);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};
