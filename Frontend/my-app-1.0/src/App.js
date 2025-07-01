import React, { useState, useEffect } from 'react';
import './App.css'; 
import 'tailwindcss/tailwind.css'; 
import authRoute from './routes/authRoute'; 
import PatientTable from './PatientTable';
import Form from './Form';
import axios from ' axios'; 
  
// PatientTable Component (moved from PatientTable.jsx)
// It now accepts 'patients' as a prop and defaults to an empty array to prevent errors.
const PatientTable = ({ patients = [] }) => {
  const tableItems = patients;

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="max-w-lg">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          List of patients
        </h3>
        <p className="text-gray-600 mt-2">
          This is the list of patient registered to the our hospital/ clinic
        </p>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">First name</th>
              <th className="py-3 px-6">Last name</th>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Address</th>
              <th className="py-3 px-6">Phone number</th>
              <th className="py-3 px-6">Last Visit</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {tableItems.length === 0 ? (
                <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">No patients registered yet.</td>
                </tr>
            ) : (
                tableItems.map((item, idx) => (
                    <tr key={item.ID || idx}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {item.firstName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.lastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.ID}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.lastVisit ? item.lastVisit.substring(0, 50) + '...' : ''}</td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Form Component (moved from Form.js)
const Form = ({ onPatientAdded }) => {
  // State to hold form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    ID: '',
    email: '',
    Address: '',
    phone: '',
    lastVisit: '' 
  });

  // State for loading and messages
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setMessage(''); 
    setIsLoading(true); 

    try {
      // Simulate network delay for presentation purposes
      await new Promise(resolve => setTimeout(resolve, 1000));

      // FOR PRESENTATION: Simulate API response
      const simulatedResponseData = { ...formData, id: Date.now() }; // Add a unique ID for key
      console.log('Simulating patient registration:', simulatedResponseData);
      setMessage('Patient registered successfully (simulated)!');
      setFormData({ // Clear form fields after successful submission
        firstName: '', lastName: '', ID: '', email: '', location: '', phone: '', lastVisit: ''
      });
      // Call the callback function passed from App.js to update the patient list
      if (onPatientAdded) {
        onPatientAdded(simulatedResponseData); // Pass the simulated data back to App.js
      }

      /* FOR ACTUAL BACKEND INTEGRATION, UNCOMMENT THE AXIOS CALL BELOW:
      // Attempt to send data to the backend
      const response = await axios.post('http://localhost:5000/api/patients', formData);
      console.log('Patient registered successfully:', response.data);
      setMessage('Patient registered successfully!');
      setFormData({ // Clear form fields after successful submission
        firstName: '', lastName: '', ID: '', email: '', location: '', phone: '', lastVisit: ''
      });
      // Call the callback function passed from App.js to update the patient list
      if (onPatientAdded) {
        onPatientAdded(response.data); // Pass the new patient data back to App.js
      }
      */
    } catch (error) {
      console.error('Error registering patient:', error);
      setMessage(`Error: Failed to register patient. Please ensure your backend is running at http://localhost:5000 and CORS is configured correctly.`);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <h3 className="text-indigo-600 font-semibold">
            Register to Hospital database
          </h3>
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Get in touch
          </p>
          <p>We love helping you! Please fill out the form below.</p>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label htmlFor="firstName" className="font-medium">First name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="font-medium">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div>
              <label htmlFor="ID" className="font-medium">ID</label>
              <input
                type="text"
                id="ID"
                name="ID"
                value={formData.ID}
                onChange={handleChange}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="location" className="font-medium">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="phone" className="font-medium">Phone number</label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                  <select className="text-sm bg-transparent outline-none rounded-lg h-full">
                    <option>KE</option>
                    <option>ZM</option>
                    <option>RW</option>
                    <option>UG</option>
                    <option>MW</option>
                  </select>
                </div>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+ (260) 000-000"
                  required
                  className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastVisit" className="font-medium">Last visit and check up</label>
              <textarea
                id="lastVisit"
                name="lastVisit"
                value={formData.lastVisit}
                onChange={handleChange}
                required
                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
            {message && (
              <p className={`mt-3 text-center text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};


// Main App Component
function App() {
  // State to store the list of patients
  const [patients, setPatients] = useState([]);
  // State for loading indicator when fetching patients
  const [isLoadingPatients, setIsLoadingPatients] = useState(false);
  // State for messages related to patient list fetching
  const [patientsMessage, setPatientsMessage] = useState('');



  // Function to fetch patients from the backend
  const fetchPatients = async () => {
    setIsLoadingPatients(true);
    setPatientsMessage('');
    try {
      // Simulate network delay for presentation purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      /* FOR ACTUAL BACKEND INTEGRATION, UNCOMMENT THE AXIOS CALL BELOW:
      // Attempt to fetch data from the backend
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(response.data);
      */

      // FOR PRESENTATION: Provide mock data if backend is unreachable for a smoother demo
      setPatients([
        { firstName: "Simulated", lastName: "Patient 1", ID: "001", email: "sim1@example.com", location: "Demo City", phone: "111-222-3333", lastVisit: "Simulated check-up, no real data." },
        { firstName: "Simulated", lastName: "Patient 2", ID: "002", email: "sim2@example.com", location: "Demo Town", phone: "444-555-6666", lastVisit: "Simulated follow-up, general health good." }
      ]);
      setPatientsMessage('Displaying simulated data. Please start your backend to see real data.');

    } catch (error) {
      console.error('Error fetching patients:', error);
      setPatientsMessage(`Error: Failed to load patients. Please ensure your backend is running at http://localhost:5000 and CORS is configured correctly. Displaying simulated data instead.`);
      // Always provide mock data if an error occurs for a smoother demo
      setPatients([
        { firstName: "Simulated", lastName: "Patient 1", ID: "001", email: "sim1@example.com", location: "Demo City", phone: "111-222-3333", lastVisit: "Simulated check-up, no real data." },
        { firstName: "Simulated", lastName: "Patient 2", ID: "002", email: "sim2@example.com", location: "Demo Town", phone: "444-555-6666", lastVisit: "Simulated follow-up, general health good." }
      ]);
    } finally {
      setIsLoadingPatients(false);
    }
  };

  // useEffect to fetch patients when the component mounts
  useEffect(() => {
    fetchPatients();
  }, []); // Empty dependency array means this runs once on mount

  // Callback function passed to Form.js to update the list after a new patient is added
  const handlePatientAdded = (newPatient) => {
    setPatients(prevPatients => [...prevPatients, newPatient]);
    // Optionally, re-fetch all patients to ensure data consistency with backend
    // fetchPatients();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans flex flex-col items-center">
      <header className="w-full max-w-4xl text-center py-8">
        <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">
          MY HOSPITAL APP TEST
        </h1>
        <p className="mt-2 text-lg text-blue-600">
          A System for Efficient Patient Data Filing
        </p>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col lg:flex-row w-full max-w-6xl gap-6">
        {/* Patient Registration Form */}
        <section className="bg-white rounded-xl shadow-lg p-6 lg:p-8 flex-1 border border-blue-200">
          <Form onPatientAdded={handlePatientAdded} /> {/* Pass the callback here */}
        </section>

        {/* Patient List Display */}
        <section className="bg-white rounded-xl shadow-lg p-6 lg:p-8 flex-1 border border-purple-200">
          {isLoadingPatients ? (
            <p className="text-center text-gray-600">Loading patients...</p>
          ) : patientsMessage ? (
            <p className="text-center text-red-600">{patientsMessage}</p>
          ) : (
            <PatientTable patients={patients} /> /* Pass the patients state here */
          )}
        </section>
      </main>

      {/* User ID display - MANDATORY for collaborative apps */}
      {/*
      {isAuthReady && userId && (
          <div className="absolute bottom-4 left-4 p-2 bg-gray-800 text-white text-xs rounded-lg">
              User ID: {userId}
          </div>
      )}
      */}
    </div>
  );
}

export default App;
