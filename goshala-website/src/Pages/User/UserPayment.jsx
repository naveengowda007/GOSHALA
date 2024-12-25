import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../Component/SideBar";
import Loading from "../../componets/admin/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function UserPayment() {
  const [tripTypes, setTripTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = sessionStorage.getItem("authToken");
  const [modalOpen, setModalOpen] = useState(false);
  const [mloading, setmLoading] = useState(false);
  const Navigate = useNavigate();
  // Replace with your actual BASEURL
  const BASEURL =
    import.meta.env.VITE_REACT_APP_BASEURL || "http://localhost:3000";
  const userDetails = useSelector((state) => state.auth.userDetails);
  console.log(userDetails?.empid);
  // Fetch Trip Types
  const handleSubmit = async () => {
    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }

    try {
      const response = await axios.get(
        `${BASEURL}/api/v1/users/data/getPayments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        console.log(response.data);

        setTripTypes(response.data);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const filteredTrips = tripTypes.filter(
    (trip) =>
      trip?.payment_id?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      trip?.payment_amount?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      trip?.payment_date?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      trip?.booking_id?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  //   console.log(first);
  const handleNavigate = () => {
    Navigate("/AddCustomer");
  };
  const openModal = () => {
    // if (booking) {
    //   setCurrentBooking(booking);
    setModalOpen(true);
    // }
  };

  const handleUpdate = async () => {
    setmLoading(true);
    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/users/data/insertPayments`,
        (payment_id = ""),
        (payment_amount = ""),
        (payment_date = ""),
        (booking_id = ""),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Booking Updated Successfully");
        const updatedBookings = bookings.map((booking) =>
          booking.booking_id === currentBooking.booking_id
            ? currentBooking
            : booking
        );
        setBookings(updatedBookings);
      }
    } catch (error) {
      alert("Error updating booking");
      console.log(error);
    } finally {
      setModalOpen(false);
      setmLoading(false);
    }
  };
  return (
    <aside>
      <div className="flex">
        <SideBar />
        <section className="m-2 p-2 w-full">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-green-700">Packages</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 ml-10 w-96 border rounded-full border-y-2 border-black  p-2"
              placeholder="Search packages"
            />
            <div className="flex justify-end">
              <button
                onClick={() => openModal()}
                className="bg-green-800 p-2 m-2 rounded-md text-white "
              >
                Make Payment
              </button>
            </div>
          </div>
          <section className="shadow-md m-2 p-2 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              {filteredTrips.length > 0 ? (
                filteredTrips.map((trip, index) => (
                  <div
                    key={index}
                    className="p-2 border-b shadow-md rounded-lg bg-green-700 text-white"
                  >
                    <p className="flex">
                      <span>Payment Id : </span>
                      <span className="text-white ml-1">{trip.payment_id}</span>
                    </p>
                    <p>
                      <span>Payment Amount : </span>
                      <span className="text-white ml-1">
                        {trip.payment_amount}
                      </span>
                    </p>
                    <p>
                      <span>Payment Date : </span>
                      <span className="text-white ml-1 w-[300px]">
                        {trip.payment_date?.slice(0, 10)}
                      </span>
                    </p>
                    <p>
                      <span>Booking Id : </span>
                      <span className="text-white ml-1">{trip.booking_id}</span>
                    </p>
                  </div>
                ))
              ) : (
                <p>No Payment available</p>
              )}
            </div>

            {modalOpen && (
              <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                {mloading ? (
                  <div>
                    <Loading />
                  </div>
                ) : (
                  <div className="modal-content bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Update Booking</h3>
                    <form className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <div>
                            <label className="font-semibold">Payment ID</label>
                            <input
                              type="Number"
                              //   value={currentBooking.booking_id}
                              //   onChange={(e) =>
                              //     setCurrentBooking({
                              //       ...currentBooking,
                              //       booking_id: e.target.value,
                              //     })
                              //   }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="font-semibold">
                              Payment Amount
                            </label>
                            <input
                              type="number"
                              //   value={currentBooking.trip_id}
                              //   onChange={(e) =>
                              //     setCurrentBooking({
                              //       ...currentBooking,
                              //       trip_id: e.target.value,
                              //     })
                              //   }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div>
                            <label className="font-semibold">Booking ID</label>
                            {/* <input
                              type="text"
                              value={currentBooking.user_id}
                              onChange={(e) =>
                                setCurrentBooking({
                                  ...currentBooking,
                                  user_id: e.target.value,
                                })
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            /> */}
                          </div>
                        </div>
                      </div>
                    </form>

                    <div className="flex justify-between mt-6 space-x-4">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setModalOpen(false)}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </section>
      </div>
    </aside>
  );
}
