import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import store from '../store'

import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Toaster />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
    )
}

export default MyApp
