import "./Loginpage.css"
import Footer from "../../component/footer/Footer";
import LoginBody from "../../component/loginBody/LoginBody";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="LoginPage">
            <Link to={"/"} className="home-link">
                 <img src="src/assets/logo.png" className="logo-a" /></Link>
            <LoginBody></LoginBody>
            <Footer></Footer>
            
        </div>
    );
};

export default LoginPage;
