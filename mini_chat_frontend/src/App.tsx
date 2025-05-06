import "./App.css";
import SignUpPage from "./components/page/signUp/SignUpPage";
import LoginPage from "./components/page/LoginPage/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MessengerChat from "./components/page/MessengerChat/MessengerChat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/messengerChat" element={<MessengerChat />} />
      </Routes>
    </Router>
  );
}

export default App;
