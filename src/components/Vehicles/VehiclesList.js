import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function VehiclesList() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch vehicles data from your API (http://localhost:8000/autonav/vehicles)
    fetch('http://localhost:8000/autonav/vehicles')
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="max-w-3/4 mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Vehicles List</h2>
      <button
        onClick={() => navigate('/vehicle-form')} // Navigate to the partner-form route
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 mb-4"
      >
        Add Vehicle
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 font-semibold border border-gray-300">Make</th>
              <th className="py-2 px-4 bg-gray-200 font-semibold border border-gray-300">Registration</th>
              <th className="py-2 px-4 bg-gray-200 font-semibold border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="py-2 px-4 border border-gray-300">{vehicle.make}</td>
                <td className="py-2 px-4 border border-gray-300">{vehicle.registration}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <button
                    onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 mr-2"
                  >
                    More Details
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

export default VehiclesList;



