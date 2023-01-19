import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Layout({ children, title = '', description = '' }) {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>{`MCI - ${title}`}</title>
                <meta name="description" content={`${description}`}/>
            </Head>

            <div className="md:flex md:min-h-screen">

                <aside className="md:w-1/4 bg-green-900 px-5 py-10">
                    <h2 className='text-4xl font-black text-center text-white'>MCI - Menú</h2>

                    <nav className="mt-10">
                        <Link className={`${router.pathname === '/' ? 'underline decoration-green-100/30 text-white' : 'text-white'} text-2xl block mt-2 hover:text-black`} href="/">Inicio</Link>
                        <Link className={`${router.pathname === '/empleados' ? 'underline decoration-green-100/30 text-white' : 'text-white'} text-2xl block mt-2 hover:text-black`} href="/empleados">Adm. de Empleados</Link>
                        <Link className={`${router.pathname === '/nosotros' ? 'underline decoration-green-100/30 text-white' : 'text-white'} text-2xl block mt-2 hover:text-black`} href="/nosotros">Nosotros</Link>
                    </nav>
                </aside>

                <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
                    { children }
                </main>

            </div>

        </>
    )
}