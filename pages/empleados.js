import Layout from "@/components/layout";
import {getSession} from "next-auth/react";

export default function Empleados() {
    return (
        <Layout
            title="Empleado"
            description="Administra tus empleados y sus tareas a realizar"
        >
            <h2>Aqui va el módulo de administración de empleados</h2>
        </Layout>
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