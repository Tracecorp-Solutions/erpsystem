import React, { useState } from 'react';
import { Progress } from 'antd';

const Customer = () => {
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
  });
  
  const [step, setStep] = useState(1);
  const totalSteps = Object.keys(formData).length;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };
  
  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(prevStep => prevStep + 1);
    } else {
    }
  };
  
  return (
    <div>
      <div>Step {step} of {totalSteps}</div>
      <Progress percent={(step / totalSteps) * 100} />
      
      {step === 1 && (
        <div>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" name="fullname" />
        </div>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <label htmlFor="field2">Field 2:</label>
          <input type="text" id="field2" name="field2" value={formData.field2} onChange={handleChange} />
        </div>
      )}
      
      {step === 3 && (
        <div>
          <label htmlFor="field3">Field 3:</label>
          <input type="text" id="field3" name="field3" value={formData.field3} onChange={handleChange} />
        </div>
      )}
      
      <div>
        {step > 1 && (
          <button onClick={handleBack}>Back</button>
        )}
        {step < totalSteps && (
          <button onClick={handleContinue}>Continue</button>
        )}
        {step === totalSteps && (
          <button onClick={handleContinue}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default Customer;
