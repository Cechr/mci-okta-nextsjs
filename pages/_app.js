import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import {useEffect} from "react";

const useInterceptNextDataHref = ({ router, namespace }) => {
    useEffect(() => {
        if (router.pageLoader?.getDataHref) {
            const originalGetDataHref = router.pageLoader.getDataHref;
            router.pageLoader.getDataHref = function (...args) {
                const r = originalGetDataHref.call(router.pageLoader, ...args);
                return r && r.startsWith('/_next/data')
                    ? `/${namespace}${r}`
                    : r;
            };
        }
    }, [router, namespace]);
};

export default function App ({ Component, pageProps, router }) {
    useInterceptNextDataHref({
        router,
        namespace: "/mci"
    });
    return (
        <SessionProvider session={pageProps.session} basePath='/mci/api/auth'>
            <Component {...pageProps} />
        </SessionProvider>
    )
}