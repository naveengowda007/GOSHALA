import React from "react";
import SideBar from "../Component/SideBar";

function GetTripDetails() {
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
