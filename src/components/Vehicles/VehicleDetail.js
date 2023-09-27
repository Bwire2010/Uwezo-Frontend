import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function VehicleDetail() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedVehicle, setEditedVehicle] = useState(null);
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();

  // Fetch vehicle data by ID from your API (http://localhost:8000/autonav/vehicles/id)
  useEffect(() => {
    // Replace this with your actual API endpoint
    fetch(`http://localhost:8000/autonav/vehicles/${id}`)
      .then((response) => response.json())
      .then((data) => setVehicle(data))
      .catch((error) => console.error('Error fetching data:', error));

    // Fetch partners for the dropdown list
    fetch('http://localhost:8000/autonav/partners')
      .then((response) => response.json())
      .then((data) => setPartners(data))
      .catch((error) => console.error('Error fetching partners:', error));
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
    // Make a copy of the vehicle data to allow editing without changing the original data
    setEditedVehicle({ ...vehicle });
  };

  const handleSave = () => {
    // Send the editedVehicle data to your API to save changes
    // Example: axios.put(`http://localhost:8000/autonav/vehicles/${id}`, editedVehicle)
    //console.log('Edited Vehicle Data:', editedVehicle);
    console.log('Edited Vehicle Data Before API Request:', editedVehicle);
    // Make the API request
    fetch(`http://localhost:8000/autonav/vehicles/${id}`, {
      method: 'PUT', // Change to 'POST' if that's the correct method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedVehicle),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('API Response:', data);
        // Update the vehicle state with the edited data
        setVehicle(editedVehicle);
        setIsEditing(false); // Exit edit mode
      })
      .catch((error) => {
        console.error('API Error:', error);
        // Handle error and display an error message to the user
      });
  };
  const handleDelete = () => {
    // Assuming you have an API endpoint for deleting vehicles (replace with your actual endpoint)
    const deleteEndpoint = `http://localhost:8000/autonav/vehicles/${id}`;

    fetch(deleteEndpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if required (e.g., authentication headers)
      },
    })
      .then((response) => {
        if (response.ok) {
          // Delete was successful, navigate back to the vehicles list
          navigate('/vehicles');
        } else {
          // Handle errors here, such as displaying an error message
          console.error('Error deleting vehicle:', response.statusText);
        }
      })
      .catch((error) => {
        // Handle network errors here
        console.error('Network error:', error);
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset editedVehicle to null to avoid displaying old data if the user enters edit mode again
    setEditedVehicle(null);
  };

  const handleBackClick = () => {
    navigate('/vehicles'); // Navigate back to the "PartnersList" route.
  };

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3/4 mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
      {vehicle && isEditing ? (
        // Render edit form
        <div>
          <div>
            <label htmlFor="partner" className="block text-sm font-medium text-gray-700">
              Partner
            </label>
            <select
              id="partner"
              name="partner"
              value={editedVehicle.partner}
              onChange={(e) => setEditedVehicle({ ...editedVehicle, partner: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            >
              {partners.map((partner) => (
                <option key={partner.id} value={partner.id}>
                  {partner.first_name} {partner.last_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="registration" className="block text-sm font-medium text-gray-700">
              Registration
            </label>
            <input
              type="text"
              id="registration"
              name="registration"
              value={editedVehicle.registration}
              onChange={(e) => setEditedVehicle({ ...editedVehicle, registration: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-700">
              Make
            </label>
            <input
              type="text"
              id="make"
              name="make"
              value={editedVehicle.make}
              onChange={(e) => setEditedVehicle({ ...editedVehicle, make: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={editedVehicle.model}
              onChange={(e) => setEditedVehicle({ ...editedVehicle, model: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="yom" className="block text-sm font-medium text-gray-700">
              Year of Manufacture
            </label>
            <input
              type="number"
              id="yom"
              name="yom"
              value={editedVehicle.yom}
              onChange={(e) => setEditedVehicle({ ...editedVehicle, yom: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="logbook" className="block text-sm font-medium text-gray-700">
              Logbook
            </label>
            <input
              type="text"
              id="logbook"
              name="logbook"
              value={editedVehicle.logbook || ''}
              onChange={(e) => setEditedVehicle({ ...editedVehicle, logbook: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="chasis_no" className="block text-sm font-medium text-gray-700">
              Chasis Number
            </label>
            <input
              type="text"
              id="chasis_no"
              name="chasis_no"
              value={editedVehicle.chasis_no || ''}
              onChange={(e) => setEditedVehicle({ ...editedVehicle, chasis_no: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="engine_no" className="block text-sm font-medium text-gray-700">
              Engine Number
            </label>
            <input
              type="text"
              id="engine_no"
              name="engine_no"
              value={editedVehicle.engine_no || ''}
              onChange={(e) => setEditedVehicle({ ...editedVehicle, engine_no: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Render vehicle details
        <div>
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="font-semibold pr-2">Partner:</td>
                <td>{vehicle.partner}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Registration:</td>
                <td>{vehicle.registration}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Make:</td>
                <td>{vehicle.make}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Model:</td>
                <td>{vehicle.model}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Year of Manufacture:</td>
                <td>{vehicle.yom}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Logbook:</td>
                <td>{vehicle.logbook || '-'}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Chasis Number:</td>
                <td>{vehicle.chasis_no || '-'}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Engine Number:</td>
                <td>{vehicle.engine_no || '-'}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 mr-2"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleBackClick}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 "
            >
              Back
            </button>
            <span className="ml-2 mr-2">&#8592;</span> {/* Unicode arrow character for back */}
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleDetail;
