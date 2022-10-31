import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import store from '../store'

import '../styles/globals.css'

function MyApp({ Component, pageProps, }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Toaster />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp;