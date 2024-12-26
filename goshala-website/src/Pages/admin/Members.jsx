import React, { useEffect, useState } from "react";
import Sidebar from "../../componets/admin/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../componets/admin/Loading";

const Members = () => {
  let navigate = useNavigate();
  const adminAccess = sessionStorage.getItem("adminAccess");
  const [members, setMembers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mloading, setmLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [SAVEorUpdate, setSAVEorUpdate] = useState(false);

  const [currentMember, setCurrentMember] = useState({
    member_name: "",
    memeber_gender: "",
    member_age: "",
    member_contact_number: "",
    associated_user_id: "",
  });

  useEffect(() => {
    getMembers();
  }, []);
  const getMembers = async () => {
    setLoading(true);
    try {
      if (!adminAccess) {
        navigate("/admin/login");
        throw new Error("Not logged in");
      }
      const response = await axios.get(import.meta.env.VITE_GET_MEMBERS, {
        headers: {
          Authorization: `Bearer ${adminAccess}`,
        },
      });
      setMembers(response.data);
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
          ? import.meta.env.VITE_UPDATE_MEMBERS
          : import.meta.env.VITE_SAVE_MEMBERS,
        currentMember,
        {
          headers: {
            Authorization: `Bearer ${adminAccess}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Updated Successfully");
        getMembers();
        const updatedMembers = members.map((member) =>
          member.member_id === currentMember.member_id ? currentMember : member
        );
        setMembers(updatedMembers);
      }
    } catch (error) {
      alert("Error updating member");
      console.log(error);
    } finally {
      setModalOpen(false);
      setmLoading(false);
    }
  };

  const openModal = (member) => {
    if (member) {
      setCurrentMember(member);
      setSAVEorUpdate("UPDATE");
      setModalOpen(true);
    }
  };
  const openModalNew = () => {
    setCurrentMember("");
    setSAVEorUpdate("SAVE");
    setModalOpen(true);
  };

  return (
    <div className="flex">
      <Sidebar currentPage="members" />
      <div className="flex-1">
        <div className=" flex justify-between items-center p-4">
          <h2 className="text-2xl font-bold">Members</h2>
          <button
            onClick={() => openModalNew()}
            className="bg-green-prm py-2 rounded-lg px-4 text-white font-semibold hover:scale-105 transition-all 300ms"
          >
            Create Members
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
          ) : !members || members.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-500">
              No data available
            </div>
          ) : (
            members.map((member) => (
              <div
                key={member.member_id}
                className="bg-green-prm text-white p-4 rounded-lg flex flex-col justify-evenly flex-wrap hover:scale-105 transition-all cursor-pointer 300ms"
                onClick={() => openModal(member)}
              >
                <span className="text-md italic font-semibold">
                  Name: {member.member_name}
                </span>
                <span className="text-md italic font-semibold">
                  Gender: {member.memeber_gender}
                </span>
                <span className="text-md italic font-semibold">
                  Age: {member.member_age}
                </span>
                <span className="text-md italic font-semibold">
                  Contact Number: {member.member_contact_number}
                </span>
                <span className="text-md italic font-semibold">
                  Associated User ID: {member.associated_user_id}
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
                <h3 className="text-xl font-bold mb-4">Update Member</h3>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="font-semibold">Name</label>
                      <input
                        type="text"
                        value={currentMember.member_name}
                        onChange={(e) =>
                          setCurrentMember({
                            ...currentMember,
                            member_name: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold">Gender</label>
                      <select
                        value={currentMember.memeber_gender}
                        onChange={(e) =>
                          setCurrentMember({
                            ...currentMember,
                            memeber_gender: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold">Age</label>
                      <input
                        type="number"
                        value={currentMember.member_age}
                        onChange={(e) =>
                          setCurrentMember({
                            ...currentMember,
                            member_age: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold">Contact Number</label>
                      <input
                        type="text"
                        value={currentMember.member_contact_number}
                        onChange={(e) =>
                          setCurrentMember({
                            ...currentMember,
                            member_contact_number: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold">
                        Associated User ID
                      </label>
                      <input
                        type="text"
                        value={currentMember.associated_user_id}
                        onChange={(e) =>
                          setCurrentMember({
                            ...currentMember,
                            associated_user_id: e.target.value,
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
                  )}{" "}
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

export default Members;
