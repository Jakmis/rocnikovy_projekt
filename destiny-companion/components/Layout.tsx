import { ReactNode } from "react";
import Footer from "./Footer";
import CustomNavbar from "./Navbar";

interface Props {
    children?: ReactNode
}

export default function Layout( {children, ...props}:Props ){
    return (
        <div {...props}>
            <CustomNavbar/>
                {children}
            <Footer/>
        </div>
    )
}