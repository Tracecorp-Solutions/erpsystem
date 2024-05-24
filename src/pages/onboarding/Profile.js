import React from "react";
import { Layout } from "antd";
import { CheckIcon } from '@heroicons/react/20/solid';

const { Header, Sider, Content } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#fff",
  marginBottom: 0,
};

const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
};

const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#000",
  backgroundColor: "#fff",
  marginTop: "0",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  height: "100vh"
};

const steps = [
  { name: 'Complete profile', href: '#', status: 'complete' },
  {
    name: 'Register Company',
    href: '#',
    status: 'current',
  },
  { name: 'User Groups', href: '#', status: 'upcoming' },
  { name: 'Invite Users', href: '#', status: 'upcoming' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Profile = () => (
  <Layout style={layoutStyle}>
    <Header style={headerStyle}>Header</Header>
    <Layout>
      <Sider width="16%" style={siderStyle}>
        <nav aria-label="Progress" style={{marginLeft: "15px", marginTop: "5px"}}>
          <ol role="list" className="overflow-hidden">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative')}>
                {step.status === 'complete' ? (
                  <a href={step.href} className="group relative flex items-start">
                    <span className="flex h-9 items-center">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                        <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col" style={{marginTop: "5px"}}>
                      <span className="text-sm font-medium">{step.name}</span>
                    </span>
                  </a>
                ) : step.status === 'current' ? (
                  <a href={step.href} className="group relative flex items-start" aria-current="step">
                    <span className="flex h-9 items-center" aria-hidden="true">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
                        <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col" style={{marginTop: "7px"}}>
                      <span className="text-sm font-medium text-indigo-600">{step.name}</span>
                    </span>
                  </a>
                ) : (
                  <a href={step.href} className="group relative flex items-start">
                    <span className="flex h-9 items-center" aria-hidden="true">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                        <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col" style={{marginTop: "7px"}}>
                      <span className="text-sm font-medium text-gray-500">{step.name}</span>
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </Sider>
      <Content style={contentStyle}>Content</Content>
    </Layout>
  </Layout>
);

export default Profile;
