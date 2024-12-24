import Login from "./Pages/Login";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import GetTripDetails from "../src/Pages/GetTripDetails";
import Customer from "./Pages/Customer";
import AddCustomer from "./Pages/AddCustomer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/GetTripDetails" element={<GetTripDetails />} />
        <Route path="/Customer" element={<Customer />} />
        <Route path="/AddCustomer" element={<AddCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
