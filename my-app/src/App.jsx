import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const tableItems = [
    {
      firstName: "Liames",
      lastName: "James",
      ID: "435243535",
      email: "liamjames@example.com",
      location: "Kigali, Rwanda",
      phone: "+254708379775",
    },
    {
      firstName: "Liames",
      lastName: "James",
      ID: "435243535",
      email: "liamjames@example.com",
      location: "Kigali, Rwanda",
      phone: "+254708379775",
    },
    {
      firstName: "Liames",
      lastName: "James",
      ID: "435243535",
      email: "liamjames@example.com",
      location: "Kigali, Rwanda",
      phone: "+254708379775",
    },
    {
      firstName: "Liames",
      lastName: "James",
      ID: "435243535",
      email: "liamjames@example.com",
      location: "Kigali, Rwanda",
      phone: "+254708379775",
    },
    {
      firstName: "Liames",
      lastName: "James",
      ID: "435243535",
      email: "liamjames@example.com",
      location: "Kigali, Rwanda",
      phone: "+254708379775",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="max-w-lg">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          List of patients
        </h3>
        <p className="text-gray-600 mt-2">
          This is the list of patient registered to the our hospital
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
              <th className="py-3 px-6">Location</th>
              <th className="py-3 px-6">Phone number</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {tableItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.ID}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
