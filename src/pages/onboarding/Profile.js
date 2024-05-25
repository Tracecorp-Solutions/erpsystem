import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const steps = [
  {
    name: "Complete Profile",
    href: "#",
    status: "current",
    fields: ["fullName", "jobTitle", "email", "phone", "gender", "dateOfBirth"],
  },
  {
    name: "Register Company",
    href: "#",
    status: "upcoming",
    fields: ["companyName", "companyAddress", "companyType"],
  },
  { name: "Create Roles", href: "#", status: "upcoming", fields: [] },
  { name: "Invite Users", href: "#", status: "upcoming", fields: [] },
];

export default function Profile() {
  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    companyName: "",
    companyAddress: "",
    companyType: "",
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to move to the next step
  const moveToNextStep = () => {
    const currentStepIndex = steps.findIndex(
      (step) => step.status === "current"
    );
    if (currentStepIndex !== -1 && currentStepIndex < steps.length - 1) {
      // Update status of current step to 'complete'
      steps[currentStepIndex].status = "complete";
      // Move to the next step
      steps[currentStepIndex + 1].status = "current";
      // Reset form data
      setFormData({
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        companyName: "",
        companyAddress: "",
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call moveToNextStep function
    moveToNextStep();
  };

  return (
    <section className="section-one">
      <div
        className="flex px-4 py-12 sm:px-6 lg:px-8"
        style={{ border: "2px solid red" }}
      >
        {/* Progress Tracker */}
        <nav aria-label="Progress" className="mr-8">
          <ol role="list" className="space-y-6">
            {steps.map((step) => (
              <li key={step.name}>
                {step.status === "complete" && (
                  <a href={step.href} className="group flex items-start">
                    <span className="flex items-center">
                      <CheckCircleIcon
                        className="h-5 w-5 text-indigo-600 group-hover:text-indigo-800"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        {step.name}
                      </span>
                    </span>
                  </a>
                )}
                {step.status === "current" && (
                  <a
                    href={step.href}
                    className="group flex items-start"
                    aria-current="step"
                  >
                    <span className="flex items-center">
                      <span className="h-5 w-5 rounded-full bg-indigo-200 relative flex-shrink-0">
                        <span className="block h-2 w-2 rounded-full bg-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </span>
                      <span className="ml-3 text-sm font-medium text-indigo-600">
                        {step.name}
                      </span>
                    </span>
                  </a>
                )}
                {/* Add handling for other step statuses here */}
              </li>
            ))}
          </ol>
        </nav>

        {/* Profile Form */}
        <div
          className="flex flex-col justify-center items-center"
          style={{ border: "2px solid red", width: "100%" }}
        >
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4" style={{ border: "2px solid red", width: "50rem" }}>
              {steps.find(step => step.status === 'current').fields.map(field => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                    {field === 'fullName' ? 'Full Name' : field === 'jobTitle' ? 'Job Title' : field === 'email' ? 'Email Address' : field === 'phone' ? 'Phone Number' : field === 'gender' ? 'Gender' : field === 'dateOfBirth' ? 'Date of Birth' : 'Company ' + field.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </label>
                  {field === 'dateOfBirth' ? (
                    <DatePicker
                      selected={formData[field]}
                      onChange={(date) => setFormData({ ...formData, [field]: date })}
                      dateFormat="dd/MM/yyyy"
                      className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : 'text'} // Use email type for email field
                      name={field}
                      id={field}
                      className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={formData[field]}
                      onChange={handleInputChange}
                      // style={{ width: '50rem' }}
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Next Step
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
