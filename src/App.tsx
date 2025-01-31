import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LogInPage from "./pages/login-page";
import BandsPage from "./pages/bands-page";
import ProtectedRoute from "./components/auth/protected-route";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogInPage />}></Route>
            <Route path="/bands" element={<ProtectedRoute component={<BandsPage />} />}></Route>
          <Route path="*" element={<Navigate to={"/bands"}></Navigate>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
