import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

const steps = [
  { name: 'Complete Profile', href: '#', status: 'complete', fields: ['firstName', 'lastName', 'email'] },
  { name: 'Register Company', href: '#', status: 'current', fields: ['companyName', 'companyAddress', 'companyType'] },
  { name: 'Create Roles', href: '#', status: 'upcoming', fields: [] }, // Add relevant fields
  { name: 'Invite Users', href: '#', status: 'upcoming', fields: [] }, // Add relevant fields
];

export default function Profile() {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    companyAddress: '',
    companyType: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="section-one">
      <div className="flex px-4 py-12 sm:px-6 lg:px-8" style={{ border: "2px solid red", }}>
        {/* Progress Tracker */}
        <nav aria-label="Progress" className="mr-8">
          <ol role="list" className="space-y-6">
            {steps.map((step) => (
              <li key={step.name}>
                {step.status === 'complete' && (
                  <a href={step.href} className="group flex items-start">
                    <span className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-indigo-600 group-hover:text-indigo-800" aria-hidden="true" />
                      <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        {step.name}
                      </span>
                    </span>
                  </a>
                )}
                {step.status === 'current' && (
                  <a href={step.href} className="group flex items-start" aria-current="step">
                    <span className="flex items-center">
                      <span className="h-5 w-5 rounded-full bg-indigo-200 relative flex-shrink-0">
                        <span className="block h-2 w-2 rounded-full bg-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </span>
                      <span className="ml-3 text-sm font-medium text-indigo-600">{step.name}</span>
                    </span>
                  </a>
                )}
                {/* Add handling for other step statuses here */}
              </li>
            ))}
          </ol>
        </nav>

        {/* Profile Form */}
        <div className="flex flex-col justify-center items-center" style={{ border: "2px solid red", width: "100%" }}>
          <form className="w-full max-w-md">
            <div className="grid grid-cols-1 gap-4">
              {steps.find(step => step.status === 'current').fields.map(field => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                    {field === 'firstName' ? 'First Name' : field === 'lastName' ? 'Last Name' : field === 'email' ? 'Email Address' : 'Company ' + field.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </label>
                  <input
                    type="text"
                    name={field}
                    id={field}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData[field]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
