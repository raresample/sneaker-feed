import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Aaron Hope's sneaker FEED</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
