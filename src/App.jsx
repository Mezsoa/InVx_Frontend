import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import Startpage from "./pages/startpage/Startpage";
import LoginPage from "./pages/loginpage/Loginpage";
import SignupPage from "./pages/signupPage/SignupPage";
import AboutPage from "./pages/aboutPage/AboutPage";

// Providers
import { AuthProvider } from "./component/context/AuthContext";
import { LoginProvider } from "./component/context/LoginContext";
import { SignupProvider } from "./component/context/SignupContext";



function App() {
  return (
    <AuthProvider>
      <LoginProvider>
        <SignupProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/home" element={<Startpage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                </Routes>
              </BrowserRouter>
        </SignupProvider>
      </LoginProvider>
    </AuthProvider>
  );
}

export default App;
