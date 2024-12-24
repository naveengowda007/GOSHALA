import Login from "./Pages/Login";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import Bookings from "./Pages/admin/Bookings";
import Members from "./Pages/admin/Members";
import Trips from "./Pages/admin/Trips";
import Payments from "./Pages/admin/Payments";
import Announcements from "./Pages/admin/Announcements";
import GetTripDetails from "./Pages/GetTripDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/GetTripDetails" element={<GetTripDetails />} />
           <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<Bookings/>}/>
          <Route path="/admin/members" element={<Members/>}/>
          <Route path="/admin/trips" element={<Trips/>}/>
          <Route path="/admin/payments" element={<Payments/>}/>
          <Route path="/admin/announcements" element={<Announcements/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
