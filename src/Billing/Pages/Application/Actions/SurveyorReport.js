import React, { useState } from "react";
import { Modal, DatePicker, Button, } from "antd";


const SurveyorReport = ({
    surveyorReport,
  handleApproveApplication,
  setSurveyorReport,
}) => {


  return (
    <Modal
      title="Contact Applicant"
      visible={surveyorReport}
      onCancel={() => setSurveyorReport(false)}
      footer={null}
      width={800}
    > 
      
      <div className="flex justify-center mt-4">
        <>
            <div className="flex justify-around">
              <Button
                type="button"
                className="rounded-full  bg-customBlue text-white"
              >
                Submit Report
              </Button>
            </div>
        </>
      </div>
    </Modal>
  );
  
};

export default SurveyorReport;
