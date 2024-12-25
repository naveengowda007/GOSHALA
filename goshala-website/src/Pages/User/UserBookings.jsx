import React, { useEffect, useState } from "react";
import SideBar from "../../Component/SideBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../componets/admin/Loading";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
const UserBookings = () => {
  let navigate = useNavigate();
  const BASEURL =
    import.meta.env.VITE_REACT_APP_BASEURL || "http://localhost:3000";
  const token = sessionStorage.getItem("authToken");
  const userDetails = useSelector((state) => state.auth.userDetails);
  console.log(userDetails?.empid);
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mloading, setmLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentBooking, setCurrentBooking] = useState({
    booking_id: "",
    trip_id: "",
    user_id: "",
    member_id: "",
    paid_amount: "",
  });

  useEffect(() => {
    const getBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASEURL}/api/v1/users/data/getUserTravelBookings?user_id=${userDetails?.empid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getBookings();
  }, []);

  const handleUpdate = async () => {
    setmLoading(true);
    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/users/data/updateUserTravelBookings`,
        currentBooking,
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

  const openModal = (booking) => {
    if (booking) {
      setCurrentBooking(booking);
      setModalOpen(true);
    }
  };
  // const filteredTrips = bookings.filter((trip) =>
  //   trip?.trip_type_name?.toLowerCase().includes(searchTerm?.toLowerCase())
  // );
  const handleNavigate = () => {
    navigate("/AddBooking");
  };
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <div className=" flex justify-start items-center p-4">
          <h2 className="text-2xl font-bold">Bookings</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 ml-10 w-96 border rounded-full border-y-2 border-black  p-2"
            placeholder="Search packages"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleNavigate}
            className="bg-green-800 p-2 m-2 rounded-md text-white "
          >
            Add Booking
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
                className="bg-green-prm text-white p-4 rounded-lg flex flex-col justify-evenly flex-wrap hover:scale-105 transition-all cursor-pointer 300ms"
                onClick={() => openModal(booking)}
              >
                <span className="text-md italic font-semibold">
                  Booking ID: {booking.booking_id}
                </span>
                <span className="text-md italic font-semibold">
                  Trip ID: {booking.trip_id}
                </span>
                <span className="text-md italic font-semibold">
                  User ID: {booking.user_id}
                </span>
                <span className="text-md italic font-semibold">
                  Member ID: {booking.member_id}
                </span>
                <span className="text-md italic font-semibold">
                  Paid Amount: ₹{booking.paid_amount}
                </span>
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
              <div className="modal-content bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">Update Booking</h3>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-2">
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
                    </div>
                    <div className="flex gap-2">
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
      </div>
    </div>
  );
};

export default UserBookings;
