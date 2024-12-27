import React, { useEffect, useState } from "react";
import Sidebar from "../../componets/admin/Sidebar";
import axios from "axios";
import Loading from "../../componets/admin/Loading";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mloading, setmLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState({
    announcement_type: "",
    announcement_description: "",
  });

  const adminAccess = sessionStorage.getItem("adminAccess");

  useEffect(() => {
    const getAnnouncements = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_GET_ANNOUNCEMENTS,
          {
            headers: {
              Authorization: `Bearer ${adminAccess}`,
            },
          }
        );
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };
    getAnnouncements();
  }, [adminAccess]);

  const handleCreate = async () => {
    if (!currentAnnouncement.announcement_type) {
      alert("Please Provide announcement type ");
      return;
    }

    if (!currentAnnouncement.currentAnnouncement) {
      alert("Please Provide current Announcement");
      return;
    }
    setmLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_INSERT_ANNOUNCEMENTS,
        currentAnnouncement,
        {
          headers: {
            Authorization: `Bearer ${adminAccess}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Announcement Created Successfully");
        const newAnnouncement = {
          ...currentAnnouncement,
          announcement_id: announcements.length + 1,
        };
        setAnnouncements([...announcements, newAnnouncement]);
      }
    } catch (error) {
      alert("Error creating announcement");
      console.error(error);
    } finally {
      setCurrentAnnouncement({
        announcement_type: "",
        announcement_description: "",
      });
      setmLoading(false);
      setModalOpen(false);
    }
  };

  const handleUpdate = async () => {
    if (!currentAnnouncement.announcement_type) {
      alert("Please Provide announcement type ");
      return;
    }

    if (!currentAnnouncement.currentAnnouncement) {
      alert("Please Provide current Announcement");
      return;
    }
    setmLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_UPDATE_ANNOUNCEMENTS,
        currentAnnouncement,
        {
          headers: {
            Authorization: `Bearer ${adminAccess}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Announcement Updated Successfully");
        const updatedAnnouncements = announcements.map((announcement) =>
          announcement.announcement_id === currentAnnouncement.announcement_id
            ? currentAnnouncement
            : announcement
        );
        setAnnouncements(updatedAnnouncements);
      }
    } catch (error) {
      alert("Error updating announcement");
      console.error(error);
    } finally {
      setModalOpen(false);
      setmLoading(false);
    }
  };

  const openModal = (announcement = null) => {
    if (announcement) {
      setCurrentAnnouncement(announcement);
    } else {
      setCurrentAnnouncement({
        announcement_type: "",
        announcement_description: "",
      });
    }
    setModalOpen(true);
  };

  return (
    <div className="flex">
      <Sidebar currentPage="announcements" />
      <div className="flex-1">
        <div className="h-[10%] flex justify-between items-center p-4">
          <h2 className="text-2xl font-bold">Announcements</h2>
          <button
            onClick={() => openModal()}
            className="bg-green-prm py-2 rounded-lg px-4 text-white font-semibold hover:scale-105 transition-all 300ms"
          >
            Create
          </button>
        </div>

        <div
          className={`${
            loading
              ? "flex justify-center items-center h-full"
              : "grid grid-cols-2 gap-4 p-4"
          }`}
        >
          {loading ? (
            <div className="w-full flex justify-center items-center">
              <Loading />
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-500">
              No announcements available
            </div>
          ) : (
            announcements.map((announcement) => (
              <div
                key={announcement.announcement_id}
                className="bg-white text-black p-4 rounded-lg flex flex-col justify-between hover:scale-105 transition-all cursor-pointer 300ms  shadow-lg"
                onClick={() => openModal(announcement)}
              >
                {/* <img
                  src="https://via.placeholder.com/150" // Placeholder image URL
                  alt="Announcement Image"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                /> */}
                <div className="flex flex-col space-y-2">
                  <span className="text-md font-semibold">
                    Type: {announcement.announcement_type}
                  </span>
                  <span className="text-md font-semibold">
                    Description: {announcement.announcement_description}
                  </span>
                </div>
                <button
                  onClick={() => openModal(announcement)}
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
              <Loading />
            ) : (
              <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">
                  {currentAnnouncement.announcement_id
                    ? "Update Announcement"
                    : "Create Announcement"}
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="font-semibold">Type</label>
                    <input
                      type="text"
                      value={currentAnnouncement.announcement_type}
                      onChange={(e) =>
                        setCurrentAnnouncement({
                          ...currentAnnouncement,
                          announcement_type: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Description</label>
                    <textarea
                      value={currentAnnouncement.announcement_description}
                      onChange={(e) =>
                        setCurrentAnnouncement({
                          ...currentAnnouncement,
                          announcement_description: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none"
                    />
                  </div>
                </form>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={
                      currentAnnouncement.announcement_id
                        ? handleUpdate
                        : handleCreate
                    }
                    className="bg-green-500 text-white py-2 px-4 rounded-lg"
                  >
                    {currentAnnouncement.announcement_id ? "Update" : "Create"}
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

export default Announcements;
