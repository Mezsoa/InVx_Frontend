import "./SignupPage.css";
import Footer from "../../component/footer/Footer";
import Header from "../../component/header/Header";
import Body from "../../component/SignupBody/signupbody";

const SignupPage = () => {
    return (
        <div className="signuppage">
            <Header></Header>
            <Body></Body>
            <Footer></Footer>
        </div>
    );
}

export default SignupPage;