import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Login.module.css";
export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next-Auth SAML Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Login</h1>

        <div className={styles.grid}>
          <Link href="/api/auth/login/saml">
              Login with OKTA - SAML
          </Link>
        </div>

      </main>
    </div>
  );
}
