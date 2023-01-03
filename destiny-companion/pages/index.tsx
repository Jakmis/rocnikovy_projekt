import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Container, Stack } from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import { loginAndGetAccess } from './playerView'


export default function Home() {
  return (
   <Container>
      <Head>
        <title>Destiny 2 Companion</title>
        <meta name="description" content="Destiny 2 Companion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image src="/ghost-logo.png" width={304} height={304} alt="ghost-logo"></Image>
        <h1 className={styles.title}>
          Welcome to Destiny 2 Companion!
        </h1>

        <p className={styles.description}>
          Companion that will enhance your Destiny 2 experience!
        </p>

        <div className="d-flex justify-content-center">
          <Stack gap={2} className="col-md-5 mx-auto">
            <Button size='lg' variant='' onClick={loginAndGetAccess}>Login through Bungie.net</Button>
            <h4 className='m-3'>or</h4>
            <Link href="/data" className={styles.link}><Button size='lg' variant=''>Browse Destiny 2 Database</Button></Link>
          </Stack>
        </div>
      </main>
    </Container>
  )
}
