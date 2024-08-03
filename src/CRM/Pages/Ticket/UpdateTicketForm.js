import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, Spin, Row, Col } from "antd";

const { Option } = Select;

const options = [
  { id: 1, name: "Registered" },
  { id: 2, name: "Non Registered" },
];
const optionsTicketSource = [
  { id: 1, name: "Phone Call" },
  { id: 2, name: "Walk-in" },
  { id: 3, name: "Social Media" },
];

const UpdateTicketForm = ({ updateTicketForm, handleUpdateTicketCancel }) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Modal
      visible={updateTicketForm}
      closable={false}
      footer={null}
      width={700}
      bodyStyle={{ padding: 0 }}
    >
      <Spin spinning={false}>
        <div className="flex flex-col justify-center items-center bg-white rounded-3xl max-w-[820px]">
          <div className="flex flex-col self-stretch pt-6 w-full text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
            <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
              <div>Update Ticket</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
                className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
                onClick={handleUpdateTicketCancel}
                alt="Cancel"
              />
            </div>
            <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
          </div>

          <Form
            form={form}
            layout="vertical"
            className="w-full px-5 py-6"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Customer Type"
                  name="customerType"
                  rules={[{ required: true, message: 'Please select a customer type!' }]}
                >
                  <Select>
                    {options.map(option => (
                      <Option key={option.id} value={option.id}>
                        {option.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Customer Reference"
                  name="customerReference"
                  rules={[{ required: true, message: 'Please enter customer reference!' }]}
                >
                  <Input placeholder="Enter customer reference" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Customer Name"
                  name="customerName"
                  rules={[{ required: true, message: 'Please enter customer name!' }]}
                >
                  <Input placeholder="Enter customer name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Address"
              name="address"
            >
              <Input.TextArea rows={4} placeholder="Enter address" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Ticket Subject"
                  name="complaintSubject"
                  rules={[{ required: true, message: 'Please enter ticket subject!' }]}
                >
                  <Input placeholder="Enter ticket subject" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Ticket Category"
                  name="ticketCategoryId"
                >
                  <Select>
                    {/* Add options for Ticket Category */}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Ticket Source"
                  name="ticketSource"
                >
                  <Select>
                    {optionsTicketSource.map(option => (
                      <Option key={option.id} value={option.id}>
                        {option.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Assign Priority"
                  name="priorityId"
                >
                  <Select>
                    {/* Add options for Priority */}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Description"
              name="description"
            >
              <Input.TextArea rows={4} placeholder="Enter description" />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-center items-center">
                <Button
                  type="primary"
                  onClick={() => { /* Handle Submit */ }}
                  className="px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500"
                >
                  Save Complainant
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
};

export default UpdateTicketForm;
