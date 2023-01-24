import fs from "fs";
import { ServiceProvider } from "saml2-js";

export const serviceProvider = new ServiceProvider({
  entity_id: "https://10.88.82.182:8081/mci",
  //private_key: fs.readFileSync("certs/key.pem").toString(),
  //certificate: fs.readFileSync("certs/cert.pem").toString(),
  assert_endpoint: "https://10.88.82.182:8081/mci/api/auth/login/saml",
  allow_unencrypted_assertion: true,
});
