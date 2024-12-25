import Login from "./Pages/Login";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";

import Customer from "./Pages/User/Members";
import AddCustomer from "./Pages/User/AddMembers";
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import Bookings from "./Pages/admin/Bookings";
import Members from "./Pages/admin/Members";
import Trips from "./Pages/admin/Trips";
import Payments from "./Pages/admin/Payments";
import Announcements from "./Pages/admin/Announcements";
import TripsDetails from "./Pages/User/TripsDetails";
import UserBookings from "./Pages/User/UserBookings";
import AddBooking from "./Pages/User/AddBooking";
import UserPayment from "./Pages/User/UserPayment";
import UserAnnouncements from "./Pages/User/UserAnnouncements";
import UserDashboard from "./Pages/User/UserDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<SignUp />} /> */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<Login />} />

        <Route path="/Customer" element={<Customer />} />
        <Route path="/AddCustomer" element={<AddCustomer />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<Bookings />} />
        <Route path="/admin/members" element={<Members />} />
        <Route path="/admin/trips" element={<Trips />} />
        <Route path="/admin/payments" element={<Payments />} />
        <Route path="/admin/announcements" element={<Announcements />} />
        <Route path="/TripsDetails" element={<TripsDetails />} />
        <Route path="/UserBookings" element={<UserBookings />} />
        <Route path="/AddBooking" element={<AddBooking />} />
        <Route path="/UserPayment" element={<UserPayment />} />
        <Route path="/UserAnnouncements" element={<UserAnnouncements />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
