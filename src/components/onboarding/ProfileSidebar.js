import { useState } from "react";
import { CheckCircleOutlined } from '@ant-design/icons';

const ProfileSidebar = ({ currentStep, maxSteps }) => {

    return (
        <>
          <div className="">
          {currentStep <= maxSteps && (
            <nav
              className="hidden md:flex justify-center"
              aria-label="Progress"
              style={{
                position: "relative",
                left: "1px",
                background: "#fff",
              }}
            >
              <ol
                role="list"
                className="space-y-6"
                style={{
                  marginTop: "20px",
                  padding: "10px",
                }}
              >
                {[1, 2, 3].map(stepNumber => (
                  <li key={stepNumber}>
                    <span className="flex items-start">
                      <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                        {currentStep >= stepNumber ? (
                          <CheckCircleOutlined className="text-green-500" style={{
                            fontSize: "30px",
                          }} />
                        ) : (
                          <span
                            className="h-full w-full bg-gray-300 rounded-full flex items-center justify-center"
                            style={{ fontSize: "0.75rem", color: "#fff", padding: "15px" }}
                          >
                            {stepNumber}
                          </span>
                        )}
                      </span>
                      <span className="ml-3 text-sm font-medium text-gray-500">
                        {stepNumber === 1 && "Personal Information"}
                        {stepNumber === 2 && "Company Information"}
                        {stepNumber === 3 && "Invite Users"}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
        </>
    );
}

export default ProfileSidebar;
