import "./App.css";

import { API, setAuthToken } from "config/api";
import Switch from "react-bootstrap/esm/Switch";
import PrivateRoute from "./components/PrivateRoute";
import 'bootstrap/dist/css/bootstrap.css';
 import { HashRouter , Route, BrowserRouter, Routes } from "react-router-dom";
 import 'bootstrap-icons/font/bootstrap-icons.css';
import LandingPage from "pages/LandingPage";
import Home from "pages/Home";
import DetailPage from "pages/DetailPage";


import './tailwind.css'
function App() {
  return (
    <div className="App">
 <HashRouter >
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
         <Route exact path="/home" element={<Home/>} /> 
          <Route exact path="/detail/:id" element={<DetailPage/>} /> 
        </Routes>

      </HashRouter>
    </div>
  );
}

export default App;
