import { Modal, DatePicker } from "antd";

function ProgressBar() {
  return (
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ce26cf99f680bc6768ed0f3f287bfe1f4a90ebbf0e31da6841fca7eb641fd43?apiKey=27ec22b9382040ef8580a5e340d3a921&"
      alt=""
      className="shrink-0 self-start mt-6 border-solid aspect-[16.67] border-[3px] border-neutral-500 border-opacity-30 stroke-[3px] stroke-neutral-500 stroke-opacity-30 w-[53px]"
    />
  );
}

function Step({ stepNumber, label, active, completed }) {
  return (
    <div
      className={`flex flex-col ${
        !active && !completed ? "text-neutral-400" : "font-semibold"
      }`}
    >
      <div
        className={`flex justify-center items-center self-center w-12 h-12 text-base leading-6 rounded-3xl ${
          active
            ? "text-white bg-slate-500"
            : completed
            ? "bg-lime-400"
            : "bg-stone-100"
        }`}
      >
        {stepNumber}
      </div>
      <div className="mt-2 text-sm text-center text-neutral-600">{label}</div>
    </div>
  );
}

const ApplicationFormActions = ({
  isModalVisible,
  handleApproveApplication,
  setIsModalVisible,
}) => {
  return (
    <div className="flex flex-wrap justify-center content-start items-center py-6 rounded-3xl bg-stone-100">
      <Modal
        visible={isModalVisible}
        onOk={handleApproveApplication}
        footer={null}
        closeIcon={null}
      >
        <div className="flex flex-col justify-center bg-white rounded-3xl max-w-[820px]">
          <header className="flex flex-col pt-6 w-full text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
            <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:max-w-full">
              <h1>Approve Application</h1>
              <button
                className="shrink-0 my-auto p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                onClick={() => setIsModalVisible(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
          </header>

          <nav className="flex gap-0.5 justify-between self-center px-5 pt-4 pb-5 mt-4 max-w-full w-[500px] max-md:flex-wrap">
            <Step stepNumber="1" isActive={true} stepLabel="Approval Date" />
            <ProgressBar />
            <Step
              stepNumber="2"
              isActive={false}
              stepLabel="Notify Applicant"
            />
            <ProgressBar />
            <Step
              stepNumber="3"
              isActive={false}
              stepLabel="Schedule Installation"
            />
          </nav>

          <section className="flex flex-col justify-center self-center px-12 pt-8 pb-14 mt-4 max-w-full text-base leading-6 rounded-3xl bg-stone-100 text-neutral-600 w-[500px] max-md:px-5">
            <p>Are you sure you want to approve this application?</p>
            <div className="mt-6 font-semibold">Approval Date</div>
            <form className="">
              <label htmlFor="approval_date" className="sr-only">
                Approval Date
              </label>
              <DatePicker className="flex gap-2 justify-between px-4 py-4 mt-2 whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30" />
            </form>
          </section>

          <footer className="mt-10">
            <div
              className="flex justify-between w-full">
              <div className="flex justify-between gap-20 max-w-full w-[496px] max-md:flex-wrap">
                <button
                  type="button"
                  className="flex-1 justify-center items-center px-8 py-4 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30"
                  onClick={() => setIsModalVisible(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 justify-center px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500"
                >
                  Save Approval Date
                </button>
              </div>
            </div>
          </footer>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicationFormActions;
