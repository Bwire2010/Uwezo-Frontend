import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DriversList() {
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  // Fetch partners data from your API (http://localhost:8000/autonav/partners/)
  useEffect(() => {
    // Replace this with your actual API endpoint
    fetch('http://localhost:8000/autonav/drivers/')
      .then((response) => response.json())
      .then((data) => setDrivers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function to handle clicking on a partner row
  const handleDriverClick = (driverId) => {
    navigate(`/drivers/${driverId}`);
  };

  return (
    <div className="max-w-3/4 mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">List of Drivers</h2>
      <button
        onClick={() => navigate('/driver-form')} // Navigate to PartnerForm
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
      >
        Add Driver
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 font-semibold border border-gray-300">First Name</th>
              <th className="py-2 px-4 bg-gray-200 font-semibold border border-gray-300">Last Name</th>
              <th className="py-2 px-4 bg-gray-200 font-semibold border border-gray-300">Email</th>
              <th className="py-2 px-4 bg-gray-200 font-semibold border border-gray-300">MSISDN</th>
              <th className="py-2 px-4 bg-gray-200 font-semibold border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr
                key={driver.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleDriverClick(driver.id)}
              >
                <td className="py-2 px-4 border border-gray-300">{driver.first_name}</td>
                <td className="py-2 px-4 border border-gray-300">{driver.last_name}</td>
                <td className="py-2 px-4 border border-gray-300">{driver.email}</td>
                <td className="py-2 px-4 border border-gray-300">{driver.msisdn}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the row click event from firing
                      navigate(`/drivers/${driver.id}`);
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

export default DriversList;
