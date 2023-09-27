
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function VehicleForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        partner: '', // Use partner's ID as the value
        registration: '',
        make: '',
        model: '',
        yom: '',
        logbook: '',
        chasis_no: '',
        engine_no: '',
    });

    const [partnerOptions, setPartnerOptions] = useState([]);

    // Fetch partner data for the dropdown
    useEffect(() => {
        fetch('http://localhost:8000/autonav/partners')
            .then((response) => response.json())
            .then((data) => {
                const partnerOptions = data.map((partner) => ({
                    label: `${partner.first_name} ${partner.last_name}`,
                    value: partner.id, // Assuming "id" is the unique identifier of the partner
                }));
                setPartnerOptions(partnerOptions);
            })
            .catch((error) => console.error('Error fetching partner data:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the form data to your API
        fetch('http://localhost:8000/autonav/vehicles/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Vehicle data submitted:', data);

                navigate(`/vehicles/${data.id}`);
            })
            .catch((error) => {
                console.error('Error submitting data:', error);
            });
    };

    const handleBackClick = () => {
        navigate('/vehicles'); // Navigate back to the "PartnersList" route.
      };

    return (
        <div className="max-w-3/4 mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="partner" className="block text-sm font-medium text-gray-700">
                        Partner
                    </label>
                    <select
                        id="partner"
                        name="partner"
                        value={formData.partner}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                        required
                    >
                        <option value="">Select a Partner</option>
                        {partnerOptions.map((partner) => (
                            <option key={partner.value} value={partner.value}>
                                {partner.label}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Other form fields go here */}
                <div>
                    <label htmlFor="registration" className="block text-sm font-medium text-gray-700">
                        Registration
                    </label>
                    <input
                        type="text"
                        id="registration"
                        name="registration"
                        value={formData.registration}
                        onChange={handleChange}
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
                        value={formData.make}
                        onChange={handleChange}
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
                        value={formData.model}
                        onChange={handleChange}
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
                        value={formData.yom}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="logbook" className="block text-sm font-medium text-gray-700">
                        Logbook
                    </label>
                    <input
                        id="logbook"
                        name="logbook"
                        value={formData.logbook}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 p-2 border rounded-md w-full"
                    ></input>
                </div>
                <div>
                    <label htmlFor="chasis_no" className="block text-sm font-medium text-gray-700">
                        Chasis Number
                    </label>
                    <input
                        type="text"
                        id="chasis_no"
                        name="chasis_no"
                        value={formData.chasis_no}
                        onChange={handleChange}
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
                        value={formData.engine_no}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                        Save
                    </button>
                    <span className="ml-2 mr-2">&#8592;</span> {/* Unicode arrow character for back */}
                    <button
                        type="button"
                        onClick={handleBackClick}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 "
                    >
                        Back
                    </button>
                    
                </div>
            </form>
        </div>
    );
}

export default VehicleForm;
