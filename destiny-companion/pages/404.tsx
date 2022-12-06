import Link from "next/link";
import { Button } from "react-bootstrap";
import styles from "../styles/Nav.module.css"

export default function NotFound(){
    return (
        <div className="not-found">
            <h1>Oooops...</h1>
            <h2>Error 404</h2>
            <h2 className="mb-5">That page cannot be found.</h2>
            <Link href="/" className={styles.link}><Button size='lg' variant=''>Go back to the Homepage</Button></Link>
        </div>
    )
}