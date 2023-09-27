import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DriverDetails() {
    const { id } = useParams();
    const [driver, setDriver] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDriver, setEditedDriver] = useState(null);
    const [partners, setPartners] = useState([]);
    const navigate = useNavigate();

    // Fetch driver data by ID from your API (replace with your actual API endpoint)
    useEffect(() => {
        fetch(`http://localhost:8000/autonav/drivers/${id}`)
            .then((response) => response.json())
            .then((data) => setDriver(data))
            .catch((error) => console.error('Error fetching driver data:', error));
    }, [id]);

    // Fetch a list of available partners from your API (replace with your actual API endpoint)
    useEffect(() => {
        fetch('http://localhost:8000/autonav/partners/')
            .then((response) => response.json())
            .then((data) => setPartners(data))
            .catch((error) => console.error('Error fetching partner data:', error));
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        // Make a copy of the driver data to allow editing without changing the original data
        setEditedDriver({ ...driver });
    };

    const handleSave = () => {
        // Send the editedDriver data to your API to save changes
        // Example: axios.put(`http://localhost:8000/autonav/drivers/${id}`, editedDriver)
        console.log('Edited Driver Data:', editedDriver);

        // Make the API request
        fetch(`http://localhost:8000/autonav/drivers/${id}/`, {
            method: 'PUT', // Change to 'POST' if that's the correct method
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedDriver),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('API Response:', data);
                // Update the driver state with the edited data
                setDriver(editedDriver);
                setIsEditing(false); // Exit edit mode
            })
            .catch((error) => {
                console.error('API Error:', error);
                // Handle error and display an error message to the user
            });
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset editedDriver to null to avoid displaying old data if the user enters edit mode again
        setEditedDriver(null);
    };

    const handleDelete = () => {
        // Assuming you have an API endpoint for deleting drivers (replace with your actual endpoint)
        const deleteEndpoint = `http://localhost:8000/autonav/drivers/${id}`;

        fetch(deleteEndpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if required (e.g., authentication headers)
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Delete was successful, navigate back to the driver list
                    navigate('/drivers');
                } else {
                    // Handle errors here, such as displaying an error message
                    console.error('Error deleting driver:', response.statusText);
                }
            })
            .catch((error) => {
                // Handle network errors here
                console.error('Network error:', error);
            });
    };

    const handleBackClick = () => {
        navigate('/drivers'); // Navigate back to the "DriversList" route.
    };

    if (!driver) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-3/4 mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Driver Details</h2>
            {driver && isEditing ? (
                // Render edit form
                <div>
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={editedDriver.first_name}
                            onChange={(e) => setEditedDriver({ ...editedDriver, first_name: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="middle_name" className="block text-sm font-medium text-gray-700">
                            Middle Name
                        </label>
                        <input
                            type="text"
                            id="middle_name"
                            name="middle_name"
                            value={editedDriver.middle_name || ''}
                            onChange={(e) => setEditedDriver({ ...editedDriver, middle_name: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={editedDriver.last_name}
                            onChange={(e) => setEditedDriver({ ...editedDriver, last_name: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="date_of_birth"
                            name="date_of_birth"
                            value={editedDriver.date_of_birth}
                            onChange={(e) => setEditedDriver({ ...editedDriver, date_of_birth: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="document_type" className="block text-sm font-medium text-gray-700">
                            Document Type
                        </label>
                        <select
                            id="document_type"
                            name="document_type"
                            value={editedDriver.document_type}
                            onChange={(e) => setEditedDriver({ ...editedDriver, document_type: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full"
                        >
                            <option value="national_id">National ID</option>
                            <option value="passport">Passport</option>
                            <option value="military_id">Military ID</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="document_number" className="block text-sm font-medium text-gray-700">
                            Document Number
                        </label>
                        <input
                            type="text"
                            id="document_number"
                            name="document_number"
                            value={editedDriver.document_number}
                            onChange={(e) => setEditedDriver({ ...editedDriver, document_number: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="msisdn" className="block text-sm font-medium text-gray-700">
                            MSISDN
                        </label>
                        <input
                            type="text"
                            id="msisdn"
                            name="msisdn"
                            value={editedDriver.msisdn}
                            onChange={(e) => setEditedDriver({ ...editedDriver, msisdn: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={editedDriver.email}
                            onChange={(e) => setEditedDriver({ ...editedDriver, email: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                            Document
                        </label>
                        <textarea
                            id="document"
                            name="document"
                            value={editedDriver.document}
                            onChange={(e) => setEditedDriver({ ...editedDriver, document: e.target.value })}
                            rows="4"
                            className="mt-1 p-2 border rounded-md w-full"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="partner" className="block text-sm font-medium text-gray-700">
                            Partner
                        </label>
                        <select
                            id="partner"
                            name="partner"
                            value={editedDriver.partner}
                            onChange={(e) => setEditedDriver({ ...editedDriver, partner: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full"
                        >
                            <option value="">Select a partner</option>
                            {partners.map((partner) => (
                                <option key={partner.id} value={partner.id}>
                                    {partner.first_name} {partner.last_name}
                                </option>
                            ))}
                        </select>
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
                // Render driver details
                <div>
                    {/* Display driver details including partner information */}
                    <table className="table-auto">
                        <tbody>
                            <tr>
                                <td className="font-semibold pr-2">First Name:</td>
                                <td>{driver.first_name}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold pr-2">Middle Name:</td>
                                <td>{driver.middle_name || '-'}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold pr-2">Last Name:</td>
                                <td>{driver.last_name}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold pr-2">Date of Birth:</td>
                                <td>{driver.date_of_birth}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold pr-2">Document Type:</td>
                                <td>{driver.document_type}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold pr-2">Document Number:</td>
                                <td>{driver.document_number}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold pr-2">MSISDN:</td>
                                <td>{driver.msisdn}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold pr-2">Email:</td>
                                <td>{driver.email}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold pr-2">Document:</td>
                                <td>{driver.document}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold pr-2">Partner:</td>
                                <td>{driver.partner}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <div className="mt-4">
                {isEditing ? (
                    null // No buttons displayed when editing
                ) : (
                    <>
                        <button
                            onClick={handleEdit}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 mr-2"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleBackClick}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
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
                    </>
                )}
            </div>
        </div>
    );
}

export default DriverDetails;
