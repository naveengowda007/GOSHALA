import React, { useEffect, useState } from "react";
import Sidebar from "../../componets/admin/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../componets/admin/Loading";

const Payments = () => {
  let navigate = useNavigate();
  const adminAccess = sessionStorage.getItem("adminAccess");
  const [payments, setPayments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mloading, setmLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState({
    payment_id: "",
    payment_amount: "",
    payment_date: "",
    booking_id: "",
  });

  useEffect(() => {
    const getPayments = async () => {
      setLoading(true);
      try {
        if (!adminAccess) {
          navigate("/admin/login");
          throw new Error("Not logged in");
        }
        const response = await axios.get(import.meta.env.VITE_GET_PAYMENTS, {
          headers: {
            Authorization: `Bearer ${adminAccess}`,
          },
        });
        setPayments(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPayments();
  }, []);

  const handleUpdate = async () => {
    setmLoading(true);
    try {
      // Ensure the date is sliced to the first 16 characters before updating
      const updatedPayment = {
        ...currentPayment,
        payment_date: currentPayment.payment_date.slice(0, 16),
      };

      const response = await axios.post(
        import.meta.env.VITE_UPDATE_PAYMENTS,
        updatedPayment,
        {
          headers: {
            Authorization: `Bearer ${adminAccess}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Payment updated successfully");
        const updatedPayments = payments.map((payment) =>
          payment.payment_id === currentPayment.payment_id
            ? updatedPayment
            : payment
        );
        setPayments(updatedPayments);
      }
    } catch (error) {
      alert("Error updating payment");
      console.log(error);
    } finally {
      setModalOpen(false);
      setmLoading(false);
    }
  };

  const openModal = (payment) => {
    if (payment) {
      setCurrentPayment(payment);
      setModalOpen(true);
    }
  };

  return (
    <div className="flex">
      <Sidebar currentPage="payments" />
      <div className="flex-1">
        <div className="h-[10%] flex justify-start items-center p-4">
          <h2 className="text-2xl font-bold">Payments</h2>
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
          ) : !payments || payments.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-500">
              No data available
            </div>
          ) : (
            payments.map((payment) => (
              <div
                key={payment.payment_id}
                className="bg-green-prm text-white p-4 rounded-lg flex flex-col justify-evenly flex-wrap hover:scale-105 transition-all cursor-pointer 300ms"
                onClick={() => openModal(payment)}
              >
                <span className="text-md italic font-semibold">
                  Payment ID: {payment.payment_id}
                </span>
                <span className="text-md italic font-semibold">
                  Amount: ₹{payment.payment_amount}
                </span>
                <span className="text-md italic font-semibold">
                  Date: {new Date(payment.payment_date).toLocaleDateString()}
                </span>
                <span className="text-md italic font-semibold">
                  Booking ID: {payment.booking_id}
                </span>
              </div>
            ))
          )}
        </div>

        {modalOpen && (
          <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            {mloading ? (
              <div className="">
                <Loading />
              </div>
            ) : (
              <div className="modal-content bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">Update Payment</h3>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="font-semibold">Amount</label>
                      <input
                        type="text"
                        value={currentPayment.payment_amount}
                        onChange={(e) =>
                          setCurrentPayment({
                            ...currentPayment,
                            payment_amount: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold">Date</label>
                      <input
                        type="date"
                        value={currentPayment.payment_date.slice(0, 10)}
                        onChange={(e) =>
                          setCurrentPayment({
                            ...currentPayment,
                            payment_date: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold">Booking ID</label>
                      <input
                        type="text"
                        value={currentPayment.booking_id}
                        onChange={(e) =>
                          setCurrentPayment({
                            ...currentPayment,
                            booking_id: e.target.value,
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

export default Payments;
