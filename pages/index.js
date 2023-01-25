import {getSession} from "next-auth/react";
import Layout from "@/components/layout";
import styles from "../styles/Home.module.css";

export default function Home({session}) {
    return (
        <>
            <Layout
                title="Inicio"
                description="Mesa de Control de Identidad"
            >
                <h1 className={styles.title}>Welcome to Next-Auth.js SAML Example!</h1>

                <br/>

                <div className={styles.grid}>
                    <button
                        onClick={() => {
                            window.location.replace("https://auth-dev.gruposalinas.com.mx/login/signout")
                            //signOut();
                            //signIn();
                        }}
                        className={styles.card}
                    >
                        <h3>Log Out</h3>
                    </button>
                </div>

                <h3>User Information</h3>
                <pre className={styles.code}>
                  <code>
                    {
                        JSON.stringify((({attributes, ...info}) => info)(session.user), null, 2)
                    }
                  </code>
                </pre>

                <h3>User Attributes</h3>
                <pre className={styles.code}>
                  <code>
                    {
                        JSON.stringify(session.user.attributes, null, 2)
                    }
                  </code>
                </pre>

            </Layout>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?callbackUrl=${context.resolvedUrl}`,
            },
        };
    }

    return {
        props: {session},
    };
};