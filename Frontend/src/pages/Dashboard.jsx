import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PATH from '../Utiles/PATH';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [url, setUrl] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await axios.post(PATH.URL.USER_URL, {}, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setUrl(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching URLs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (id) => {
    try {
      const response = await axios.post(`${PATH.URL.GET}${id}`);
      if (response.status === 200) {
        window.location.href = response.data.data;
      }
    } catch (error) {
      console.error("Error fetching the long URL:", error);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const response = await axios.post(`${PATH.URL.VIEW}${id}`);
      if (response.status === 200) {
        setModalData(response.data.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching URL details:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUrls = url.filter(url =>
    (url.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchUrls();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    )
  }

  return (
    <>
      <div className="dashboard-container p-5">
        <h2 className="text-2xl font-semibold mb-4">Your URLs</h2>

        {/* Search bar */}
        <div className="search-bar my-5 flex justify-center">
          <input
            type="text"
            placeholder="Search URLs..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-4/5 max-w-md p-3 text-lg border border-gray-300 rounded-full focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition duration-300"
          />
        </div>

        {/* Display URLs in a table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th>Go</th>
                <th>Name</th>
                <th>Short URL</th>
                <th>QR Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUrls.length > 0 ? (
                filteredUrls.map((urlItem) => (
                  <tr key={urlItem._id} className=''>
                    <td>
                      <button
                        onClick={() => handleClick(urlItem.shortId)}
                        className="text-blue-500 hover:underline"
                      >
                        Go
                      </button>
                    </td>
                    <td className='cursor-pointer'>{urlItem.name}</td>
                    <td>
                      <button
                        onClick={() => handleClick(urlItem.shortId)}
                        className="text-blue-500 hover:underline"
                      >
                        {urlItem.short}
                      </button>
                    </td>
                    <td>
                      <img src={urlItem.QR} alt="QR code" className="w-12 h-12" />
                    </td>
                    <td>
                      <button
                        onClick={() => handleViewDetails(urlItem._id)}
                        className="text-green-500 cursor-pointer hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">No URLs found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Custom Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-semibold mb-4">URL Details</h2>
              {modalData && (
                <div>
                  <p><strong>Name:</strong> {modalData.name}</p>
                  <p><strong>Short URL:</strong> <a href={modalData.short} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{modalData.short}</a></p>
                  <p><strong>Long URL:</strong> <a href={modalData.long} target="_blank" rel="noopener noreferrer" className="overflow-hidden text-ellipsis whitespace-nowrap text-blue-500 hover:underline w-full">{modalData.long}</a></p>
                  <p><strong>Created On:</strong> {new Date(modalData.CreatedOn).toLocaleString()}</p>
                  <div>
                    <img src={modalData.QR} alt="QR Code" className="w-24 h-24 mx-auto my-4" />
                  </div>
                </div>
              )}
              <button onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-red-600">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
