import "./SignupPage.css";
import Footer from "../../component/footer/Footer";
import Header from "../../component/header/Header";
import SignupBody from "../../component/SignupBody/signupbody";

const SignupPage = () => {
    return (
        <div className="signuppage">
            <Header></Header>
            <SignupBody></SignupBody>
            <Footer></Footer>
        </div>
    );
}

export default SignupPage;