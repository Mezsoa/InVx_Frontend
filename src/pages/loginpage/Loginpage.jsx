import "./Loginpage.css"
import LoginBody from "../../component/loginBody/LoginBody";
import { Link } from "react-router-dom";
import invx from "/assets/invx.png";

const LoginPage = () => {
    return (
        // <body>
            <div className="LoginPage">
            <Link to={""} className="home-link">
                 <img src={invx} className="logo-l" /></Link>
            <LoginBody></LoginBody>
        </div>
        // </body>
    );
};

export default LoginPage;
