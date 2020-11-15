import Head from 'next/head'
import NavbarAdmin from '../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../layout/HeaderAdmin/HeaderAdmin'
import PanelAdmin from '../layout/PanelAdmin/PanelAdmin'

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
      <PanelAdmin 
        bgcolor="primary"
        fiiname="BANRISUL NOVAS FRONTEIRAS FDO INV IMOB - FII"
        fiiticker="BNFS"
      />      

    </div>
  )
}
