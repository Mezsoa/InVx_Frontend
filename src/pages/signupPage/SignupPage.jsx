import "./SignupPage.css";
import Footer from "../../component/footer/Footer";
import SignupBody from "../../component/SignupBody/signupbody";

const SignupPage = () => {
    return (
        <div className="signuppage">
            <SignupBody></SignupBody>
            <Footer></Footer>
        </div>
    );
}

export default SignupPage;