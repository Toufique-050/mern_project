import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes/AppRoutes";

const NO_CHROME_PATHS = ["/login", "/register"];

function Chrome() {
    const { pathname } = useLocation();
    const hideChrome = NO_CHROME_PATHS.includes(pathname);

    return (
        <>
            {!hideChrome && <Navbar />}
            <AppRoutes />
            {!hideChrome && <Footer />}
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Chrome />
        </BrowserRouter>
    );
}