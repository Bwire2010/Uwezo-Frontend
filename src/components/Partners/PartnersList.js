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

  // Function to handle clicking on a partner card
  const handlePartnerClick = (partnerId) => {
    navigate(`/partners/${partnerId}`);
  };

  return (
    <div className="max-w-3/4 mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Partner List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {partners.map((partner) => (
          <div key={partner.id} className="border p-4 rounded-md shadow-md cursor-pointer">
            <h3 className="text-lg font-semibold">{`${partner.first_name} ${partner.last_name}`}</h3>
            <p className="text-sm text-gray-500">{partner.email}</p>
            <button
              onClick={() => handlePartnerClick(partner.id)} // Navigate to PartnerDetails
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Details
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/partner-form')} // Navigate to PartnerForm
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
      >
        Add Partner
      </button>
    </div>
  );
}

export default PartnersList;
