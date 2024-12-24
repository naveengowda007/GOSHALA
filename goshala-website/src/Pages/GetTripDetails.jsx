import React from "react";
import SideBar from "../Component/SideBar";

function GetTripDetails() {
  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/users/data/getTripTypes`,
        {}
      );

      if (response) {
        alert("Sign up successful!");
        // Handle success (e.g., redirect to login page)
      } else {
        alert("Sign up failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <aside>
      <div className="flex">
        <SideBar />
        <section className="m-2 p-2 w-full">
          <span className="text-2xl font-bold text-green-700  ">Packages</span>
          {/* <div> */}
          <input className="h-10 ml-10 w-96 border rounded-full border-y-2 border-black"></input>
          <section className="shadow-md m-2 p-2">kn</section>
        </section>
      </div>
    </aside>
  );
}

export default GetTripDetails;
