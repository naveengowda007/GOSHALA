import React, { useState } from "react";
import axios from "axios";
import SideBar from "../../Component/SideBar";
import { useSelector } from "react-redux";

export default function AddCustomer() {
  const userDetails = useSelector((state) => state.auth.userDetails);
  console.log(userDetails);
  const [formData, setFormData] = useState({
    member_name: "",
    memeber_gender: "",
    member_age: "",
    member_contact_number: "",
    associated_user_id: userDetails?.empid,
  });

  const token = sessionStorage.getItem("authToken");

  // Replace with your actual BASEURL
  const BASEURL =
    import.meta.env.VITE_REACT_APP_BASEURL || "http://localhost:3000";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "member_age" || name === "member_contact_number"
          ? Number(value) // Convert to number for specific fields
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }

    if (!formData.member_name) {
      alert("Please provoide Member Name");
      return;
    }
    if (!formData.member_age) {
      alert("Please provide Member Age");
      return;
    }
    if (!formData.member_contact_number) {
      alert("Please provide Member Contact Number");
      return;
    }
    if (!formData.memeber_gender) {
      alert("Please provide Member Gender");
      return;
    }
    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/users/data/insertMembersList`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        console.log("Data submitted successfully:", response.data);
        alert("Customer added successfully!");

        // Reset form data after successful save
        setFormData({
          member_name: "",
          memeber_gender: "",
          member_age: "",
          member_contact_number: "",
          associated_user_id: "",
        });
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <aside>
      <div className="flex">
        <SideBar />
        <section className="m-2 p-2 w-full">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Add Customer
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="flex gap-6">
              <div className="w-[40%]">
                <label className="block mb-1 font-medium">Member Name</label>
                <input
                  type="text"
                  name="member_name"
                  value={formData.member_name}
                  onChange={handleChange}
                  placeholder="Enter member name"
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="w-[40%]">
                <label className="block mb-1 font-medium">Member Gender</label>
                <select
                  name="memeber_gender"
                  value={formData.memeber_gender}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-[40%]">
                <label className="block mb-1 font-medium">Member Age</label>
                <input
                  type="number"
                  name="member_age"
                  value={formData.member_age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="w-[40%]">
                <label className="block mb-1 font-medium">Contact Number</label>
                <input
                  type="tel"
                  name="member_contact_number"
                  value={formData.member_contact_number}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  className="border rounded p-2 w-full"
                  maxLength={10}
                />
              </div>
            </div>

            {/* <div className="w-[40%]">
              <label className="block mb-1 font-medium">
                Associated User ID
              </label>
              <input
                type="number"
                name="associated_user_id"
                value={formData.associated_user_id}
                onChange={handleChange}
                placeholder="Enter associated user ID"
                className="border rounded p-2 w-full"
              />
            </div> */}
            <button
              type="submit"
              className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Add Customer
            </button>
          </form>
        </section>
      </div>
    </aside>
  );
}
