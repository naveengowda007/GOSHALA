import React, { useEffect, useState } from "react";
import Sidebar from "../../componets/admin/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../componets/admin/Loading";

const Bookings = () => {
  let navigate = useNavigate();
  const adminAccess = sessionStorage.getItem("adminAccess");
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mloading, setmLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [SAVEorUpdate, setSAVEorUpdate] = useState(false);

  const [currentBooking, setCurrentBooking] = useState({
    booking_id: "",
    trip_id: "",
    user_id: "",
    member_id: "",
    paid_amount: "",
  });

  useEffect(() => {
    getBookings();
  }, []);
  const getBookings = async () => {
    setLoading(true);
    try {
      if (!adminAccess) {
        navigate("/admin/login");
        throw new Error("Not logged in");
      }
      const response = await axios.get(import.meta.env.VITE_GET_BOOKINGS, {
        headers: {
          Authorization: `Bearer ${adminAccess}`,
        },
      });
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async () => {
    setmLoading(true);
    try {
      const response = await axios.post(
        SAVEorUpdate === "UPDATE"
          ? import.meta.env.VITE_UPDATE_BOOKINGS
          : import.meta.env.VITE_SAVE_BOOKINGS,

        currentBooking,
        {
          headers: {
            Authorization: `Bearer ${adminAccess}`,
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

  const openModal = (booking) => {
    if (booking) {
      setCurrentBooking(booking);
      setSAVEorUpdate("UPDATE");

      setModalOpen(true);
    }
  };

  const openModalNew = () => {
    setCurrentBooking("");
    setSAVEorUpdate("SAVE");

    setModalOpen(true);
  };

  return (
    <div className="flex">
      <Sidebar currentPage="bookings" />
      <div className="flex-1">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-bold">Bookings</h2>
          <button
            onClick={() => openModalNew()}
            className="bg-green-prm py-2 rounded-lg px-4 text-white font-semibold hover:scale-105 transition-all 300ms"
          >
            Create Booking
          </button>
        </div>
        <div
          className={`${
            loading
              ? "flex justify-center items-center h-full"
              : "grid grid-cols-3 gap-4 p-4 m-4"
          }`}
        >
          {loading ? (
            <div className="w-full flex justify-center items-center">
              <Loading />
            </div>
          ) : !bookings || bookings.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-500">
              No bookings available
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.booking_id}
                className="bg-white text-black p-4 rounded-xl flex flex-col justify-between hover:scale-105 transition-all cursor-pointer 300ms shadow-xl"
                onClick={() => openModal(booking)}
              >
                {/* <img
                  src="https://via.placeholder.com/150" // Placeholder image URL
                  alt="Booking Image"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                /> */}
                <div className="flex flex-col space-y-2">
                  <span className="text-md  font-semibold">
                    Booking ID: {booking.booking_id}
                  </span>
                  <span className="text-md  font-semibold">
                    Trip ID: {booking.trip_id}
                  </span>
                  <span className="text-md  font-semibold">
                    User ID: {booking.user_id}
                  </span>
                  <span className="text-md  font-semibold">
                    Member ID: {booking.member_id}
                  </span>
                  <span className="text-md  font-semibold">
                    Paid Amount: ₹{booking.paid_amount}
                  </span>
                </div>
                <button
                  onClick={() => openModal(booking)}
                  className="mt-4 bg-green-prm text-white py-2 px-4 rounded-lg text-center hover:scale-105 transition-all"
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>

        {modalOpen && (
          <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            {mloading ? (
              <div>
                <Loading />
              </div>
            ) : (
              <div className="modal-content bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg [80vh] overflow-auto">
                <h3 className="text-xl font-bold mb-4">Update Booking</h3>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="font-semibold">Booking ID</label>
                      <input
                        type="text"
                        value={currentBooking.booking_id}
                        onChange={(e) =>
                          setCurrentBooking({
                            ...currentBooking,
                            booking_id: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold">Trip ID</label>
                      <input
                        type="text"
                        value={currentBooking.trip_id}
                        onChange={(e) =>
                          setCurrentBooking({
                            ...currentBooking,
                            trip_id: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold">User ID</label>
                      <input
                        type="text"
                        value={currentBooking.user_id}
                        onChange={(e) =>
                          setCurrentBooking({
                            ...currentBooking,
                            user_id: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold">Member ID</label>
                      <input
                        type="text"
                        value={currentBooking.member_id}
                        onChange={(e) =>
                          setCurrentBooking({
                            ...currentBooking,
                            member_id: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold">Paid Amount</label>
                      <input
                        type="number"
                        value={currentBooking.paid_amount}
                        onChange={(e) =>
                          setCurrentBooking({
                            ...currentBooking,
                            paid_amount: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </form>

                <div className="flex justify-between mt-6 space-x-4">
                  {SAVEorUpdate === "UPDATE" ? (
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg"
                    >
                      Save
                    </button>
                  )}
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
      </div>
    </div>
  );
};

export default Bookings;
