import Login from "./Pages/Login";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import GetTripDetails from "./Pages/GetTripDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/GetTripDetails" element={<GetTripDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;