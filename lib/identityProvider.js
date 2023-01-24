import fs from "fs";
import { IdentityProvider } from "saml2-js";

export const identityProvider = new IdentityProvider({
  sso_login_url: "https://auth-dev.gruposalinas.com.mx/app/gruposalinas-oie_mesacontrolidentidadbancoazteca_1/exk6nnufvu0kXeZFl1d7/sso/saml",
  sso_logout_url: "https://auth-dev.gruposalinas.com.mx/login/signout",
  certificates: [
      fs.readFileSync("certs/mci-okta-dev.pem").toString(),
  ],
  allow_unencrypted_assertion: true
});
