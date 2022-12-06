import Footer from "./Footer";
import CustomNavbar from "./Navbar";

export default function Layout( {children} ){
    return (
        <div>
            <CustomNavbar/>
                {children}
            <Footer/>
        </div>
    )
}