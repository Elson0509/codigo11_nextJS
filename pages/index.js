import Head from 'next/head'
import NavbarAdmin from '../layout/NavbarAdmin/NavbarAdmin'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Página inicial</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavbarAdmin/>

      <footer>
        footer
      </footer>
    </div>
  )
}
