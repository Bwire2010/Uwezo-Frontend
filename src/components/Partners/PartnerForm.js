import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PartnerForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    date_of_birth: '',
    document_type: 'national_id',
    document_number: '',
    msisdn: '',
    email: '',
    document: '',
    // Remove user from the initial state since it's commented out in the form
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = JSON.stringify(formData);
    console.log('Request Body:', requestBody);

    fetch('http://localhost:8000/autonav/partners/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Form data submitted:', formData);
        console.log('Server response:', data);

        navigate(`/partners/${data.id}`);
        
        // Clear the form after successful submission
        setFormData({
          first_name: '',
          middle_name: '',
          last_name: '',
          date_of_birth: '',
          document_type: 'national_id',
          document_number: '',
          msisdn: '',
          email: '',
          document: '',
        });
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };

  return (
    <div className="max-w-3/4 mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Partner Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
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
              value={formData.middle_name}
              onChange={handleChange}
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
              value={formData.last_name}
              onChange={handleChange}
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
              value={formData.date_of_birth}
              onChange={handleChange}
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
              value={formData.document_type}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            >
              {/* Add options for document types here */}
              <option value="national_id">National ID</option>
              <option value="passport">Passport</option>
              <option value="military_id">Military ID</option>
              {/* Add more document types as needed */}
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
              value={formData.document_number}
              onChange={handleChange}
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
              value={formData.msisdn}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.document}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 border rounded-md w-full"
            ></textarea>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default PartnerForm;
