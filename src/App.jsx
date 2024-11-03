import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import Startpage from "./pages/startpage/Startpage";
import LoginPage from "./pages/loginpage/Loginpage";
import SignupPage from "./pages/signupPage/SignupPage";
import ConsistencyPage from "./pages/consistencyPage/ConsistencyPage";
import FeedbackPage from "./pages/feedbackPage/FeedbackPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import SettingsPage from "./pages/settingsPage/SettingsPage";

// Providers
import { AuthProvider } from "./component/context/AuthContext";
import { LoginProvider } from "./component/context/LoginContext";
import { SignupProvider } from "./component/context/SignupContext";
import { ThemeProvider } from "./component/context/ThemeContext";
import { WebsocketProvider } from "./component/context/WebSocketContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <WebsocketProvider>
          <LoginProvider>
            <SignupProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/settings" element={<SettingsPage />} />
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
        </WebsocketProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
