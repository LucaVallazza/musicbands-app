import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LogInPage from "./pages/login-page";
import BandsPage from "./pages/bands-page";
import ProtectedRoute from "./components/auth/protected-route";
import BandDetailPage from "./pages/band-details-page";
import { createContext, useState } from "react";


import { Band, Genre } from "./lib/types";


interface AppContextType {
  bands: Band[];
  setBands: React.Dispatch<React.SetStateAction<Band[]>>;
  genres: Genre[];
  setGenres: React.Dispatch<React.SetStateAction<Genre[]>>;
}


const InitialAppContext: AppContextType = {
  bands: [],
  setBands: () => {},
  genres: [],
  setGenres: () => {}
};

export const AppContext = createContext<AppContextType>(InitialAppContext);

function App() {

  const [bands, setBands] = useState<Band[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  return (
    <>
      <AppContext.Provider value={{ bands, setBands, genres, setGenres }} >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LogInPage />}></Route>
            <Route
              path="/bands"
              element={<ProtectedRoute component={<BandsPage />} />}
            ></Route>
            <Route
              path="/bands/*"
              element={<ProtectedRoute component={<BandDetailPage />} />}
            ></Route>
            <Route
              path="*"
              element={<Navigate to={"/bands"}></Navigate>}
            ></Route>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
