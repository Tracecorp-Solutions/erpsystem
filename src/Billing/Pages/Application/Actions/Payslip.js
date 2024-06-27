import React,{ useState } from "react";
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router-dom";
import PaymentDetails from "./PaymentDetails";
import ReconcileInvoice from "./ReconcileInvoice";

function Payslip() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReconcileInvoice, setIsReconcileInvoice] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Logic to handle saving payment details
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const location = useLocation();
  const { state } = location;
  const application = state?.applicationNumber;

  const handleMenuClick = (e) => {
    if (e.key === '1') {
      showModal();
    } else if (e.key === "3") {
      setIsReconcileInvoice(true);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Add New Payment</Menu.Item>
      <Menu.Item key="2">Confirm Payment</Menu.Item>
      <Menu.Item key="3">Reconcile Invoice</Menu.Item>
    </Menu>
  )

  return (
    <div className="flex flex-col flex-wrap justify-center content-start items-center py-6 font-semibold rounded-3xl bg-stone-100 leading-[160%]">
      {/* Applications Section */}
      <div className="flex gap-2 items-center self-stretch px-6 text-base text-neutral-600 max-md:flex-wrap max-md:px-5">
        <div className="self-stretch my-auto">Applications</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="shrink-0 self-stretch my-auto w-6 aspect-square"
        />
        <div className="justify-center self-stretch px-4 py-1 whitespace-nowrap bg-white rounded-2xl">
          {application}
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="shrink-0 self-stretch my-auto w-6 aspect-square"
        />
        <div className="self-stretch my-auto max-md:max-w-full">
          Payment References
        </div>
      </div>

      {/* Payment Receipts Section */}
      <div className="flex gap-4 justify-between px-5 mt-6 w-full max-w-[1088px] max-md:flex-wrap max-md:max-w-full">
        <div className="text-4xl text-neutral-600">Payment Receipts</div>
        
        {/* Ant Design Dropdown */}
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <div className="flex gap-2 justify-center py-2 pr-4 pl-6 my-auto text-base text-white whitespace-nowrap rounded-3xl bg-slate-500 cursor-pointer">
            <div>Actions</div>
            <DownOutlined />
          </div>
        </Dropdown>
        
      </div>

      {/* Payment Details Section */}
      <div className="flex flex-col px-6 pt-4 pb-5 mt-6 w-full text-base bg-white rounded-3xl max-w-[1088px] text-neutral-600 max-md:px-5 max-md:max-w-full">
        {/* Header Row */}
        <div className="flex gap-5 justify-between px-6 py-4 text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div>application no.</div>
          <div>PAYMENT REF.</div>
          <div>AMOUNT PAID</div>
          <div>BALANCE</div>
          <div>PAYMENT DATE</div>
          <div className="text-neutral-600">status</div>
        </div>

        {/* Payment Rows */}
        <div className="flex gap-5 justify-between px-6 py-2 mt-2 whitespace-nowrap rounded-3xl max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div>AB/00/22022022/1</div>
          <div>NC009</div>
          <div>400,000</div>
          <div className="text-center">0</div>
          <div className="text-neutral-600">20/04/2024</div>
          <div className="text-neutral-400">Paid</div>
        </div>

        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />

        <div className="flex gap-5 justify-between px-6 py-2 mt-2 whitespace-nowrap rounded-3xl max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div>AB/00/22022022/1</div>
          <div>NC009</div>
          <div>93,000</div>
          <div className="text-center">0</div>
          <div className="text-neutral-600">20/04/2024</div>
          <div className="text-neutral-400">Deposit</div>
        </div>

        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      </div>
      <PaymentDetails isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleOk} />
      <ReconcileInvoice isReconcileInvoice={isReconcileInvoice} setIsReconcileInvoic={setIsReconcileInvoice} />
    </div>
  );
}

export default Payslip;
