import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import Startpage from "./pages/startpage/Startpage";
import LoginPage from "./pages/loginpage/Loginpage";
import SignupPage from "./pages/signupPage/SignupPage";
import ConsistencyPage from "./pages/consistencyPage/ConsistencyPage";
import FeedbackPage from "./pages/feedbackPage/FeedbackPage";
import ProfilePage from "./pages/profilePage/ProfilePage";

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
                  <Route path="/consistency" element={<ConsistencyPage />} />
                  <Route path="/todo" element={<Startpage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/feedback" element={<FeedbackPage />} />
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
