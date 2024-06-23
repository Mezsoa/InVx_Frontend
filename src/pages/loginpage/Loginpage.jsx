import "./Loginpage.css"
import Footer from "../../component/footer/Footer";
import LoginBody from "../../component/loginBody/LoginBody";
import { Link } from "react-router-dom";
import Header from "../../component/header/Header";

const LoginPage = () => {
    return (
        <div className="LoginPage">
            <Header></Header>
            <Link to={"/"} className="home-link">
                 <img src="src/assets/InVx.png" className="logo-a" /></Link>
            <LoginBody></LoginBody>
            <Footer></Footer>
            
        </div>
    );
};

export default LoginPage;
