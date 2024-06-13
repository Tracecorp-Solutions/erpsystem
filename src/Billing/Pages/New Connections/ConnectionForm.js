import * as React from "react";
import SideNav from "../../shared/navigations/SideNav";
import TopNav from "../../shared/navigations/TopNav";

function Step({ stepNumber, stepTitle, imgSrc, isActive }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex justify-center items-center px-3 w-12 h-12 rounded-3xl ${
          isActive ? "bg-slate-500" : "bg-stone-100"
        }`}
      >
        <img
          loading="lazy"
          src={imgSrc}
          alt={`Step ${stepNumber} Icon`}
          className="w-full aspect-square"
        />
      </div>
      <div className="mt-2 text-xs font-medium tracking-wide uppercase text-neutral-400">
        step {stepNumber}
      </div>
      <div
        className={`self-stretch mt-1 text-base font-semibold leading-6 ${
          isActive ? "text-neutral-600" : "text-neutral-400"
        } `}
      >
        {stepTitle}
      </div>
    </div>
  );
}

function InfoSection({ label, description, children }) {
  return (
    <div className="flex flex-col grow text-base leading-6 text-neutral-400 max-md:mt-4 max-md:max-w-full">
      <div className="font-semibold text-neutral-600 max-md:max-w-full">
        {label}
      </div>
      <div className="mt-1 text-sm max-md:max-w-full">{description}</div>
      {children}
    </div>
  );
}

function FormInput({ label, description, placeholder, type }) {
  return (
    <section className="self-start mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
      {label}
      <div className="self-start mt-1 text-sm text-neutral-400 max-md:max-w-full">
        {description}
      </div>
      <input
        className="justify-center items-start px-4 py-4 mt-2 text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full"
        placeholder={placeholder}
        type={type}
        aria-label={label}
      />
    </section>
  );
}

function NewConnection() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
  
    const nextStep = () => {
      setCurrentStep((prevStep) => prevStep + 1);
    };
  
    const prevStep = () => {
      setCurrentStep((prevStep) => prevStep - 1);
    };
  
    const renderStep = () => {
      switch (currentStep) {
        case 1:
          return (
  
              <>
                <SideNav />
                <div className="flex flex-col h-screen">
                  <TopNav />
                  <div className="flex-1 overflow-auto px-6 py-5 bg-stone-100 ml-5 rounded-3xl max-md:px-5">
                    <header className="text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
                      Application Form
                    </header>
                    <main className="flex flex-col mt-6 bg-white rounded-3xl max-md:max-w-full overflow-auto">
                      <section className="flex flex-col px-8 pt-8 pb-3 max-md:px-5 max-md:max-w-full">
                        <div className="flex gap-4 justify-between px-0.5 max-md:flex-wrap">
                          <Step
                            stepNumber="1"
                            stepTitle="Personal Information"
                            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/199c93b6c6f6722d44a5034345d6f2fe17ea88a437145380dc5f98b5469fa385?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                            isActive
                          />
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b54045018ad575579a22acd36a3ab79789b2d22bda7c14c51157473741f6225?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                            alt=""
                            className="shrink-0 self-start mt-6 border-solid aspect-[20] border-[5px] border-neutral-500 border-opacity-30 stroke-[5px] stroke-neutral-500 stroke-opacity-30 w-[95px]"
                          />
                          <Step
                            stepNumber="2"
                            stepTitle="Residential Information"
                            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/862b2af2f85bf4edd9fd3f7941052c1aa2536819b5b2e767f16c1bc6550cc70b?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          />
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b54045018ad575579a22acd36a3ab79789b2d22bda7c14c51157473741f6225?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                            alt=""
                            className="shrink-0 self-start mt-6 border-solid aspect-[20] border-[5px] border-neutral-500 border-opacity-30 stroke-[5px] stroke-neutral-500 stroke-opacity-30 w-[95px]"
                          />
                          <Step
                            stepNumber="3"
                            stepTitle="Connection Details"
                            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/83274c9c51ec56a522950907f75568e73c7b12ee0f3761bc68e72c153fee5091?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          />
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b54045018ad575579a22acd36a3ab79789b2d22bda7c14c51157473741f6225?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                            alt=""
                            className="shrink-0 self-start mt-6 border-solid aspect-[20] border-[5px] border-neutral-500 border-opacity-30 stroke-[5px] stroke-neutral-500 stroke-opacity-30 w-[95px]"
                          />
                          <Step
                            stepNumber="4"
                            stepTitle="Supporting Documents"
                            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/700b08a5ca31bc1a0e4f23e30dfcf37c6bac8fd9279bc171b2668f0266d9b6a5?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          />
                        </div>
                        <div className="shrink-0 mt-8 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full"></div>
  
                        <FormInput
                          label="Full Name"
                          description="The applicant's full legal name"
                          placeholder="Enter your Full Name"
                          type="text"
                        />
                        <div className="flex gap-4 mt-2 text-base leading-6 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
                          <button className="flex gap-2 justify-between px-4 py-4 whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
                            <span>Mr.</span>
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                              alt=""
                              className="shrink-0 self-start w-6 aspect-square"
                            />
                          </button>
                          <input
                            aria-label="Enter your Full Name"
                            type="text"
                            className="justify-center items-start px-4 py-4 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full"
                            placeholder="Enter your Full Name"
                          />
                        </div>
  
                        <div className="mt-4 max-md:max-w-full">
                          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                            <InfoSection
                              label="Date of Birth"
                              description="The applicant's date of birth for identity verification"
                            >
                              <div className="flex gap-2 justify-between px-4 py-4 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
                                <div>-- / -- / ----</div>
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7515d0e48a8702b0a75494e4c7e35f39776b5b1f5e110f501c8205396c6041?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                                  alt=""
                                  className="shrink-0 self-start w-6 aspect-square"
                                />
                              </div>
                            </InfoSection>
  
                            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                              <InfoSection
                                label="Gender"
                                description="Gender selection for demographic data"
                              >
                                <div className="flex gap-2 justify-between px-4 py-4 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
                                  <div>Choose Gender</div>
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                                    alt=""
                                    className="shrink-0 self-start w-6 aspect-square"
                                  />
                                </div>
                              </InfoSection>
                            </div>
                          </div>
                        </div>
  
                        <div className="mt-4 max-md:max-w-full">
                          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                            <InfoSection
                              label="Email Address"
                              description="For electronic communication and billing purposes"
                            >
                              <input
                                aria-label="Enter your email address"
                                type="email"
                                className="justify-center items-start px-4 py-4 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full"
                                placeholder="Enter your email address"
                              />
                            </InfoSection>
  
                            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                              <InfoSection
                                label="Phone Number"
                                description="Primary contact number"
                              >
                                <input
                                  aria-label="Enter your phone number"
                                  type="text"
                                  className="justify-center items-start px-4 py-4 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full"
                                  placeholder="Enter your phone number"
                                />
                              </InfoSection>
                            </div>
                          </div>
                          <section className="flex flex-col justify-center items-end px-16 py-5 text-base font-semibold leading-6 whitespace-nowrap bg-white max-md:pl-5 max-md:max-w-full">
                            <div className="flex gap-4 px-8 max-w-full w-[562px] max-md:flex-wrap max-md:px-5">
                              <button className="justify-center items-center px-8 py-4 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5">
                                Cancel
                              </button>
                              <button className="justify-center items-center px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5">
                                Next
                              </button>
                            </div>
                          </section>
                        </div>
                      </section>
                    </main>
                  </div>
                </div>
              </>
           
          );
  
        case 2:
          return <></>;
  
        case 4:
          return <></>;
        default:
          return null;
      }
    };
  
    return (
      <div>
        <Step
          stepNumber={currentStep}
          stepTitle={`Step ${currentStep}`}
          imgSrc="image.jpg"
          isActive={true}
        />
        {renderStep()}
      </div>
    );
  }

export default NewConnection;
