import fs from "fs";
import { ServiceProvider } from "saml2-js";

export const serviceProvider = new ServiceProvider({
  entity_id: "https://localhost:8080",
  //private_key: fs.readFileSync("certs/key.pem").toString(),
  //certificate: fs.readFileSync("certs/cert.pem").toString(),
  assert_endpoint: "https://localhost:8080/api/auth/login/saml",
  allow_unencrypted_assertion: true,
});
