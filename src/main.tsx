import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LogInPage from "./pages/login-page.tsx";
import BandsPage from "./pages/bands-page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes> 
        <Route path = '/' element = {<Navigate to = {'/login'}></Navigate>}></Route>
        <Route path = '/login' element= {<LogInPage />}></Route>
        <Route path = '/bands' element= {<BandsPage />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
