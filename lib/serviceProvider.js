import fs from "fs";
import { ServiceProvider } from "saml2-js";

export const serviceProvider = new ServiceProvider({
  entity_id: "http://localhost:3000",
  //private_key: fs.readFileSync("certs/key.pem").toString(),
  //certificate: fs.readFileSync("certs/cert.pem").toString(),
  assert_endpoint: "http://localhost:3000/api/auth/login/saml",
  allow_unencrypted_assertion: true,
});
