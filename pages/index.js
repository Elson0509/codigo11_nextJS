import Head from 'next/head'
import NavbarAdmin from '../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../layout/HeaderAdmin/HeaderAdmin'

const clickedToggle = () => {
  console.log("clicked")
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Página inicial</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavbarAdmin/>
      <HeaderAdmin/>

    </div>
  )
}
