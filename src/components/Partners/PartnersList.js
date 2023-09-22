import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PartnersList() {
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();

  // Fetch partners data from your API (http://localhost:8000/autonav/partners/)
  useEffect(() => {
    // Replace this with your actual API endpoint
    fetch('http://localhost:8000/autonav/partners/')
      .then((response) => response.json())
      .then((data) => setPartners(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function to handle clicking on a partner row
  const handlePartnerClick = (partnerId) => {
    navigate(`/partners/${partnerId}`);
  };

  return (
    <div className="max-w-3/4 mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Partner List</h2>
      <button
        onClick={() => navigate('/partner-form')} // Navigate to PartnerForm
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
      >
        Add Partner
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 font-semibold border border-gray-300">First Name</th>
              <th className="py-2 px-4 bg-gray-200 font-semibold border border-gray-300">Last Name</th>
              <th className="py-2 px-4 bg-gray-200 font-semibold border border-gray-300">Email</th>
              <th className="py-2 px-4 bg-gray-200 font-semibold border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr
                key={partner.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handlePartnerClick(partner.id)}
              >
                <td className="py-2 px-4 border border-gray-300">{partner.first_name}</td>
                <td className="py-2 px-4 border border-gray-300">{partner.last_name}</td>
                <td className="py-2 px-4 border border-gray-300">{partner.email}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the row click event from firing
                      navigate(`/partners/${partner.id}`);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 mr-2"
                  >
                    Details
                  </button>
                  {/* Add other actions as needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PartnersList;
