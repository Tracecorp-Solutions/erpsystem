import { CheckCircleOutlined } from '@ant-design/icons';

const ProfileSidebar = ({ currentStep, maxSteps }) => {
  // Steps labels
  const stepLabels = [
    "Personal Information",
    "Company Information",
    "Invite Users"
  ];

  return (
    <div className="flex justify-center">
      {currentStep <= maxSteps && (
        <nav
          style={{
            background: "#fff",
            padding: "10px",
            marginTop: "20px",
            width: "100%",
          }}
        >
          <ol
            role="list"
            className="flex items-center space-x-8"
            style={{ justifyContent: "center" }}
          >
            {[1, 2, 3].map(stepNumber => (
              <li key={stepNumber} className="flex items-center">
                <span className="relative flex items-center">
                  <span className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center">
                    {currentStep >= stepNumber ? (
                      <CheckCircleOutlined
                        className="text-green-500"
                        style={{ fontSize: "30px" }}
                      />
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
                    {stepLabels[stepNumber - 1]}
                  </span>
                </span>
                {stepNumber < 3 && (
                  <div
                    className="h-0.5 w-8 bg-gray-300 mx-4"
                  />
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}

export default ProfileSidebar;
