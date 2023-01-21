import fs from "fs";
import { IdentityProvider } from "saml2-js";

export const identityProvider = new IdentityProvider({
  sso_login_url: "https://dev-67795396.okta.com/app/dev-67795396_frontmcidev_1/exk80u71xwpdrkvhY5d7/sso/saml",
  sso_logout_url: "https://dev-67795396.okta.com/login/signout",
  certificates: [
      fs.readFileSync("certs/okta.pem").toString(),
  ],
  allow_unencrypted_assertion: true
});
