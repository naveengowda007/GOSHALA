import React, { useEffect, useState } from "react";
import Sidebar from "../../componets/admin/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../componets/admin/Loading";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mloading, setmLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState({
    trip_from: "",
    trip_to: "",
    intermideate_stops: "",
    trip_descriptions: "",
    start_date: "",
    end_date: "",
    price: "",
    days_count: "",
    trip_type: "",
    trip_status: "",
  });
  let navigate = useNavigate();
  const adminAccess = sessionStorage.getItem("adminAccess");

  useEffect(() => {
    const getTrips = async () => {
      setLoading(true);
      try {
        if (!adminAccess) {
          navigate("/admin/login");
          throw new Error("Not logged in");
        }
        const response = await axios.get(import.meta.env.VITE_GET_TRIPS, {
          headers: {
            Authorization: `Bearer ${adminAccess}`,
          },
        });
        setTrips(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getTrips();
  }, [adminAccess, navigate]);

  const validateForm = () => {
    if (!currentTrip.trip_from) {
      alert("Please fill in the 'From' field.");
      return false;
    }
    if (!currentTrip.trip_to) {
      alert("Please fill in the 'To' field.");
      return false;
    }
    if (!currentTrip.start_date) {
      alert("Please fill in the 'Start Date' field.");
      return false;
    }
    if (!currentTrip.end_date) {
      alert("Please fill in the 'End Date' field.");
      return false;
    }
    if (!currentTrip.price) {
      alert("Please fill in the 'Price' field.");
      return false;
    }
    if (!currentTrip.intermideate_stops) {
      alert("Please fill in the 'Intermediate Stops' field.");
      return false;
    }
    if (!currentTrip.days_count) {
      alert("Please fill in the 'Days Count' field.");
      return false;
    }
    if (!currentTrip.trip_descriptions) {
      alert("Please fill in the 'Trip Description' field.");
      return false;
    }
    if (!currentTrip.trip_type) {
      alert("Please fill in the 'Trip Type' field.");
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    if (validateForm()) {
      setmLoading(true);
      try {
        const response = await axios.post(
          import.meta.env.VITE_INSERT_TRIPS,
          currentTrip,
          {
            headers: {
              Authorization: `Bearer ${adminAccess}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Created Successfully");
          const newTrip = { ...currentTrip, trip_id: trips.length + 1 };
          setTrips([...trips, newTrip]);
        }
      } catch (error) {
        alert("Error creating trips");
        console.log(error);
      } finally {
        setCurrentTrip({
          trip_from: "",
          trip_to: "",
          intermideate_stops: "",
          trip_descriptions: "",
          start_date: "",
          end_date: "",
          price: "",
          days_count: "",
          trip_type: "",
          trip_status: "",
        });
        setmLoading(false);
        setModalOpen(false);
      }
    }
  };

  const handleUpdate = async () => {
    setmLoading(true);
    try {
      // Slice start_date and end_date before sending the request
      const updatedTrip = {
        ...currentTrip,
        start_date: currentTrip.start_date.slice(0, 16),
        end_date: currentTrip.end_date.slice(0, 16),
      };

      const response = await axios.post(
        import.meta.env.VITE_UPDATE_TRIPS,
        updatedTrip,
        {
          headers: {
            Authorization: `Bearer ${adminAccess}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Updated Successfully");
        const updatedTrips = trips.map((trip) =>
          trip.trip_id === currentTrip.trip_id ? updatedTrip : trip
        );
        setTrips(updatedTrips);
      }
    } catch (error) {
      alert("Error updating Trip");
      console.log(error);
    } finally {
      setModalOpen(false);
      setmLoading(false);
    }
  };

  const openModal = (trip = null) => {
    if (trip) {
      setCurrentTrip(trip);
    } else {
      setCurrentTrip({
        trip_from: "",
        trip_to: "",
        intermideate_stops: "",
        trip_descriptions: "",
        start_date: "",
        end_date: "",
        price: "",
        days_count: "",
        trip_type: "",
        trip_status: "",
      });
    }
    setModalOpen(true);
  };

  return (
    <div className="flex">
      <Sidebar currentPage="trips" />
      <div className="">
        <div className=" flex justify-between p-4">
          <h2 className="text-2xl font-bold ">Trips</h2>
          <button
            onClick={() => openModal()}
            className="bg-green-prm py-2 rounded-lg px-4 text-white font-semibold hover:scale-105 transition-all 300ms"
          >
            Create Trip
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
          ) : trips === null || trips.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-500">
              No data available
            </div>
          ) : (
            trips.map((trip) => (
              <div
                key={trip.trip_id}
                className="bg-green-prm text-white p-4 rounded-lg flex flex-col justify-evenly flex-wrap hover:scale-105 transition-all cursor-pointer 300ms"
                onClick={() => openModal(trip)}
              >
                <span className="text-md italic font-semibold">
                  From: {trip.trip_from}
                </span>
                <span className="text-md italic font-semibold">
                  {" "}
                  To: {trip.trip_to}
                </span>
                <span className="text-md italic font-semibold">
                  {" "}
                  Intermediate Stops: {trip.intermideate_stops}
                </span>
                <span className="text-md italic font-semibold">
                  {" "}
                  Trip Descriptions: {trip.trip_descriptions}
                </span>
                <span className="text-md italic font-semibold">
                  {" "}
                  Start Date: {trip.start_date}
                </span>
                <span className="text-md italic font-semibold">
                  {" "}
                  End Date: {trip.end_date}
                </span>
                <span className="text-md italic font-semibold">
                  {" "}
                  Price: ₹{trip.price}
                </span>
                <span className="text-md italic font-semibold">
                  {" "}
                  Days Count: {trip.days_count}
                </span>
                <span className="text-md italic font-semibold">
                  {" "}
                  Trip Type: {trip.trip_type}
                </span>
                <span className="text-md italic font-semibold">
                  {" "}
                  Trip Status: {trip.trip_status}
                </span>
              </div>
            ))
          )}
        </div>

        {modalOpen && (
          <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center ">
            {mloading ? (
              <div>
                <Loading />
              </div>
            ) : (
              <div className="modal-content bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg max-h-[90vh] overflow-auto">
                <h3 className="text-xl font-bold mb-4">
                  {currentTrip.trip_id ? "Update Trip" : "Create Trip"}
                </h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="font-semibold">From</label>
                        <input
                          type="text"
                          value={currentTrip.trip_from}
                          onChange={(e) =>
                            setCurrentTrip({
                              ...currentTrip,
                              trip_from: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="font-semibold">To</label>
                        <input
                          type="text"
                          value={currentTrip.trip_to}
                          onChange={(e) =>
                            setCurrentTrip({
                              ...currentTrip,
                              trip_to: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="font-semibold">
                          Intermediate Stops
                        </label>
                        <input
                          type="text"
                          value={currentTrip.intermideate_stops}
                          onChange={(e) =>
                            setCurrentTrip({
                              ...currentTrip,
                              intermideate_stops: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="font-semibold">
                          Trip Descriptions
                        </label>
                        <textarea
                          value={currentTrip.trip_descriptions}
                          onChange={(e) =>
                            setCurrentTrip({
                              ...currentTrip,
                              trip_descriptions: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                        />
                      </div>
                      <div>
                        <label className="font-semibold">Start Date</label>
                        <input
                          type="datetime-local"
                          value={
                            currentTrip.start_date
                              ? currentTrip.start_date.slice(0, 16)
                              : ""
                          }
                          onChange={(e) =>
                            setCurrentTrip({
                              ...currentTrip,
                              start_date: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="font-semibold">End Date</label>
                        <input
                          type="datetime-local"
                          value={
                            currentTrip.end_date
                              ? currentTrip.end_date.slice(0, 16)
                              : ""
                          }
                          onChange={(e) =>
                            setCurrentTrip({
                              ...currentTrip,
                              end_date: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="font-semibold">Price</label>
                        <input
                          type="text"
                          value={currentTrip.price}
                          onChange={(e) =>
                            setCurrentTrip({
                              ...currentTrip,
                              price: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="font-semibold">Days Count</label>
                        <input
                          type="text"
                          value={currentTrip.days_count}
                          onChange={(e) =>
                            setCurrentTrip({
                              ...currentTrip,
                              days_count: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="font-semibold">Trip Type</label>
                        <select
                          value={currentTrip.trip_type}
                          onChange={(e) =>
                            setCurrentTrip({
                              ...currentTrip,
                              trip_type: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Domestic">Domestic</option>
                          <option value="International">International</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-semibold">Trip Status</label>
                        <input
                          type="text"
                          value={currentTrip.trip_status}
                          onChange={(e) =>
                            setCurrentTrip({
                              ...currentTrip,
                              trip_status: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </form>

                <div className="flex justify-between mt-6 space-x-4">
                  <button
                    onClick={currentTrip.trip_id ? handleUpdate : handleCreate}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg"
                  >
                    {currentTrip.trip_id ? "Update" : "Create"}
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

export default Trips;
