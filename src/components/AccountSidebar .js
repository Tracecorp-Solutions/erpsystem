import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

function Card({
  title,
  description,
  filteredSubGroups,
  showCreateSubGroupButton,
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="bg-white overflow-hidden sm:rounded-lg"
        style={{ width: "350px", background: "#F6F6F4" }}
      >
        <div className="px-4 py-5 sm:px-6">
          {showCreateSubGroupButton && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src="../images/name.svg" width={150} alt="Placeholder" />
            </div>
          )}
          {showCreateSubGroupButton && (
            <>
              <h3 className="text-lg font-medium leading-6 text-gray-900 text-center">
                {title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 text-center">
                {description}
              </p>
            </>
          )}
          {showCreateSubGroupButton && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                style={{
                  background: "#4467a1",
                  borderRadius: "20px",
                  padding: "10px",
                }}
                className="text-white mt-5"
              >
                + Create SubGroup
              </button>
            </div>
          )}
          {!showCreateSubGroupButton && (
            <div
              style={{
                border: "1px solid #7A7A7A",
                padding: "10px",
                borderRadius: "20px",
                marginTop: "5px",
              }}
            >
              <h2>{filteredSubGroups[0].name}</h2>
              <h3 style={{ margin: "5px", color: "#4467a1" }}>SubGroups</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubGroups.map((subgroup, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {subgroup.subGroupAccount.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccountSidebar({ account, showForm, subGroups }) {
  const [open, setOpen] = useState(true);

  const groupAccountId = account.id;

  const filteredSubGroups = subGroups.filter(
    (item) => item.groupAccount.id === groupAccountId
  );

  const showCreateSubGroupButton = filteredSubGroups.length === 0;

  return (
    <>
      {!showForm && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog className="" onClose={setOpen}>
            <div className="fixed inset-0" />

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md mt-20">
                      <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                        <div className="h-0 flex-1 overflow-y-auto">
                          <div className="px-4 py-6 text-end sm:px-6">
                            <button
                              type="button"
                              className="relative rounded-md text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                            <div className="flex justify-between">
                              <div>
                                <Dialog.Title className="text-base font-semibold leading-6">
                                  {account.name}
                                </Dialog.Title>
                              </div>
                              <div className="flex items-center space-x-4">
                                <EyeInvisibleOutlined
                                  style={{
                                    padding: "10px",
                                    borderRadius: "50px",
                                    background: "#f6f6f4",
                                  }}
                                />
                                <EditOutlined
                                  style={{
                                    padding: "10px",
                                    borderRadius: "50px",
                                    background: "#f6f6f4",
                                  }}
                                />
                              </div>
                            </div>

                            <div className="mt-1">
                              <p className="text-sm text-indigo-300">
                                {account.description}
                              </p>
                            </div>
                          </div>
                          <Card
                            title="Let's Organize Further!"
                            description="You haven't created any subgroups under Assets yet."
                            showCreateSubGroupButton={showCreateSubGroupButton}
                            filteredSubGroups={filteredSubGroups}
                          />
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}
