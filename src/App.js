import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Login />} path='/' />
      <Route element={<LandingPage />} path='/landingpage' />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
