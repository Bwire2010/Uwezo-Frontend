// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// function PartnerDetails() {
//   const { id } = useParams();
//   const [partner, setPartner] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedPartner, setEditedPartner] = useState(null);
//   const navigate = useNavigate();

//   // Fetch partner data by ID from your API (http://localhost:8000/autonav/partners/id)
//   useEffect(() => {
//     // Replace this with your actual API endpoint
//     fetch(`http://localhost:8000/autonav/partners/${id}`)
//       .then((response) => response.json())
//       .then((data) => setPartner(data))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, [id]);

//   const handleEdit = () => {
//     setIsEditing(true);
//     // Make a copy of the partner data to allow editing without changing the original data
//     setEditedPartner({ ...partner });
//   };

//   const handleSave = () => {
//     // Send the editedPartner data to your API to save changes
//     // Example: axios.put(`http://localhost:8000/autonav/partners/${id}`, editedPartner)
//     console.log('Edited Partner Data:', editedPartner);
//     // After successful save, update the partner state with the edited data
//     setPartner(editedPartner);
//     setIsEditing(false); // Exit edit mode
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//   };

//   const handleDelete = () => {
//     // Assuming you have an API endpoint for deleting partners (replace with your actual endpoint)
//     const deleteEndpoint = `http://localhost:8000/autonav/partners/${id}`;
  
//     fetch(deleteEndpoint, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         // Add any other headers if required (e.g., authentication headers)
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           // Delete was successful, navigate back to the partner list
//           navigate('/partners');
//         } else {
//           // Handle errors here, such as displaying an error message
//           console.error('Error deleting partner:', response.statusText);
//         }
//       })
//       .catch((error) => {
//         // Handle network errors here
//         console.error('Network error:', error);
//       });
//   };

//   if (!partner) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="max-w-3/4 mx-auto p-6 bg-white rounded-md shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Partner Details</h2>
//       {isEditing ? (
//         // Render edit form
//         <div>
//           <div>
//             <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
//               First Name
//             </label>
//             <input
//               type="text"
//               id="first_name"
//               name="first_name"
//               value={editedPartner.first_name}
//               onChange={(e) => setEditedPartner({ ...editedPartner, first_name: e.target.value })}
//               className="mt-1 p-2 border rounded-md w-full"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="middle_name" className="block text-sm font-medium text-gray-700">
//               Middle Name
//             </label>
//             <input
//               type="text"
//               id="middle_name"
//               name="middle_name"
//               value={editedPartner.middle_name || ''}
//               onChange={(e) => setEditedPartner({ ...editedPartner, middle_name: e.target.value })}
//               className="mt-1 p-2 border rounded-md w-full"
//             />
//           </div>
//           <div>
//             <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="last_name"
//               name="last_name"
//               value={editedPartner.last_name}
//               onChange={(e) => setEditedPartner({ ...editedPartner, last_name: e.target.value })}
//               className="mt-1 p-2 border rounded-md w-full"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
//               Date of Birth
//             </label>
//             <input
//               type="date"
//               id="date_of_birth"
//               name="date_of_birth"
//               value={editedPartner.date_of_birth}
//               onChange={(e) => setEditedPartner({ ...editedPartner, date_of_birth: e.target.value })}
//               className="mt-1 p-2 border rounded-md w-full"
//             />
//           </div>
//           <div>
//             <label htmlFor="document_type" className="block text-sm font-medium text-gray-700">
//               Document Type
//             </label>
//             <select
//               id="document_type"
//               name="document_type"
//               value={editedPartner.document_type}
//               onChange={(e) => setEditedPartner({ ...editedPartner, document_type: e.target.value })}
//               className="mt-1 p-2 border rounded-md w-full"
//             >
//               {/* Add options for document types here */}
//               <option value="national_id">National ID</option>
//               <option value="passport">Passport</option>
//               <option value="military_id">Military ID</option>
//               {/* Add more document types as needed */}
//             </select>
//           </div>
//           <div>
//             <label htmlFor="document_number" className="block text-sm font-medium text-gray-700">
//               Document Number
//             </label>
//             <input
//               type="text"
//               id="document_number"
//               name="document_number"
//               value={editedPartner.document_number}
//               onChange={(e) => setEditedPartner({ ...editedPartner, document_number: e.target.value })}
//               className="mt-1 p-2 border rounded-md w-full"
//             />
//           </div>
//           <div>
//             <label htmlFor="msisdn" className="block text-sm font-medium text-gray-700">
//               MSISDN
//             </label>
//             <input
//               type="text"
//               id="msisdn"
//               name="msisdn"
//               value={editedPartner.msisdn}
//               onChange={(e) => setEditedPartner({ ...editedPartner, msisdn: e.target.value })}
//               className="mt-1 p-2 border rounded-md w-full"
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={editedPartner.email}
//               onChange={(e) => setEditedPartner({ ...editedPartner, email: e.target.value })}
//               className="mt-1 p-2 border rounded-md w-full"
//             />
//           </div>
//           <div>
//             <label htmlFor="document" className="block text-sm font-medium text-gray-700">
//               Document
//             </label>
//             <textarea
//               id="document"
//               name="document"
//               value={editedPartner.document}
//               onChange={(e) => setEditedPartner({ ...editedPartner, document: e.target.value })}
//               rows="4"
//               className="mt-1 p-2 border rounded-md w-full"
//             ></textarea>
//           </div>
//           {/* <div>
//             <label htmlFor="user" className="block text-sm font-medium text-gray-700">
//               User
//             </label>
//             <input
//               type="text"
//               id="user"
//               name="user"
//               value={editedPartner.user || ''}
//               onChange={(e) => setEditedPartner({ ...editedPartner, user: e.target.value })}
//               className="mt-1 p-2 border rounded-md w-full"
//             />
//           </div> */}
//           <div className="mt-4">
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 mr-2"
//             >
//               Save
//             </button>
//             <button
//               onClick={handleCancel}
//               className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         // Render partner details
//         <div>
//           <table className="table-auto">
//           <tbody>
//             <tr>
//               <td className="font-semibold pr-2">First Name:</td>
//               <td>{partner.first_name}</td>
//             </tr>
//             <tr>
//               <td className="font-semibold pr-2">Middle Name:</td>
//               <td>{partner.middle_name || '-'}</td>
//             </tr>
//             <tr>
//               <td className="font-semibold pr-2">Last Name:</td>
//               <td>{partner.last_name}</td>
//             </tr>
//             <tr>
//               <td className="font-semibold pr-2">Date of Birth:</td>
//               <td>{partner.date_of_birth}</td>
//             </tr>
//             <tr>
//               <td className="font-semibold pr-2">Document Type:</td>
//               <td>{partner.document_type}</td>
//             </tr>
//             <tr>
//               <td className="font-semibold pr-2">Document Number:</td>
//               <td>{partner.document_number}</td>
//             </tr>
//             <tr>
//               <td className="font-semibold pr-2">MSISDN:</td>
//               <td>{partner.msisdn}</td>
//             </tr>
//             <tr>
//               <td className="font-semibold pr-2">Email:</td>
//               <td>{partner.email}</td>
//             </tr>
//             <tr>
//               <td className="font-semibold pr-2">Document:</td>
//               <td>{partner.document}</td>
//             </tr>
//             {/* <tr>
//               <td className="font-semibold pr-2">User:</td>
//               <td>{partner.user || '-'}</td>
//             </tr> */}
//           </tbody>
//         </table>
//           <div className="mt-4">
//             <button
//               onClick={handleEdit}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 mr-2"
//             >
//               Edit
//             </button>
//             <button
//               onClick={handleDelete}
//               className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PartnerDetails;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PartnerDetails() {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPartner, setEditedPartner] = useState(null);
  const navigate = useNavigate();

  // Fetch partner data by ID from your API (http://localhost:8000/autonav/partners/id)
  useEffect(() => {
    // Replace this with your actual API endpoint
    fetch(`http://localhost:8000/autonav/partners/${id}`)
      .then((response) => response.json())
      .then((data) => setPartner(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
    // Make a copy of the partner data to allow editing without changing the original data
    setEditedPartner({ ...partner });
  };

  const handleSave = () => {
    // Send the editedPartner data to your API to save changes
    // Example: axios.put(`http://localhost:8000/autonav/partners/${id}`, editedPartner)
    console.log('Edited Partner Data:', editedPartner);
  
    // Make the API request
    fetch(`http://localhost:8000/autonav/partners/${id}/`, {
      method: 'PUT', // Change to 'POST' if that's the correct method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedPartner),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('API Response:', data);
        // Update the partner state with the edited data
        setPartner(editedPartner);
        setIsEditing(false); // Exit edit mode
      })
      .catch((error) => {
        console.error('API Error:', error);
        // Handle error and display an error message to the user
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset editedPartner to null to avoid displaying old data if the user enters edit mode again
    setEditedPartner(null);
  };

  const handleDelete = () => {
    // Assuming you have an API endpoint for deleting partners (replace with your actual endpoint)
    const deleteEndpoint = `http://localhost:8000/autonav/partners/${id}`;
  
    fetch(deleteEndpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if required (e.g., authentication headers)
      },
    })
      .then((response) => {
        if (response.ok) {
          // Delete was successful, navigate back to the partner list
          navigate('/partners');
        } else {
          // Handle errors here, such as displaying an error message
          console.error('Error deleting partner:', response.statusText);
        }
      })
      .catch((error) => {
        // Handle network errors here
        console.error('Network error:', error);
      });
  };

  if (!partner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3/4 mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Partner Details</h2>
      {partner && isEditing ? (
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
              value={editedPartner.first_name}
              onChange={(e) => setEditedPartner({ ...editedPartner, first_name: e.target.value })}
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
              value={editedPartner.middle_name || ''}
              onChange={(e) => setEditedPartner({ ...editedPartner, middle_name: e.target.value })}
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
              value={editedPartner.last_name}
              onChange={(e) => setEditedPartner({ ...editedPartner, last_name: e.target.value })}
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
              value={editedPartner.date_of_birth}
              onChange={(e) => setEditedPartner({ ...editedPartner, date_of_birth: e.target.value })}
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
              value={editedPartner.document_type}
              onChange={(e) => setEditedPartner({ ...editedPartner, document_type: e.target.value })}
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
              value={editedPartner.document_number}
              onChange={(e) => setEditedPartner({ ...editedPartner, document_number: e.target.value })}
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
              value={editedPartner.msisdn}
              onChange={(e) => setEditedPartner({ ...editedPartner, msisdn: e.target.value })}
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
              value={editedPartner.email}
              onChange={(e) => setEditedPartner({ ...editedPartner, email: e.target.value })}
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
              value={editedPartner.document}
              onChange={(e) => setEditedPartner({ ...editedPartner, document: e.target.value })}
              rows="4"
              className="mt-1 p-2 border rounded-md w-full"
            ></textarea>
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
        // Render partner details
        <div>
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="font-semibold pr-2">First Name:</td>
                <td>{partner.first_name}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Middle Name:</td>
                <td>{partner.middle_name || '-'}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Last Name:</td>
                <td>{partner.last_name}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Date of Birth:</td>
                <td>{partner.date_of_birth}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Document Type:</td>
                <td>{partner.document_type}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Document Number:</td>
                <td>{partner.document_number}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">MSISDN:</td>
                <td>{partner.msisdn}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Email:</td>
                <td>{partner.email}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Document:</td>
                <td>{partner.document}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 mr-2"
            >
              Edit
            </button>
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

export default PartnerDetails;
