import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

function Layout() {

    return (
    <div
        className='flex flex-col min-h-screen' 
                >
        <Header />
        <main
        className='flex-grow w-11/12 lg:w-10/12 max-w-screen-xl mx-auto my-20 flex items-center justify-center'
        >
        <Outlet />
        </main>
        <Footer />
    </div>
    );
}

export default Layout;
